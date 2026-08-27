// 1. ฟังก์ชันดึงสีธีมปัจจุบันอย่างแม่นยำ (รองรับทั้ง system, dark, light)
function getResolvedTheme() {
    const savedTheme = localStorage.getItem('user-theme') || 'system';
    if (savedTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
}

// 2. ปรับธีมที่ <html> ทันทีเพื่อป้องกันหน้าจอขาวสว่างจ้า
(function applyThemeImmediately() {
    const theme = getResolvedTheme();
    document.documentElement.setAttribute('data-theme', theme);
})();

// 3. ฟังก์ชันสร้างโครงสร้าง Loading UI
function initLoadingUI() {
    // ปรับสีธีมอีกครั้งเพื่อความแน่ใจก่อน Render
    document.documentElement.setAttribute('data-theme', getResolvedTheme());

    const loadingHTML = `
        <div id="loading-screen" class="loading-screen">
          <div class="scene">
            <!-- ถนนที่ขยับเลื่อนถอยหลังตลอดเวลา -->
            <div class="road-background"></div>
            
            <!-- ป้าย Bus Stop (จะวิ่งเข้ามาเมื่อสั่งปิด) -->
            <div class="bus-stop-minimal" id="bus-stop-element">
              <div class="stop-sign">
                <span>BUS</span>
                <span>STOP</span>
              </div>
              <div class="stop-pole"></div>
            </div>
            
            <!-- รถเมล์ จอดนิ่งอยู่ตรงกลางฉาก -->
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
          <p class="loading-text" id="loading-text">Loading...</p>
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

// 4. ฟังก์ชันซ่อนหน้า Loading เมื่อโหลดข้อมูลเสร็จ
function hideLoading() {
    const stopSign = document.getElementById('bus-stop-element');
    const screen = document.getElementById('loading-screen');

    if (!screen) return;

    // Step 1: สั่งให้ป้าย STOP เลื่อนเข้ามาหารถเมล์ตรงกลาง
    if (stopSign) {
        stopSign.classList.add('arrived');
    }

    // Step 2: รอให้ป้ายเลื่อนถึงตรงกลาง (0.5 วินาที) แล้วค่อย Fade Out หน้า Loading
    setTimeout(() => {
        screen.classList.add('fade-out');
        
        // Step 3: ลบออกจากมุมมองโดยสมบูรณ์ ป้องกันการค้างบังหน้าเว็บ
        setTimeout(() => {
            screen.style.display = 'none';
        }, 400);
    }, 500);
}

// 5. ฟังก์ชันสำหรับเปลี่ยนข้อความ Loading
function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.innerText = text;
}

// เรียกสร้าง HTML
initLoadingUI();
