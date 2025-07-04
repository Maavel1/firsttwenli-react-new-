import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../../assets/logo_1.png"; // если есть логотип
import { FaTelegramPlane, FaInstagram, FaVk, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container-footer">
        <div className="footer-section brand">
          <img src={logo} alt="FirstTwenli" />
          <p>Создание сайтов для малого и среднего бизнеса.</p>
        </div>

        <div className="footer-section nav-links">
          <h4>Навигация</h4>
          <Link to="/">Главная</Link>
          <Link to="/services">Услуги</Link>
          <Link to="/about">О нас</Link>
          <Link to="/contact">Контакты</Link>
        </div>

        <div className="footer-section contacts">
          <h4>Контакты</h4>
          <p>Email: info@firsttwenli.com</p>
          <div className="social-icons">
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane />
              Telegram
            </a>

            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              Instagram
            </a>
          </div>
        </div>

        <div className="footer-section legal">
          <h4>Правовая информация</h4>
          <Link to="/privacy-policy">Политика конфиденциальности</Link>
          <Link to="/terms">Пользовательское соглашение</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FirstTwenli. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
