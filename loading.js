/* กำหนดค่าสีเริ่มต้น */
:root {
  --bg-loading: #f8f9fa;
  --text-loading: #64748b;
  --road-color: #cbd5e1;
  --bus-body-color: #3b82f6;
  --bus-stripe-color: #60a5fa;
  --bus-window-color: #e0f2fe;
}

/* รองรับ Dark Theme อัตโนมัติ */
[data-theme="dark"] {
  --bg-loading: #0f172a;
  --text-loading: #94a3b8;
  --road-color: #334155;
  --bus-body-color: #2563eb;
  --bus-stripe-color: #3b82f6;
  --bus-window-color: #1e293b;
}

/* ฉากหลัง Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-loading);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: background-color 0.3s ease;
}

.scene {
  position: relative;
  width: 280px;
  height: 100px;
  overflow: hidden;
}

/* 1. ถนนเส้นประ */
.road-background {
  position: absolute;
  bottom: 12px;
  width: 100%;
  height: 0;
  border-bottom: 3px dashed var(--road-color);
}

/* 2. ป้าย Bus Stop แบบ Minimal */
.bus-stop-minimal {
  position: absolute;
  right: 30px;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stop-sign {
  width: 32px;
  height: 32px;
  background-color: #ef4444;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 7px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stop-pole {
  width: 3px;
  height: 24px;
  background-color: #94a3b8;
  border-radius: 2px 2px 0 0;
}

/* 3. ตัวรถเมล์ Minimal */
.bus-minimal {
  position: absolute;
  left: -60px;
  bottom: 15px;
  width: 52px;
  height: 32px;
  animation: driveBus 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.bus-body {
  position: relative;
  width: 100%;
  height: 26px;
  background-color: var(--bus-body-color);
  border-radius: 6px 8px 3px 3px;
  overflow: hidden;
}

.bus-window {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 10px;
  background-color: var(--bus-window-color);
  border-radius: 2px 4px 2px 2px;
}

.bus-stripe {
  position: absolute;
  bottom: 4px;
  width: 100%;
  height: 3px;
  background-color: var(--bus-stripe-color);
}

/* ล้อรถและแอนิเมชันหมุน */
.bus-wheels {
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  margin-top: -2px;
}

.wheel {
  width: 8px;
  height: 8px;
  background-color: #334155;
  border-radius: 50%;
  border: 1.5px dashed #64748b;
}

.wheel-spinning {
  animation: spinWheel 0.4s linear infinite;
}

/* ข้อความแสดงสถานะ */
.loading-text {
  margin-top: 20px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: var(--text-loading);
  font-weight: 500;
}

/* แอนิเมชันเคลื่อนไหว */
@keyframes driveBus {
  0% { left: -60px; }
  70%, 85% { left: 170px; } /* จอดหน้าป้าย */
  100% { left: 300px; }
}

@keyframes spinWheel {
  100% { transform: rotate(360deg); }
}
