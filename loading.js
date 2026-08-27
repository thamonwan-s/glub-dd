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

// 1. ฟังก์ชันสร้าง HTML ของ Loading แปะลงใน <body> อัตโนมัติ
function initLoadingUI() {
    const loadingHTML = `
        <div id="loading-screen" class="loading-screen">
          <div class="scene">
            <div class="road-background"></div>
            <div class="bus-stop" id="bus-stop">🏣</div>
            <div class="bus">🚌</div>
          </div>
          <p class="loading-text" id="loading-text">กำลังโหลดข้อมูลรถเมล์...</p>
        </div>
    `;
    
    // ถ้าหน้าเว็บโหลด body แล้วให้ใส่ทันที ถ้ายังไม่โหลดให้รอ event
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        });
    }
}

// 2. ฟังก์ชันสำหรับซ่อนหน้า Loading
function hideLoading() {
    const screen = document.getElementById('loading-screen');
    if (screen) {
        screen.style.display = 'none';
    }
}

// 3. ฟังก์ชันสำหรับเปลี่ยนข้อความ Loading (เช่น กรณี Error หรือหาข้อมูลไม่เจอ)
function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) {
        textEl.innerText = text;
    }
}

// เรียกสร้าง HTML ทันทีที่อ่านไฟล์ JS นี้
initLoadingUI();
