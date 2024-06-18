const colorPicker = document.querySelector("#color-picker");
const canvasColor = document.querySelector("#canvas-color");
const fontPicker = document.querySelector("#font-picker");
const openFile = document.querySelector('#open-file');

const clearBtn = document.querySelector("#clear");
const saveBtn = document.querySelector("#save");
const retriveBtn = document.querySelector("#retrive");
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
})

openFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});



canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();// its dispatch click event on '<a></a>' tag

});

retriveBtn.addEventListener('click', () => {
    let saveedCanvas = localStorage.getItem('canvasContents');
    if (saveedCanvas) {
        let img = new Image();
        img.src = saveedCanvas;
        ctx.drawImage(img, 0, 0);
    }
})