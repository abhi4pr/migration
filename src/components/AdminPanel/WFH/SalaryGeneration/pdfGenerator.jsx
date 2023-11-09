import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import Template1 from "./InvoiceTemplate1";
import Template2 from "./InoviceTemplate2";

const templates = {
  1: Template1,
  2: Template2,
};

export const generatePDF = (rowData) => {
  const TemplateComponent = templates[rowData.invoice_template_no];

  if (!TemplateComponent) {
    console.error(
      "Template not found for invoice_template_no:",
      rowData.invoice_template_no
    );
    return;
  }

  const templateHTML = ReactDOMServer.renderToStaticMarkup(
    <TemplateComponent data={rowData} />
  );

  const element = document.createElement("div");
  element.innerHTML = templateHTML;

  const options = {
    margin: 10,
    filename: `${rowData.user_name} ${rowData.month} invoice.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().from(element).set(options).save();
};
