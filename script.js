const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
let currentColor = '#000000';  // Цвет по умолчанию

// Функция для рисования сетки
function drawGrid() {
    const gridSize = 10;
    ctx.strokeStyle = '#e0e0e0';  // Цвет линий сетки
    ctx.lineWidth = 0.5; // Толщина линий

    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Функция для сохранения данных холста в localStorage
function savePixels() {
    localStorage.setItem('pixelData', canvas.toDataURL());
}

// Функция для загрузки данных холста из localStorage
function loadPixels() {
    const dataURL = localStorage.getItem('pixelData');
    if (dataURL) {
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            drawGrid();  // Перерисовываем сетку после загрузки пикселей
        };
    } else {
        drawGrid();  // Рисуем сетку, если данных нет
    }
}

// Обработчик выбора цвета
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        currentColor = this.getAttribute('data-color');
    });
});

// Рисование на холсте
canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = currentColor;
    ctx.fillRect(Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);

    savePixels(); // Сохраняем данные после рисования
});

// Загружаем пиксели и рисуем сетку при загрузке страницы
window.onload = loadPixels;