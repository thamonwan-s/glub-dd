async function getGoogleSheetData(sheetId, sheetName = '') {
    // ถ้าไม่ได้ใส่ชื่อแท็บ ให้ดึงแท็บแรกสุดอัตโนมัติ
    let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    if (sheetName) {
        url += `&sheet=${encodeURIComponent(sheetName)}`;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");
        
        const text = await res.text();
        
        // ตัดข้อความหุ้มของ Google GViz API
        const jsonString = text.substring(47, text.length - 2);
        const data = JSON.parse(jsonString);

        if (!data.table || !data.table.rows) return [];

        // ดึงชื่อหัวตาราง
        const cols = data.table.cols.map(c => c ? c.label : '');

        // แปลงเป็น Array of Objects
        return data.table.rows.map(row => {
            const obj = {};
            row.c.forEach((cell, i) => {
                const key = cols[i] || `col_${i}`;
                obj[key] = cell ? cell.v : null;
            });
            return obj;
        });
    } catch (e) {
        console.error("Fetch Google Sheet Error:", e);
        return [];
    }
}
