document.addEventListener('DOMContentLoaded', async function () {
    const videoFeed = document.getElementById('video_feed');
    const captureBtn = document.getElementById('captureBtn');
    const modelSelect = document.querySelector('.model-selector');
    let cameraStream = null;

    // 啟動相機
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraStream = stream;
            videoFeed.srcObject = stream;
        } catch (error) {
            console.error('相機啟動失敗:', error);
            document.getElementById('camera-warning').style.display = 'block';
            alert(`相機啟動失敗: ${error.message}`);
        }
    }

    await startCamera();

    // 捕捉影像並傳送給後端
    async function captureImage() {
        const selectedModel = modelSelect.value;
        if (!selectedModel || selectedModel === "請選擇掃描模型") {
            alert('請選擇一個模型');
            return;
        }

        if (videoFeed.videoWidth === 0 || videoFeed.videoHeight === 0) {
            alert('視頻加載中，請稍後再試。');
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = videoFeed.videoWidth;
        canvas.height = videoFeed.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoFeed, 0, 0, canvas.width, canvas.height);

        let imageData = canvas.toDataURL('image/jpeg'); // 轉換為 base64

        try {
            const response = await fetch(`/capture?model=${selectedModel}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            });

            if (!response.ok) {
                throw new Error(`後端錯誤：${response.statusText}`);
            }

            const data = await response.json(); // 解析 JSON
            console.log('後端回應內容:', data);

            if (data.error) {
                alert(`錯誤: ${data.message}`);
            } else {
                // alert('影像擷取成功');
                // 偵測到掃描物件後，滑動到「已掃描食材」頁面
                goToNextSlide(); // 這裡是滑動頁面的操作
            }
        } catch (error) {
            console.error('錯誤:', error);
            alert(`錯誤: ${error.message}`);
        }
    }

    captureBtn.addEventListener('click', captureImage);

    // 頁面滑動邏輯
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function goToNextSlide() {
        if (currentSlide >= slides.length - 1) return;

        const currentElement = slides[currentSlide];
        const nextElement = slides[currentSlide + 1];

        const isHorizontal = currentSlide === 0;
        const direction = isHorizontal ? 'X' : 'Y';

        currentElement.style.transform = `translate${direction}(-100%)`;
        currentElement.classList.remove('active');

        nextElement.style.transform = 'translate(0)';
        nextElement.classList.add('active');

        currentSlide++;
    }
});
