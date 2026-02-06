import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function listFields() {
    const pdfBytes = fs.readFileSync('c:/Trabajos/Lataberna/public/Ficha de Personaje Editable.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    const fieldInfo = fields.map(f => ({
        name: f.getName(),
        type: f.constructor.name
    }));
    
    console.log(JSON.stringify(fieldInfo, null, 2));
}

listFields().catch(console.error);
