document.addEventListener('DOMContentLoaded', () => {
    const ingredientsGrid = document.getElementById('ingredients-grid');

    // 模態視窗元素
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close')[0];

    // 假設我們有一個包含食材名稱和圖片的數組
    const ingredients = [
        { name: 'Apple 蘋果', image: '/static/images/1.jpg' },
        { name: 'Apricot 杏子', image: '/static/images/2.jpg' },
        { name: 'Avocado 酪梨', image: '/static/images/3.jpg' },
        { name: 'Banana 香蕉', image: '/static/images/4.jpg' },
        { name: 'Blackberry 黑莓', image: '/static/images/5.jpg' },
        { name: 'Blueberry 藍莓', image: '/static/images/6.jpg' },
        { name: 'Cantaloupe 哈密瓜', image: '/static/images/7.jpg' },
        { name: 'Cherry 櫻桃', image: '/static/images/8.jpg' },
        { name: 'Clementine 克萊門氏小柑橘', image: '/static/images/9.jpg' },
        { name: 'Cocoanut 椰子', image: '/static/images/10.jpg' },
        { name: 'Date fruit 棗子', image: '/static/images/11.jpg' },
        { name: 'Fig fruit 無花果', image: '/static/images/12.jpg' },
        { name: 'Strawberry 草莓', image: '/static/images/13.jpg' },
        { name: 'Grape 葡萄', image: '/static/images/14.jpg' },
        { name: 'Kiwi fruit 奇異果', image: '/static/images/15.jpg' },
        { name: 'Lemon 檸檬', image: '/static/images/16.jpg' },
        { name: 'Lime 酸橙', image: '/static/images/17.jpg' },
        { name: 'Mandarin orange 橘子', image: '/static/images/18.jpg' },
        { name: 'Orange fruit 橙子', image: '/static/images/19.jpg' },
        { name: 'Papaya 木瓜', image: '/static/images/20.jpg' },
        { name: 'Peach 桃子', image: '/static/images/21.jpg' },
        { name: 'Pear 梨', image: '/static/images/22.jpg' },
        { name: 'Persimmon 柿子', image: '/static/images/23.jpg' },
        { name: 'Pineapple 鳳梨', image: '/static/images/24.jpg' },
        { name: 'Raspberry 覆盆子', image: '/static/images/25.jpg' },
        { name: 'Watermelon 西瓜', image: '/static/images/25.jpg' },
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