// 1. ตรวจสอบและบังคับเปลี่ยนสีธีมทันทีที่สคริปต์เริ่มทำงาน
function getTargetTheme() {
    const savedTheme = localStorage.getItem('user-theme') || 'system';
    if (savedTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
}

// 2. ฟังก์ชันสร้าง HTML ของ Loading UI
function initLoadingUI() {
    const currentTheme = getTargetTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);

    // กำหนดสีพื้นหลังตรง (Inline Style) ป้องกันปัญหาธีมสว่างจ้าค้าง
    const bgColor = currentTheme === 'dark' ? '#0f172a' : '#ffffff';

    const loadingHTML = `
        <div id="loading-screen" class="loading-screen" style="background-color: ${bgColor} !important;">
          <div class="scene">
            <!-- ถนนขนาดสั้นลง -->
            <div class="road-background"></div>
            
            <!-- ป้าย Bus Stop ขนาดมินิมอล -->
            <div class="bus-stop-minimal" id="bus-stop-element">
              <div class="stop-sign">
                <span>BUS</span>
                <span>STOP</span>
              </div>
              <div class="stop-pole"></div>
            </div>
            
            <!-- รถเมล์ ขนาดเล็กลง -->
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

// 3. ฟังก์ชันซ่อนหน้า Loading เมื่อโหลดข้อมูลเสร็จ
function hideLoading() {
    const stopSign = document.getElementById('bus-stop-element');
    const screen = document.getElementById('loading-screen');

    if (!screen) return;

    // สั่งป้าย STOP วิ่งเข้ามาหาตัวรถ
    if (stopSign) {
        stopSign.classList.add('arrived');
    }

    // เลื่อนป้ายเสร็จแล้วค่อย Fade Out
    setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.style.display = 'none';
        }, 400);
    }, 500);
}

// 4. เปลี่ยนข้อความ Loading
function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.innerText = text;
}

initLoadingUI();
