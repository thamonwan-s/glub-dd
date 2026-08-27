// ฟังก์ชันซ่อนหน้า Loading เมื่อโหลดข้อมูลเสร็จ
function hideLoading() {
    const screen = document.getElementById('loading-screen');
    const text = document.getElementById('loading-text');

    if (!screen) return;

    if (text) text.innerText = 'ถึงป้ายแล้ว!';
    screen.classList.add('loaded');

    setTimeout(() => {
        screen.classList.add('fade-out');
    }, 1200);
}

// ฟังก์ชันเปิดหน้า Loading (เผื่อใช้ตอนกดเปลี่ยนหน้าหรือค้นหาใหม่)
function showLoading(message = 'กำลังโหลดข้อมูลรถเมล์...') {
    const screen = document.getElementById('loading-screen');
    const text = document.getElementById('loading-text');

    if (!screen) return;

    if (text) text.innerText = message;
    screen.classList.remove('loaded', 'fade-out');
}
