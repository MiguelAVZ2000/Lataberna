const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function identify() {
    try {
        const pdfBytes = fs.readFileSync('c:/Trabajos/Lataberna/public/Ficha de Personaje Editable.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        
        fields.forEach(field => {
            if (field.constructor.name === 'PDFTextField') {
                try {
                    field.setText(field.getName());
                    field.setFontSize(6);
                } catch (e) {}
            }
        });

        const outBytes = await pdfDoc.save();
        fs.writeFileSync('c:/Trabajos/Lataberna/public/test_fields.pdf', outBytes);
        console.log('PDF de prueba generado en public/test_fields.pdf');
    } catch (e) {
        console.error(e);
    }
}
identify();
