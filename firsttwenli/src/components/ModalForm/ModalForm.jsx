import React, { useEffect, useState } from "react";
import "./ModalForm.scss";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { formatTelegramMessage } from "../../utils/formatTelegramMessage";

const ModalForm = ({ isOpen, onClose, serviceTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    socialContact: "",
  });
  const [errors, setErrors] = useState({});

  const [animateOut, setAnimateOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const maxLengths = {
      name: 50,
      email: 100,
      message: 250,
      socialContact: 30,
    };

    // Валидация имени
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s'-]+$/;
    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, укажите ваше имя";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    } else if (formData.name.trim().length > maxLengths.name) {
      newErrors.name = `Имя не должно превышать ${maxLengths.name} символов`;
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Имя может содержать только буквы, пробелы и дефисы";
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Пожалуйста, укажите ваш email";
    } else if (formData.email.length > maxLengths.email) {
      newErrors.email = `Email не должен превышать ${maxLengths.email} символов`;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Пожалуйста, введите корректный email (например, example@domain.com)";
    }

    // Валидация сообщения
    if (formData.message.trim()) {
      if (formData.message.trim().length < 15) {
        newErrors.message = "Сообщение должно содержать минимум 15 символов";
      } else if (formData.message.trim().length > maxLengths.message) {
        newErrors.message = `Сообщение не должно превышать ${maxLengths.message} символов`;
      }
    }

    // Валидация соцсетей
    const socialRegex = /^@([A-Za-z0-9_]{1,30})$/;
    if (formData.socialContact.trim()) {
      if (formData.socialContact.trim().length > maxLengths.socialContact) {
        newErrors.socialContact = `Никнейм не должен превышать ${maxLengths.socialContact} символов`;
      } else if (!socialRegex.test(formData.socialContact.trim())) {
        newErrors.socialContact =
          "Введите корректный никнейм (например, @username)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      setAnimateOut(false);
      setSuccess(false);
      setError(false);
      setLoading(false);
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      // 1. Сначала отправляем на ваш бэкенд
      const orderResponse = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          message: formData.message,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.message || "Ошибка создания заказа");
      }

      // 2. Затем отправляем в Telegram (если нужно)
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const text = formatTelegramMessage(
        serviceTitle,
        formData,
        orderData.orderNumber
      );

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!telegramResponse.ok) {
        throw new Error("Ошибка отправки в Telegram (но заказ создан)");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "", socialContact: "" });
    } catch (err) {
      console.error("Ошибка:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-form ${animateOut ? "modal-close" : "modal-open"}`}
      >
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>

        <h2>
          {loading ? "Отправка..." : success ? "Спасибо!" : "Оставьте заявку"}
        </h2>

        {success && (
          <div className="modal-success">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h4>Запрос принят</h4>
            <p className="success-message">
              Письмо с подтверждением отправлено на
              <span className="success-email">вашу почту</span>
            </p>
          </div>
        )}
        {error && (
          <p className="modal-error">
            <FaTimesCircle />
            Произошла ошибка. Попробуйте позже.
          </p>
        )}
        {loading && (
          <p className="modal-info">
            <FaInfoCircle />
            Заявка отправляется...
          </p>
        )}

        {!success && (
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? "shake" : ""}
              disabled={loading}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={errors.email ? "shake" : ""}
              required
              disabled={loading}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
            <textarea
              name="message"
              placeholder="Комментарий"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              disabled={loading}
              className={errors.message ? "shake" : ""}
            />
            <input
              type="text"
              name="socialContact"
              placeholder="Ваш Telegram или Instagram (@nickname)"
              value={formData.socialContact}
              onChange={(e) =>
                setFormData({ ...formData, socialContact: e.target.value })
              }
              className={errors.socialContact ? "shake" : ""}
            />
            {errors.socialContact && (
              <span className="form-error">{errors.socialContact}</span>
            )}

            {errors.message && (
              <span className="form-error">{errors.message}</span>
            )}
            <button type="submit" disabled={loading}>
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalForm;
