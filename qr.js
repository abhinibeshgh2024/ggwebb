function generateQR() {
    const text = document.getElementById("qrText").value.trim();
    const qrImage = document.getElementById("qrImage");
    const downloadBtn = document.getElementById("downloadBtn");

    if (text === "") {
        alert("Please enter some text or URL");
        return;
    }

    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
        encodeURIComponent(text);

    qrImage.crossOrigin = "anonymous";
    qrImage.src = qrURL;
    qrImage.style.display = "block";

    qrImage.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = qrImage.width;
        canvas.height = qrImage.height;

        ctx.drawImage(qrImage, 0, 0);

        canvas.toBlob((blob) => {
            const downloadURL = URL.createObjectURL(blob);

            downloadBtn.href = downloadURL;
            downloadBtn.download = "qr-code.png";
            downloadBtn.style.display = "inline-block";
        });
    };
}
