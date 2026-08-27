async function getGoogleSheetData(sheetId, sheetName) {
    // 1. สร้าง URL ยิงไปขอข้อมูล GViz API
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        // 2. ตัดข้อความส่วนเกินที่ Google หุ้มไว้ออก (google.visualization.Query.setResponse(...);)
        const jsonString = text.substring(47, text.length - 2);
        const data = JSON.parse(jsonString);

        // 3. ดึงรายชื่อคอลัมน์ (Header)
        const cols = data.table.cols.map(col => col.label);

        // 4. แปลงแถวข้อมูล (Rows) ให้อยู่ในรูป Array of Objects [{ Col1: Value, Col2: Value }]
        const formattedData = data.table.rows.map(row => {
            const rowData = {};
            row.c.forEach((cell, index) => {
                const colName = cols[index] || `col_${index}`;
                // ดึงค่าจริงจาก cell (ถ้าช่องนั้นว่างเปล่าให้ใส่ null)
                rowData[colName] = cell ? cell.v : null;
            });
            return rowData;
        });

        return formattedData; // ได้ Array ของข้อมูลพร้อมใช้งาน

    } catch (error) {
        console.error("Error fetching Google Sheet:", error);
        return [];
    }
}
