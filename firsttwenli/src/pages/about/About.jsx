import React, { useEffect, useState } from "react";
import "./aboutPage.scss";
import Lottie from "lottie-react";
import animationData from "../../assets/Singing__Contract.json";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "../../components/ModalForm/ModalForm"; // Импорт модалки
import { FaHandshake, FaPaintBrush, FaLaptopCode, FaRocket } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
     <>
      <Helmet>
        <title>О нас | FirstTwenli</title>
        <meta name="description" content="Узнайте больше о нашей команде и философии работы." />
        <meta property="og:title" content="О нас | FirstTwenli" />
        <meta property="og:description" content="Узнайте больше о нашей команде и философии работы." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firsttwenli.kz/about" />
      </Helmet>
    <main className="about-page">
      <div className="container">
        {/* Hero / Intro Section */}
        <section className="about-hero" data-aos="fade-up">
          <div className="text-block">
            <h1>О нас</h1>
            <p>
              Мы — команда профессионалов, специализирующихся на создании
              эффективных сайтов для малого и среднего бизнеса. Лендинги,
              сайты-визитки — мы делаем всё, чтобы помочь вам выделиться в
              интернете.
            </p>
          </div>
          <div className="animation-block">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </section>

        {/* Experience / Stats Section */}
        <section className="experience" data-aos="zoom-in">
          <h2>Немного о цифрах</h2>
          <ul className="stats">
            <li><strong>40+</strong> выполненных проектов</li>
            <li><strong>5 лет</strong> опыта в веб-разработке</li>
            <li><strong>100%</strong> довольных клиентов</li>
          </ul>
        </section>

        {/* Process Section */}
        <section className="process" data-aos="fade-up">
          <h2>Как мы работаем</h2>
          <ol>
          <li><FaHandshake className="icon handshake" /> Обсуждаем задачи и цели</li>
          <li><FaPaintBrush className="icon paint" /> Проектируем и создаём дизайн</li>
          <li><FaLaptopCode className="icon code" /> Разрабатываем сайт и подключаем всё необходимое</li>
          <li><FaRocket className="icon rocket" /> Запускаем проект и поддерживаем</li>
          </ol>
        </section>

        {/* Call to Action */}
        <section className="cta" data-aos="fade-up">
          <h2>Готовы обсудить проект?</h2>
          <p>Свяжитесь с нами — мы поможем запустить сайт, который будет работать на ваш бизнес.</p>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Оставить заявку
          </button>
        </section>
      </div>

      {/* Модальное окно заявки */}
      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle="Заявка с страницы О нас"
      />
    </main>
    </>
  );
}
