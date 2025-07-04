const { sendOrderConfirmation } = require("../services/emailService");

// Улучшенная генерация номера заказа
const generateOrderNumber = () => {
  const datePart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(Math.random() * 9000 + 1000);
  return `ORD-${datePart}-${randomPart}`;
};

const createOrder = async (req, res) => {
  try {
    const { email, name, message } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Пожалуйста, укажите email и имя",
      });
    }

    const orderNumber = generateOrderNumber();
    const currentDate = new Date().toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Используем только sendOrderConfirmation
    await sendOrderConfirmation(email, {
      name,
      orderNumber,
      currentDate,
      email,
      message,
      companyName: process.env.COMPANY_NAME,
    });

    return res.status(200).json({
      success: true,
      message: "Заявка успешно отправлена!",
      orderNumber,
    });
  } catch (error) {
    console.error("Ошибка при обработке заказа:", error);
    return res.status(500).json({
      success: false,
      message: "Произошла ошибка при отправке заявки",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = [
      { orderId: 1, userId: 1, products: ["product1"], totalPrice: 100 },
      { orderId: 2, userId: 2, products: ["product2"], totalPrice: 150 },
    ];
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения заказов" });
  }
};

module.exports = { createOrder, getOrders };
