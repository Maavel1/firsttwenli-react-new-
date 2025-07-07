import React, { useEffect, useState } from "react";
import "./ContactPage.scss";
import Lottie from "lottie-react";
import animationData from "../../assets/Business_Team.json";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "../../components/ModalForm/ModalForm";
import { FaTelegramPlane, FaInstagram, FaVk, FaYoutube, FaEnvelope,FaGlobe   } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
     <>
      <Helmet>
        <title>Контакты | FirstTwenli</title>
        <meta name="description" content="Свяжитесь с нами — мы всегда рады обсудить ваш проект." />
        <meta property="og:title" content="Контакты | FirstTwenli" />
        <meta property="og:description" content="Свяжитесь с нами — мы всегда рады обсудить ваш проект." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firsttwenli.kz/contact" />
      </Helmet>
    <main className="">
      <div className="container">
        <div className="rows__contact">
        <div className="info_text__contact">
          <h2>Давайте обсудим ваш проект</h2>
          <p>У вас есть бизнес или идея, которую вы хотите вывести на новый уровень?
            Мы создаём индивидуальные сайты, которые не просто красиво выглядят — они работают на результат.</p>
            <p> Наша цель — помочь малому и среднему бизнесу заявить о себе в цифровом пространстве: профессионально, стильно и эффективно.
            Мы выслушаем вас, предложим оптимальное решение и воплотим проект под ключ.</p>
          <div className="list__info__text">
            <h3> <FaEnvelope />Email</h3>
         <a href="mailto:beebs@gmail.com">beebs@gmail.com</a>
          </div>
            <div className="list__info__text">
            <h3><FaGlobe />Социальные сети</h3>
            <Link
              to="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
            >  <FaInstagram />Instagram</Link>
            <Link
              to="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
            >  <FaTelegramPlane />Telegram</Link>
          </div>
        </div>
        <section className="">
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Напишите нам — мы на связи
          </button>
        </section>
        </div>
      </div> 
      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceTitle="Заявка с страницы Контакты"
      />
    </main>
    </>
  );
}
