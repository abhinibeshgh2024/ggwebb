function generateQR() {
    const text = document.getElementById("qrText").value.trim();
    const qrImage = document.getElementById("qrImage");
    const downloadBtn = document.getElementById("downloadBtn");

    if (text === "") {
        alert("Please enter some text or URL");
        return;
    }

    const qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" 
                  + encodeURIComponent(text);

    qrImage.src = qrURL;
    qrImage.style.display = "block";

    downloadBtn.href = qrURL;
    downloadBtn.style.display = "inline-block";
}
