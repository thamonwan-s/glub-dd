async function getGoogleSheetData(sheetId, sheetName = '') {
    let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    if (sheetName) {
        url += `&sheet=${encodeURIComponent(sheetName)}`;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("ไม่สามารถเชื่อมต่อ Google Sheet ได้");
        
        // 1. อ่านข้อมูลกลับมาเป็น Text ดิบ (ห้ามใช้ res.json())
        const text = await res.text();
        
        // 2. ใช้ Regex สกัดเอาเฉพาะก้อน { ... } ที่เป็น JSON จริงๆ ออกมา
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
        
        if (!match || !match[1]) {
            throw new Error("รูปแบบข้อมูลจาก Google Sheet ไม่ถูกต้อง");
        }

        // 3. แปลงข้อความที่ตัดสมบูรณ์แล้วเป็น JSON Object
        const data = JSON.parse(match[1]);

        if (!data.table || !data.table.rows) return [];

        // 4. ดึงชื่อหัวตาราง (Headers)
        const cols = data.table.cols.map(c => (c && c.label) ? c.label : '');

        // 5. แปลงแถวข้อมูล (Rows) เป็น Array of Objects
        return data.table.rows.map(row => {
            const obj = {};
            row.c.forEach((cell, i) => {
                const key = cols[i] || `col_${i}`;
                // cell.v คือค่าดิบ (Value), cell.f คือค่าที่จัดฟอร์แมตแล้ว (Formatted Value)
                obj[key] = cell ? (cell.f !== undefined ? cell.f : cell.v) : null;
            });
            return obj;
        });

    } catch (e) {
        console.error("Fetch Google Sheet Error:", e);
        return [];
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('user-theme') || 'system';
    setTheme(savedTheme);
}

function changeTheme(theme) {
    localStorage.setItem('user-theme', theme);
    setTheme(theme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // อัปเดตการแสดงผลปุ่ม active ให้ตรงกับโหมดที่เลือก
    document.querySelectorAll('.segment-btn').forEach(btn => {
        if (btn.getAttribute('data-value') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

initTheme();
