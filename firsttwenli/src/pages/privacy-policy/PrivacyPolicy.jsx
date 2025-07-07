import React from "react";
import "./PrivacyPolicy.scss";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
     <>
      <Helmet>
        <title>Политика конфиденциальности | FirstTwenli</title>
        <meta name="description" content="Узнайте, как мы обрабатываем и защищаем ваши личные данные." />
        <meta property="og:title" content="Политика конфиденциальности | FirstTwenli" />
        <meta property="og:description" content="Узнайте, как мы обрабатываем и защищаем ваши личные данные." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firsttwenli.kz/privacy-policy" />
      </Helmet>
    <main className="privacy-container">
      <div className="container">
        <h1>Политика конфиденциальности</h1>
        <p><strong>Дата вступления в силу:</strong> [07.07.2025]</p>

        <h2>1. Какие данные мы собираем</h2>
        <p>Мы можем собирать следующие персональные данные:</p>
        <ul>
          <li>Имя</li>
          <li>Email-адрес</li>
          <li>Ссылки на соцсети</li>
          <li>Комментарии, отправленные через формы</li>
          <li>IP-адрес, тип устройства и браузера (через Cookies или аналитические системы)</li>
        </ul>

        <h2>2. Цель сбора данных</h2>
        <p>Мы используем персональные данные только в следующих целях:</p>
        <ul>
          <li>Связь с вами по поводу услуг</li>
          <li>Обработка заказов и заявок</li>
          <li>Улучшение качества сайта и услуг</li>
          <li>Предоставление консультаций и поддержки</li>
          <li>Публикация работ в портфолио (с согласия)</li>
        </ul>

        <h2>3. Хранение и защита данных</h2>
        <ul>
          <li>Данные хранятся на защищённых серверах</li>
          <li>Мы используем HTTPS</li>
          <li>Доступ ограничен уполномоченными лицами</li>
          <li>Данные не передаются третьим лицам без согласия</li>
        </ul>

        <h2>4. Cookies и аналитика</h2>
        <p>Мы используем Cookies-файлы и инструменты аналитики (например, Google Analytics) для:</p>
           <ul>
          <li>Анонимной статистики посещений</li>
          <li>Улучшения пользовательского опыта</li>
        </ul>
        <p>Вы можете отключить Cookies в настройках браузера.</p>

        <h2>5. Права пользователя</h2>
        <p>Согласно законодательству РК, вы имеете право:</p>
        <ul>
          <li>Получить информацию о своих данных</li>
          <li>Изменить или удалить их</li>
          <li>Отозвать согласие</li>
          <li>Потребовать прекращения обработки</li>
        </ul>

        <h2>6. Согласие</h2>
        <p>Перед отправкой формы (заявки, отзыва и т.д.) вы даёте согласие на обработку персональных данных в соответствии с данной Политикой.</p>

        <h2>7. Контакты</h2>
        <p>
          📩 Email: <a href="mailto:beebs@gmail.com">beebs@gmail.com</a><br />
          📱 Instagram: <a href="https://instagram.com/firsttwenli" target="_blank" rel="noreferrer">@firsttwenli</a><br />
          📲 Telegram: <a href="https://t.me/firsttwenli" target="_blank" rel="noreferrer">@firsttwenli</a>
        </p>

        <h2>8. Изменения в политике</h2>
        <p>Мы можем вносить изменения в данную политику. Все обновления публикуются на этой странице.</p>
      </div>
    </main>
        </>
  );
}
