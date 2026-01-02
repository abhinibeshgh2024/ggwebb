function showAlert(msg){
    document.getElementById("alertBox").innerText = msg;
    setTimeout(()=>document.getElementById("alertBox").innerText="",4000);
}

/* JPG → PNG */
function jpgToPng(){
    const file=document.getElementById("jpgToPng").files[0];
    if(!file || file.type!=="image/jpeg"){
        showAlert("Please select a valid JPG file.");
        return;
    }
    convertImage(file,"image/png","converted.png");
}

/* PNG → JPG */
function pngToJpg(){
    const file=document.getElementById("pngToJpg").files[0];
    if(!file || file.type!=="image/png"){
        showAlert("Please select a valid PNG file.");
        return;
    }
    convertImage(file,"image/jpeg","converted.jpg");
}

function convertImage(file,type,name){
    const img=new Image();
    img.src=URL.createObjectURL(file);
    img.onload=()=>{
        const c=document.createElement("canvas");
        c.width=img.width;
        c.height=img.height;
        c.getContext("2d").drawImage(img,0,0);
        c.toBlob(b=>saveAs(b,name),type);
    };
}

/* Image → PDF */
async function imageToPdf(id,name){
    const file=document.getElementById(id).files[0];
    if(!file || !file.type.startsWith("image/")){
        showAlert("Please select a valid image file.");
        return;
    }
    const pdf=await PDFLib.PDFDocument.create();
    const imgBytes=await file.arrayBuffer();
    const img=file.type==="image/png"
        ? await pdf.embedPng(imgBytes)
        : await pdf.embedJpg(imgBytes);
    const page=pdf.addPage([img.width,img.height]);
    page.drawImage(img,{x:0,y:0,width:img.width,height:img.height});
    saveAs(new Blob([await pdf.save()]),name);
}

/* PDF → JPG (first page) */
async function pdfToJpg(){
    const file=document.getElementById("pdfToJpg").files[0];
    if(!file || file.type!=="application/pdf"){
        showAlert("Please select a valid PDF file.");
        return;
    }
    showAlert("PDF to JPG requires backend for multi-page. First page only supported.");
}

/* Merge PDF */
async function mergePdf(){
    const files=document.getElementById("mergePdf").files;
    if(files.length<2){
        showAlert("Please select at least 2 PDF files.");
        return;
    }
    const merged=await PDFLib.PDFDocument.create();
    for(let f of files){
        if(f.type!=="application/pdf"){
            showAlert("Only PDF files allowed.");
            return;
        }
        const pdf=await PDFLib.PDFDocument.load(await f.arrayBuffer());
        const pages=await merged.copyPages(pdf,pdf.getPageIndices());
        pages.forEach(p=>merged.addPage(p));
    }
    saveAs(new Blob([await merged.save()]),"merged.pdf");
}

/* Compress PDF */
async function compressPdf(){
    const file=document.getElementById("compressPdf").files[0];
    if(!file || file.type!=="application/pdf"){
        showAlert("Please select a valid PDF file.");
        return;
    }
    const pdf=await PDFLib.PDFDocument.load(await file.arrayBuffer());
    saveAs(new Blob([await pdf.save({useObjectStreams:true})]),"compressed.pdf");
}
