const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function listFields() {
    try {
        const pdfBytes = fs.readFileSync('c:/Trabajos/Lataberna/public/Ficha de Personaje Editable.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        
        const output = fields.map((field, index) => {
            const type = field.constructor.name;
            const name = field.getName();
            let page = -1;
            
            // Try to find the page (approximate for some cases but usually works)
            try {
                const widgets = field.acroField.getWidgets();
                if (widgets.length > 0) {
                    const pageRef = widgets[0].P();
                    if (pageRef) {
                        page = pdfDoc.getPages().findIndex(p => p.ref === pageRef) + 1;
                    }
                }
            } catch (e) {}

            return { index, name, type, page };
        });

        fs.writeFileSync('c:/Trabajos/Lataberna/scripts/fields-detailed.json', JSON.stringify(output, null, 2));
        console.log('Detalle de campos generado en scripts/fields-detailed.json');
    } catch (e) {
        console.error(e);
    }
}
listFields();
