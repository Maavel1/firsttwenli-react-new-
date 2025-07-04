export const formatTelegramMessage = (serviceTitle, formData, orderNumber) => {
  const getField = (field, label) => {
    if (!field?.trim()) return `*${label}:* —`;
    return `*${label}:* ${field.trim()}`;
  };

  const getSocialContact = (socialContact) => {
    if (!socialContact?.trim()) return "";
    return `*Контакт в Telegram/Instagram:* ${socialContact.trim()}`;
  };

  return `
    📩 *Новая заявка*
  *Номер заказа:* ${orderNumber}
    ${getField(serviceTitle, "Услуга")}
    ${getField(formData.name, "Имя")}
    ${getField(formData.email, "Email")}
    ${getField(formData.message, "Комментарий")}
    ${getSocialContact(formData.socialContact)}
  
    *Дата:* ${new Date().toLocaleString()}
    `;
};
