const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function listFields() {
    try {
        const pdfBytes = fs.readFileSync('c:/Trabajos/Lataberna/public/Ficha de Personaje Editable.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        
        const fieldInfo = fields.map(f => ({
            name: f.getName(),
            type: f.constructor.name
        }));
        
        fs.writeFileSync('c:/Trabajos/Lataberna/scripts/fields-output.json', JSON.stringify(fieldInfo, null, 2));
        console.log('Fields extracted to fields-output.json');
    } catch (e) {
        console.error('Error:', e);
    }
}

listFields();
