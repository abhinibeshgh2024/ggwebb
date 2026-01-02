function addItem() {
    const section = document.querySelector(".card:nth-of-type(4)");
    const row = document.createElement("div");
    row.className = "item-row";
    row.innerHTML = `
        <input type="text" placeholder="Item Name" class="item-name">
        <input type="number" placeholder="Qty" class="item-qty">
        <input type="number" placeholder="Price" class="item-price">
    `;
    section.insertBefore(row, section.lastElementChild);
}

function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    const getVal = id => document.getElementById(id).value;

    doc.setFontSize(18);
    doc.text(getVal("businessName"), 10, y); y+=8;
    doc.setFontSize(11);
    doc.text(getVal("businessAddress"), 10, y); y+=6;
    doc.text(getVal("businessEmail"), 10, y); y+=6;
    doc.text(getVal("businessPhone"), 10, y); y+=10;

    doc.text(`Invoice #: ${getVal("invoiceNumber")}`, 10, y); y+=6;
    doc.text(`Invoice Date: ${getVal("invoiceDate")}`, 10, y); y+=6;
    doc.text(`Due Date: ${getVal("dueDate")}`, 10, y); y+=10;

    doc.text("Bill To:", 10, y); y+=6;
    doc.text(getVal("clientName"), 10, y); y+=6;
    doc.text(getVal("clientAddress"), 10, y); y+=6;
    doc.text(getVal("clientEmail"), 10, y); y+=10;

    doc.text("Items:", 10, y); y+=6;

    let total = 0;
    document.querySelectorAll(".item-row").forEach(row => {
        const name = row.querySelector(".item-name").value;
        const qty = Number(row.querySelector(".item-qty").value);
        const price = Number(row.querySelector(".item-price").value);
        const line = qty * price;
        total += line;
        doc.text(`${name} | ${qty} x ${price} = ${line}`, 10, y);
        y+=6;
    });

    const tax = Number(getVal("tax")) || 0;
    const discount = Number(getVal("discount")) || 0;

    const taxAmt = total * tax / 100;
    const discAmt = total * discount / 100;
    const grand = total + taxAmt - discAmt;

    y+=8;
    doc.text(`Subtotal: ${total}`, 10, y); y+=6;
    doc.text(`Tax (${tax}%): ${taxAmt}`, 10, y); y+=6;
    doc.text(`Discount (${discount}%): -${discAmt}`, 10, y); y+=6;
    doc.setFontSize(14);
    doc.text(`Grand Total: ${grand}`, 10, y); y+=10;

    doc.setFontSize(11);
    doc.text("Notes:", 10, y); y+=6;
    doc.text(getVal("notes"), 10, y);

    doc.save("invoice.pdf");
}
