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
          <p class="loading-text" id="loading-text">LOADING</p>
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

// Helper: การันตีรอให้ Browser วาด (Paint) หน้าเว็บหลักลงเสนื้อจอก่อนค่อยรัน Callback
function runAfterPaint(callback) {
    requestAnimationFrame(() => {
        const channel = new MessageChannel();
        channel.port1.onmessage = callback;
        channel.port2.postMessage(undefined);
    });
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

    // รันหลังจาก Browser วาดองค์ประกอบหน้าเว็บหลักบน Screen เรียบร้อยแล้วเท่านั้น
    runAfterPaint(() => {
        // Step 1: หยุดแอนิเมชันถนนและล้อรถ
        if (road) road.style.animationPlayState = 'paused';
        if (bus) bus.style.animationPlayState = 'paused';
        if (wheel1) wheel1.style.animationPlayState = 'paused';
        if (wheel2) wheel2.style.animationPlayState = 'paused';

        // Step 2: เลื่อนป้าย STOP เข้ามาตรงกลางหารถ
        if (stopSign) {
            stopSign.classList.add('arrived');
        }

        // Step 3: เมื่อป้าย STOP เลื่อนมาหยุดตรงกลางแล้ว ให้เริ่ม Fade Out หน้านี้ออก
        setTimeout(() => {
            screen.classList.add('fade-out');

            // Step 4: ปิดการใช้งาน Element ทันทีเมื่อ Fade Out ครบเวลา
            setTimeout(() => {
                screen.style.display = 'none';
            }, 400);
        }, 550);
    });
}

// 4. เปลี่ยนข้อความในกรณีเกิด Error หรือข้อความพิเศษ
function setLoadingText(text) {
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.innerText = text;
}

initLoadingUI();
