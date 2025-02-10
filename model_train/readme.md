1. 在anaconda建立python3.8環境

 
2. 在NVIDIA網站安裝CUDA和cuDNN，CUDA version:12.4，cuDnn version:9.1.0


3. 把 C:\Users<username>\Downloads\cuda\bin 資料夾內檔案複製到C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\bin
   把 C:\Users<username>\Downloads\cuda\include 資料夾內檔案複製到C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\include
   把 C:\Users<username>\Downloads\cuda\lib\x64 資料夾內檔案複製到C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.1\lib\x64


4. 到pytorch官網安裝pytorch，選擇對應到CUDA 12.4版本的pytorch


5. 在cmd上打python後輸入torch.cuda.is_available()確認是否安裝成功以及是否有啟動cuda，假如出現OMP: Error #15: Initializing libiomp5md.dll, but found libiomp5 already initialized錯誤代碼
 ，解決方式在cmd輸入set KMP_DUPLICATE_LIB_OK=True可以解決，建議先輸入


6. 到github下載測試資料https://github.com/ultralytics/ultralytics


7. 解壓縮後在ultralytics-main\ultralytics\cfg\datasets中找到coco8.yaml做測試訓練


8. 可以使用以下兩種方法來訓練yolo模型
	(1) 訓練yolo在cmd中cd到訓練位置資料夾後輸入yolo detect train data=/data.yaml model=yolov8n.pt epochs=100 imgsz=640 device=0 --save_json=True來做
 	，檔案儲存在run資料夾中
   	(2) 使用資料夾中的yolov8_train_model.py來訓練模型


參考資料: https://henry870603.medium.com/%E9%87%8D%E6%8A%95%E9%96%8B%E5%A7%8B%E6%95%99%E4%BD%A0%E5%A6%82%E4%BD%95%E7%94%A8yolov8%E7%82%AB%E7%B7%B4%E8%87%AA%E5%B7%B1%E7%9A%84%E8%B3%87%E6%96%99%E9%9B%86-ab5425746bd0
CUDA 12.4:   https://developer.nvidia.com/cuda-12-4-0-download-archive
cuDnn 9.1.0: https://developer.nvidia.com/cudnn-9-1-0-download-archive
pytorch: https://pytorch.org/