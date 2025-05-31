document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 移除所有卡片的 active 類別
            cards.forEach(c => c.classList.remove('active'));
            // 為當前點擊的卡片添加 active 類別
            card.classList.add('active');
        });
    });
});
