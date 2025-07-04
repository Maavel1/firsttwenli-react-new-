const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Ошибка подключения к SMTP:", error);
  } else {
    console.log("SMTP-сервер готов принимать письма");
  }
});

const loadTemplate = (templateName) => {
  const templatePath = path.join(__dirname, "../templates", templateName);
  return fs.readFileSync(templatePath, "utf8");
};

const compileTemplate = (template, data) => {
  return template
    .replace(/{{companyName}}/g, data.companyName || "Наш Сервис")
    .replace(/{{name}}/g, data.name)
    .replace(/{{orderNumber}}/g, data.orderNumber)
    .replace(/{{currentDate}}/g, data.currentDate)
    .replace(/{{email}}/g, data.email)
    .replace(/{{message}}/g, data.message || "— не указан —");
};

const sendOrderConfirmation = async (to, data) => {
  try {
    const template = loadTemplate("emailTemplate.html");
    const html = compileTemplate(template, data);
    const subject = `✅ Подтверждение заявки №${data.orderNumber}`;

    const info = await transporter.sendMail({
      from: `"${data.companyName || "Наш Сервис"}" <${
        process.env.SMTP_USER
      }>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  sendOrderConfirmation,
  transporter,
};
