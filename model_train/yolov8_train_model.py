from ultralytics import YOLO

def main():
    # 1. 載入 YOLOv8 模型
    model_type = 'yolov8n'
    model_filename = f'{model_type}.pt'

    # 檢查並載入模型
    import os
    if not os.path.exists(model_filename):
        print(f"{model_filename} 不存在，下載模型...")
        model = YOLO(f'{model_type}.pt')
    else:
        print(f"{model_filename} 已存在，載入模型...")
        model = YOLO(model_filename)

    # 2. 設定資料集路徑並進行訓練
    data_yaml_path = 'fruit_v27/data.yaml'
    model.train(
        data=data_yaml_path,
        epochs=10,
        batch=16,
        imgsz=640,
        name='fruit_v27',
        device=0
    )

    # 3. 驗證模型（可選）
    model.val(data=data_yaml_path)

    # 4. 匯出模型
    # model.export(format='onnx')

    print("模型訓練與匯出完成！")

if __name__ == "__main__":
    main()
