const canvas = document.getElementById("speedMeter");
const ctx = canvas.getContext("2d");

function drawMeter(percent) {
    ctx.clearRect(0,0,250,250);

    // background circle
    ctx.beginPath();
    ctx.arc(125,125,100,0,2*Math.PI);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 15;
    ctx.stroke();

    // speed arc
    ctx.beginPath();
    ctx.arc(
        125,
        125,
        100,
        -Math.PI/2,
        (2*Math.PI * percent) - Math.PI/2
    );
    ctx.strokeStyle = "#6a5cff";
    ctx.lineWidth = 15;
    ctx.stroke();
}

drawMeter(0);

function startTest(){
    document.getElementById("status").innerText = "Testing...";
    document.getElementById("speedValue").innerText = "0";

    const image = new Image();
    const startTime = performance.now();

    // lightweight test image (cache bypass)
    image.src = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?nn=" + Math.random();

    image.onload = () => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;

        const sizeBits = 5 * 1024 * 1024 * 8; // ~5MB
        const speedBps = sizeBits / duration;
        const speedMbps = (speedBps / (1024*1024)).toFixed(2);

        document.getElementById("speedValue").innerText = speedMbps;
        document.getElementById("download").innerText = speedMbps + " Mbps";
        document.getElementById("status").innerText = "Completed";

        const percent = Math.min(speedMbps / 100, 1);
        drawMeter(percent);
    };

    image.onerror = () => {
        document.getElementById("status").innerText = "Failed";
    };
}
