import React, { useEffect, useState } from "react";
import "./aboutPage.scss";
import Lottie from "lottie-react";
import animationData from "../../assets/Singing__Contract.json";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "../../components/ModalForm/ModalForm"; // Импорт модалки

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
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

        {/* Why Us Section */}
        <section className="why-us" data-aos="fade-right">
          <h2>Почему выбирают нас?</h2>
          <ul>
            <li>🚀 Быстрый запуск проекта — от идеи до запуска за 7 дней</li>
            <li>🎯 Упор на результат — сайт работает на ваш бизнес</li>
            <li>🧩 Полный цикл — от дизайна до SEO</li>
            <li>💼 Опыт работы с более чем 10+ отраслями</li>
          </ul>
        </section>

        {/* Mission Section */}
        <section className="mission" data-aos="fade-up">
          <h2>Наша миссия</h2>
          <p>
            Мы стремимся сделать качественные и доступные веб-решения для
            предпринимателей, чтобы у каждого бизнеса был шанс заявить о себе
            онлайн.
          </p>
        </section>

        {/* Experience / Stats Section */}
        <section className="experience" data-aos="zoom-in">
          <h2>Немного о цифрах</h2>
          <ul className="stats">
            <li><strong>50+</strong> выполненных проектов</li>
            <li><strong>5 лет</strong> опыта в веб-разработке</li>
            <li><strong>100%</strong> довольных клиентов</li>
          </ul>
        </section>

        {/* Process Section */}
        <section className="process" data-aos="fade-up">
          <h2>Как мы работаем</h2>
          <ol>
            <li>📞 Обсуждаем задачи и цели</li>
            <li>🧠 Проектируем и создаём дизайн</li>
            <li>💻 Разрабатываем сайт и подключаем всё необходимое</li>
            <li>🚀 Запускаем и поддерживаем</li>
          </ol>
        </section>

        {/* Team Section */}
        <section className="team" data-aos="fade-right">
          <h2>Наша команда</h2>
          <p>
            У нас небольшая, но сплочённая команда дизайнеров, разработчиков и
            маркетологов. Вместе мы создаём сайты, которые работают на результат.
          </p>
        </section>

        {/* Values Section */}
        <section className="values" data-aos="fade-left">
          <h2>Наши ценности</h2>
          <ul>
            <li>💡 Креативность и индивидуальный подход</li>
            <li>⚙️ Чёткий процесс и соблюдение сроков</li>
            <li>💬 Открытая коммуникация</li>
            <li>📈 Ориентированность на результат</li>
          </ul>
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
  );
}
