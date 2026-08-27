// 1. ปรับธีมทันทีที่สคริปต์ทำงาน
(function applyInitialTheme() {
    const savedTheme = localStorage.getItem('user-theme') || 'system';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// 2. ฟังก์ชันสร้าง HTML ของ Loading แปะลงใน <body> อัตโนมัติ
function initLoadingUI() {
    const loadingHTML = `
        <div id="loading-screen" class="loading-screen">
          <div class="scene">
            <div class="road-background"></div>
            
            <div class="bus-stop-minimal">
              <div class="stop-sign">
                <span>BUS</span>
                <span>STOP</span>
              </div>
              <div class="stop-pole"></div>
            </div>
            
            <div class="bus-minimal">
              <div class="bus-body">
                <div class="bus-window"></div>
                <div class="bus-stripe"></div>
              </div>
              <div class="bus-wheels">
                <div class="wheel wheel-spinning"></div>
                <div class="wheel wheel-spinning"></div>
              </div>
            </div>

          </div>
          <p class="loading-text" id="loading-text">กำลังโหลดข้อมูลรถเมล์...</p>
        </div>
    `;
    
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        });
    }
}

// 3. ฟังก์ชันซ่อนหน้า Loading
function hideLoading() {
    const screen = document.getElementById('loading-screen');
    if (screen) screen.style.display = 'none';
}

// 4. ฟังก์ชันเปลี่ยนข้อความ Loading
function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.innerText = text;
}

// เรียกสร้าง HTML ทันที
initLoadingUI();
