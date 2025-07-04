import React, { useEffect, useState } from "react";
import "./contactPage.scss";
import Lottie from "lottie-react";
import animationData from "../../assets/Business_Team.json";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "../../components/ModalForm/ModalForm";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="contact-page">
      <div className="container">
        {/* Hero / Intro */}
        <section className="contact-hero" data-aos="fade-up">
          <div className="text-block">
            <h1>Свяжитесь с нами</h1>
            <p>
              Мы работаем полностью онлайн и всегда на связи через email и форму обратной связи. Напишите нам — мы ответим быстро!
            </p>
          </div>
          <div className="animation-block">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </section>

        {/* Contact Info */}
        <section className="contact-info" data-aos="fade-right">
          <h2>Как с нами связаться</h2>
          <ul>
            <li>✉️ Email: <a href="mailto:info@example.com">info@example.com</a></li>
            <li>🌐 Соцсети:
              <ul className="social-links">
                <li><a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer">Telegram</a></li>
                <li><a href="https://vk.com/yourvk" target="_blank" rel="noreferrer">VK</a></li>
                <li><a href="https://www.linkedin.com/in/yourlinkedin" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="cta" data-aos="fade-up">
          <h2>Хотите обсудить проект?</h2>
          <p>Оставьте заявку через форму, и мы свяжемся с вами в ближайшее время.</p>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Оставить заявку
          </button>
        </section>
      </div>

      {/* Модальное окно заявки */}
      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle="Заявка с страницы Контакты"
      />
    </main>
  );
}
