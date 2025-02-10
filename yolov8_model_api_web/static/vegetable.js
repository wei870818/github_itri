document.addEventListener('DOMContentLoaded', () => {
    const ingredientsGrid = document.getElementById('ingredients-grid');

    // 模態視窗元素
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];

    // 假設我們有一個包含食材名稱和圖片的數組
    const ingredients = [
        { name: 'Artichoke 朝鮮薊', image: '/static/images/1.jpg' },
        { name: 'Asparagus 蘆筍', image: '/static/images/2.jpg' },
        { name: 'Capsicum 甜椒', image: '/static/images/3.jpg' },
        { name: 'Broccoli 花椰菜', image: '/static/images/4.jpg' },
        { name: 'Cauliflower 白花椰菜', image: '/static/images/5.jpg' },
        { name: 'Brussels sprouts 球芽甘藍', image: '/static/images/6.jpg' },
        { name: 'Carrot 胡蘿蔔', image: '/static/images/7.jpg' },
        { name: 'Daikon 白蘿蔔', image: '/static/images/8.jpg' },
        { name: 'Pea food 豌豆', image: '/static/images/9.jpg' },
        { name: 'Cucumber 小黃瓜', image: '/static/images/10.jpg' },
        { name: 'Eggplant 茄子', image: '/static/images/11.jpg' },
        { name: 'Gourd 葫蘆', image: '/static/images/12.jpg' },
        { name: 'Green bean 四季豆', image: '/static/images/13.jpg' },
        { name: 'Scallion 青蔥', image: '/static/images/14.jpg' },
        { name: 'Tomato 番茄', image: '/static/images/15.jpg' },
        { name: 'Lettuce 萵苣', image: '/static/images/16.jpg' },
        { name: 'Mushroom 蘑菇', image: '/static/images/17.jpg' },
        { name: 'Pumpkin 南瓜', image: '/static/images/18.jpg' },
        { name: 'Turnip 蕪菁', image: '/static/images/19.jpg' },
        { name: 'Courgette 櫛瓜', image: '/static/images/20.jpg' },
    ];

    // 動態生成食材卡片
    ingredients.forEach(ingredient => {
        const card = document.createElement('div');
        card.classList.add('ingredient-card');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('ingredient-image');
        imageDiv.style.backgroundImage = `url(${ingredient.image})`;

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('ingredient-name');
        nameDiv.textContent = ingredient.name;

        // 點擊圖片顯示模態視窗
        imageDiv.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = ingredient.image;
            captionText.textContent = ingredient.name;
        });

        card.appendChild(imageDiv);
        card.appendChild(nameDiv);
        ingredientsGrid.appendChild(card);
    });

    // 點擊關閉按鈕關閉模態視窗
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 點擊模態視窗外部關閉模態視窗
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});