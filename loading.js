// 1. ปรับธีมทันทีที่สคริปต์ทำงาน (ก่อนสร้าง DOM เสร็จ)
(function applyInitialTheme() {
    const savedTheme = localStorage.getItem('user-theme') || 'system';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// 2. ฟังก์ชันซ่อนหน้า Loading
function hideLoading() {
    const screen = document.getElementById('loading-screen');
    const text = document.getElementById('loading-text');

    if (!screen) return;

    if (text) text.innerText = 'ถึงป้ายแล้ว!';
    screen.classList.add('loaded');

    setTimeout(() => {
        screen.classList.add('fade-out');
        
        // ถอนออกจาก DOM Layout หลังจบแอนิเมชัน Fade ป้องกันการค้าง 100%
        setTimeout(() => {
            screen.style.display = 'none';
        }, 500);
    }, 800);
}
