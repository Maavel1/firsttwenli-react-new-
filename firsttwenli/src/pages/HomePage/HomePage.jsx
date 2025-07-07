import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import animationData from "../../assets/web_main.json";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
const [showAnimation, setShowAnimation] = useState(true);
  const [portfolioPreview, setPortfolioPreview] = useState(null);
const [portfolioData, setPortfolioData] = useState([]);
useEffect(() => {
  const interval = setInterval(() => {
    setShowAnimation((prev) => !prev);
  }, 3000); // каждые 6 секунд переключение

  return () => clearInterval(interval);
}, []);





// 1. Загружаем все портфолио один раз
useEffect(() => {
  fetch("http://localhost:5000/api/portfolio")
    .then((res) => res.json())
    .then((data) => setPortfolioData(data))
    .catch((err) => console.error("Ошибка загрузки портфолио:", err));
}, []);

// 2. Управляем скрытием анимации
useEffect(() => {
  const timer = setTimeout(() => {
    setShowAnimation(false);
  }, 3000);
  return () => clearTimeout(timer);
}, []);

// 3. Каждый раз при скрытии анимации выбираем новый проект
useEffect(() => {
  if (!showAnimation && portfolioData.length > 0) {
    const randomIndex = Math.floor(Math.random() * portfolioData.length);
    setPortfolioPreview(portfolioData[randomIndex]);
  }
}, [showAnimation, portfolioData]);

  return (
     <>
      <Helmet>
        <title>FirstTwenli — Разработка сайтов под ключ</title>
        <meta name="description" content="сайты, дизайн, поддержка — всё для развития вашего бизнеса в онлайне." />
        <meta property="og:title" content="FirstTwenli — Разработка сайтов под ключ" />
        <meta property="og:description" content="сайты, дизайн, поддержка — всё для развития вашего бизнеса в онлайне." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firsttwenli.kz/" />
      </Helmet>
    <main>
      <div className="container">
        <div className="main-rows">
          <div className="text-main">
            <div className="title-text">
              <h1 className="title-main">
                Отличное решение для вашего{" "}
                <span className="typing-text">
                  <Typewriter
                    words={[
                      "бизнеса",
                      "роста",
                      "развития",
                      "успеха",
                      "бренда",
                      // "цифрового будущего",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </h1>
              <p className="pre_title">
                Наша команда готова воплатить в жизнь ваши идей и предложить
                качественное решение для вашего бизнеса
              </p>
              <div className="btn_main">
          <Link to="/services" className="button type--C">
            <div className="button__line"></div>
            <div className="button__line"></div>
            <span className="button__text">Мне нужен сайт</span>
            <div className="button__drow1"></div>
            <div className="button__drow2"></div>
          </Link>
        </div>
            </div>
          </div>
      <div className="img-main">
        {showAnimation ? (
          <div className={`lottie-container ${showAnimation ? "fade-in" : "fade-out"}`}>
            <Lottie animationData={animationData} loop autoplay />
          </div>
        ) : (
          portfolioPreview && (
            <div className={`portfolio-card ${!showAnimation ? "fade-in-up" : "fade-out"}`}>
              <img
                src={`http://localhost:5000${portfolioPreview.image}`}
                alt={portfolioPreview.title}
                className="portfolio-card-img"
              />
              <h3>{portfolioPreview.title}</h3>
              <p>{portfolioPreview.description}</p>
              <Link to="/portfolio" className="btn-see-more">
                Смотреть портфолио →
              </Link>
            </div>
          )
        )}
      </div>
        </div>
      </div>
    </main>
        </>
  );
}
