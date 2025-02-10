from flask import Flask, render_template, Response, request, jsonify    #Flask_versin: 3.0.3
from ultralytics import YOLO                                            #ultralytics_versin: 8.3.54
import numpy as np                                                      #numpy_versin: 1.24.1
import cv2
import os
from datetime import datetime
import base64
from io import BytesIO
from PIL import Image
import csv

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(app.root_path, 'data/picture/uploads')
PROCESSED_FOLDER = os.path.join(app.root_path, 'data/picture/processed')
TEXT_FOLDER = os.path.join(app.root_path, 'data/result_csv')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)
os.makedirs(TEXT_FOLDER, exist_ok=True)

model_paths = {
    'best_fruit': YOLO('./model/best_fruit_v25.pt'),
    'best_v2': YOLO('./model/best_v2.pt')
}

# 主頁路由
@app.route("/")
def home():  # 將函數名稱改為 home()，避免與其他路由衝突
    return render_template("main.html")

# 主頁 (main.html)
@app.route("/main")
def main():
    return render_template("main.html")

# 掃描食材頁面 (scan.html)
@app.route('/scan')
def scan():
    return render_template("scan.html")

@app.route('/capture', methods=['POST', 'GET'])
def capture():
    model_name = request.args.get('model','best_fruit')
    model = model_paths.get(model_name, model_paths['best_fruit'])

    if not model:
        return jsonify({'error': 'Invalid model name', 'message': '請選擇有效的模型'}), 400

    # 確保請求的 Content-Type 正確
    if not request.is_json:
        return jsonify({'error': 'Invalid Content-Type', 'message': "請確保 'Content-Type' 為 'application/json'"}), 415

    try:
        # 嘗試解析傳來的 JSON
        data = request.get_json()

        if 'image' not in data:
            return jsonify({'error': 'Missing image data', 'message': '請確保請求包含 base64 圖片'}), 400

        # 確認圖像數據是否存在
        image_data = data['image']
        if not image_data:
            return jsonify({'error': 'Invalid image data', 'message': '圖像數據無效或為空'}), 400

        # 將 base64 圖像數據解碼
        image_data = image_data.strip()  # 去除多餘的空格
        image_data = image_data.split(",")[1]  # 去掉 base64 開頭部分

        # 解碼 base64 圖像
        image = Image.open(BytesIO(base64.b64decode(image_data)))
        frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    except Exception as e:
        return jsonify({'error': 'Invalid JSON format', 'message': str(e)}), 400

    # 生成檔名
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    original_path = os.path.join(UPLOAD_FOLDER, f'capture_{timestamp}.jpg')
    processed_path = os.path.join(PROCESSED_FOLDER, f'processed_{timestamp}.jpg')
    csv_path = os.path.join(TEXT_FOLDER, f'results_{timestamp}.csv')

    try:
        cv2.imwrite(original_path, frame)
        results = model(frame)
        detected_classes = []

        with open(csv_path, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Class', 'Confidence', 'X1', 'Y1', 'X2', 'Y2'])
            for result in results:
                for box in result.boxes:
                    coords = [int(v) for v in box.xyxy[0]]
                    cls = int(box.cls[0])
                    confidence = box.conf[0]
                    writer.writerow([model.names[cls], f"{confidence:.2f}", coords[0], coords[1], coords[2], coords[3]])
                    cv2.rectangle(frame, (coords[0], coords[1]), (coords[2], coords[3]), (0, 255, 0), 2)
                    cv2.putText(frame, model.names[cls], (coords[0], coords[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                    detected_classes.append(model.names[cls])

        cv2.imwrite(processed_path, frame)
        # print("模型名稱:", model_name)
        # print("模型對應名稱:", model.names)
        # print("圖片是否成功讀取:", os.path.exists("debug_frame.jpg"))
        # print("模型回傳結果:", results)

        return jsonify({
            'status': 'success',
            'original_image': original_path,
            'processed_image': processed_path,
            'detected_classes': detected_classes
        })
    except Exception as e:
        return jsonify({'error': 'Processing error', 'message': str(e)}), 500
        



# 食譜頁面 (recipe.html)
@app.route("/recipe")
def recipe():
    return render_template("recipe.html")

# 水果頁面 (fruit.html)
@app.route("/fruit")
def fruit():
    return render_template("fruit.html")

# 蔬菜頁面 (vegetable.html)
@app.route("/vegetable")
def vegetable():
    return render_template("vegetable.html")

# 調味料頁面 (seasoning.html)
@app.route("/seasoning")
def seasoning():
    return render_template("seasoning.html")

# 豆類、堅果穀物頁面 (legume-nut-grain-starche.html)
@app.route("/legume-nut-grain-starche")
def legume_nut_grain_starch():
    return render_template("legume-nut-grain-starche.html")

if __name__ == "__main__":
    app.run(debug=True)