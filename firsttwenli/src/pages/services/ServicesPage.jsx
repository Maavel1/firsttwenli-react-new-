import { useEffect, useRef, useState } from "react";
import "./ServicesPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Helmet } from 'react-helmet-async';

import ServiceCard from "../../components/ServiceCard/ServiceCard";
import ModalForm from "../../components/ModalForm/ModalForm";

import poster2 from "../../assets/promo/poster2_c.png";
import poster3 from "../../assets/promo/poster_3.png";

import card1 from "../../assets/services/Launching-pana.svg";
import card2 from "../../assets/services/Rising-bro.svg";
import card3 from "../../assets/services/Market_launch-pana.svg";

const services = [
  {
    id: 1,
    image: card1,
    title: "Создание лендингов",
    description: "Одностраничные сайты с высокой конверсией под ключ.",
  },
  {
    id: 2,
    image: card2,
    title: "Сайт-визитка",
    description: "Представьте свой бизнес в интернете просто и стильно.",
  },
  {
    id: 3,
    image: card3,
    title: "Продвижение сайта",
    description: "SEO и реклама для привлечения клиентов, и увеличения продаж.",
  },
];

const promoImages = [poster2, poster3];

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const progressBarRef = useRef(null);
  const delay = 4000;

  const openModal = (title) => {
    setSelectedService(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService("");
  };

  const resetProgressBar = () => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = "none";
      progressBarRef.current.style.width = "0%";

      // Нужно дождаться применения стилей до начала новой анимации
      requestAnimationFrame(() => {
        progressBarRef.current.style.transition = `width ${delay}ms linear`;
        progressBarRef.current.style.width = "100%";
      });
    }
  };

  useEffect(() => {
    resetProgressBar(); // стартуем анимацию на первый прогон
  }, []);

  return (
       <>
      <Helmet>
        <title>Услуги | FirstTwenli</title>
        <meta name="description" content="Посмотрите наши услуги по разработке сайтов и цифровым решениям." />
        <meta property="og:title" content="Услуги | FirstTwenli" />
        <meta property="og:description" content="Посмотрите наши услуги по разработке сайтов и цифровым решениям." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firsttwenli-react-new.vercel.app/services" />
      </Helmet>

    <main className="services-page">
      <div className="container">
        <div className="promo-slider">
          <div className="promo-swiper-wrapper" style={{ position: "relative" }}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              onSlideChange={() => resetProgressBar()}
            >
              {promoImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="promo-slide">
                    <img src={img} alt={`Промо ${idx + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                ref={progressBarRef}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="services-list container">
        <h2 className="title_services">Наши услуги</h2>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              image={service.image}
              title={service.title}
              description={service.description}
              onRequest={openModal}
            />
          ))}
        </div>

        <ModalForm
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceTitle={selectedService}
        />
      </div>
    </main>
    </>
  );
}
