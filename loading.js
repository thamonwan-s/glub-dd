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

    const bgColor = currentTheme === 'dark' ? '#0f172a' : '#ffffff';

    const loadingHTML = `
        <div id="loading-screen" class="loading-screen" style="background-color: ${bgColor} !important;">
          <div class="scene" id="loading-scene">
            <!-- ถนนเคลื่อนที่ตลอดช่วงโหลด -->
            <div class="road-background" id="road-element"></div>
            
            <!-- ป้าย Bus Stop (ซ่อนอยู่นอกฉากด้านขวา) -->
            <div class="bus-stop-minimal" id="bus-stop-element">
              <div class="stop-sign">
                <span>BUS</span>
                <span>STOP</span>
              </div>
              <div class="stop-pole"></div>
            </div>
            
            <!-- รถเมล์ จอดนิ่งตรงกลาง -->
            <div class="bus-minimal" id="bus-element">
              <div class="bus-body">
                <div class="bus-window"></div>
                <div class="bus-stripe"></div>
              </div>
              <div class="bus-wheels">
                <div class="wheel wheel-spinning" id="wheel-1"></div>
                <div class="wheel wheel-spinning" id="wheel-2"></div>
              </div>
            </div>

          </div>
          <!-- ปรับข้อความตามต้องการ -->
          <p class="loading-text" id="loading-text">LOADING . . .</p>
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

// 3. ฟังก์ชันซ่อนหน้า Loading (หยุดถนน -> เลื่อนป้าย STOP -> จางหาย)
function hideLoading() {
    const stopSign = document.getElementById('bus-stop-element');
    const road = document.getElementById('road-element');
    const bus = document.getElementById('bus-element');
    const wheel1 = document.getElementById('wheel-1');
    const wheel2 = document.getElementById('wheel-2');
    const screen = document.getElementById('loading-screen');

    if (!screen) return;

    // Step 1: เมื่อข้อมูลโหลดเสร็จ ให้หยุดการเคลื่อนที่ของถนน ล้อรถ และการสั่นของรถ
    if (road) road.style.animationPlayState = 'paused';
    if (bus) bus.style.animationPlayState = 'paused';
    if (wheel1) wheel1.style.animationPlayState = 'paused';
    if (wheel2) wheel2.style.animationPlayState = 'paused';

    // Step 2: สั่งให้ป้าย STOP สไลด์เข้ามาจอดข้างรถ
    if (stopSign) {
        stopSign.classList.add('arrived');
    }

    // Step 3: เลื่อนป้ายเข้ามาถึงที่แล้ว ค่อย Fade Out เปิดเข้าหน้าเว็บ
    setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.style.display = 'none';
        }, 400);
    }, 600);
}

// 4. เปลี่ยนข้อความในกรณีเกิด Error หรือข้อความพิเศษ
function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.innerText = text;
}

initLoadingUI();
