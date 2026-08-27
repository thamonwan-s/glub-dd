// 1. ปรับธีมทันทีที่สคริปต์ทำงาน (ก่อนสร้าง DOM เสร็จ)
(function applyInitialTheme() {
    const savedTheme = localStorage.getItem('user-theme') || 'system';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// 2. ฟังก์ชันซ่อนหน้า Loading
// ฟังก์ชันสร้าง HTML ของ Loading แปะลงใน <body> อัตโนมัติ
function initLoadingUI() {
    const loadingHTML = `
        <div id="loading-screen" class="loading-screen">
          <div class="scene">
            <div class="road-background"></div>
            
            <!-- ป้ายรถเมล์แบบ Minimal Stop Sign -->
            <div class="bus-stop-minimal">
              <div class="stop-sign">
                <span>BUS</span>
                <span>STOP</span>
              </div>
              <div class="stop-pole"></div>
            </div>
            
            <!-- ตัวรถเมล์แบบ Minimal -->
            <div class="bus-minimal">
              <div class="bus-body">
                <div class="bus-window"></div>
                <div class="bus-stripe"></div>
              </div>
              <div class="bus-wheels">
                <div class="wheel"></div>
                <div class="wheel"></div>
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

function hideLoading() {
    const screen = document.getElementById('loading-screen');
    if (screen) screen.style.display = 'none';
}

function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.innerText = text;
}

initLoadingUI();
