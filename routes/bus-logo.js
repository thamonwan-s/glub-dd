// bus-logo.js

// 1. ฝัง CSS Palette สีและสไตล์ของโลโก้อัตโนมัติ
const busLogoStyles = `
    :root {
        --color-bus-red: #E55353;    /* G, GE */
        --color-bus-orange: #F28B2B; /* O, OE */
        --color-bus-blue: #3A82F6;   /* B, BE, T */
        --color-bus-sky: #38BDF8;    /* N, NE */
    }

    .bus-logo-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    .bus-logo-icon {
        width: 100%;
        height: 100%;
        display: block;

        /* 📁 ดึงไฟล์ busline.png จากโฟลเดอร์/Repo เดียวกันตรงๆ */
        -webkit-mask-image: url('./busline.png');
        mask-image: url('./busline.png');
        
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
    }

    /* สัญลักษณ์ตัว E ขอบล่างกลาง */
    .bus-express-badge {
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #D32F2F;
        color: #FFFFFF;
        font-family: Arial, sans-serif;
        font-weight: 900;
        font-size: 11px;
        line-height: 1;
        padding: 2px 5px;
        border-radius: 3px;
        border: 1.5px solid #FFFFFF;
        box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        z-index: 2;
    }
`;

// โหลด CSS เข้าไปใน <head> อัตโนมัติ
const styleSheet = document.createElement("style");
styleSheet.innerText = busLogoStyles;
document.head.appendChild(styleSheet);


// 2. แมปประเภทรถกับสี
const busColorMap = {
    'G':  'var(--color-bus-red)',
    'GE': 'var(--color-bus-red)',
    'O':  'var(--color-bus-orange)',
    'OE': 'var(--color-bus-orange)',
    'B':  'var(--color-bus-blue)',
    'BE': 'var(--color-bus-blue)',
    'N':  'var(--color-bus-sky)',
    'NE': 'var(--color-bus-sky)',
    'T':  'var(--color-bus-blue)'
};

/**
 * ฟังก์ชันสำหรับเรนเดอร์ HTML ของโลโก้รถเมล์
 * @param {string} type - รหัสประเภทรถ (G, GE, O, OE, B, BE, N, NE, T)
 * @returns {string} HTML String ของโลโก้
 */
function renderBusLogo(type) {
    if (!type) return '';

    const cleanType = String(type).toUpperCase().trim();
    const bgColor = busColorMap[cleanType] || 'var(--color-bus-blue)';
    const isExpress = cleanType.endsWith('E');

    return `
        <div class="bus-logo-wrapper">
            <div class="bus-logo-icon" style="background-color: ${bgColor};"></div>
            ${isExpress ? '<span class="bus-express-badge">E</span>' : ''}
        </div>
    `;
}
