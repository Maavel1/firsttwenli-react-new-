import React, { useState, useEffect } from "react";
import "./Portfolio.scss";
import portfolio_1 from "../../assets/portfolio/portfolio_2.webp";
import { Helmet } from "react-helmet-async";
export default function Portfolio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

const [portfolioData, setPortfolioData] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/portfolio")
    .then((res) => res.json())
    .then((data) => setPortfolioData(data))
    .catch((err) => console.error("Ошибка загрузки портфолио:", err));
}, []);

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";


    const openModal = (project) => {
    setActiveProject(project);
    setModalVisible(true);
    setTimeout(() => {
        setModalOpen(true);
    }, 20); 
    };

    const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
        setModalVisible(false);
        setActiveProject(null);
    }, 300);
    };

  const nextProject = () => {
    const currentIndex = portfolioData.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % portfolioData.length;
    setActiveProject(portfolioData[nextIndex]);
  };

  const prevProject = () => {
    const currentIndex = portfolioData.findIndex((p) => p.id === activeProject.id);
    const prevIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    setActiveProject(portfolioData[prevIndex]);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
     <>
      <Helmet>
        <title>Портфолио | FirstTwenli</title>
        <meta name="description" content="Посмотрите примеры наших реализованных проектов — от лендингов до интернет-магазинов." />
        <meta property="og:title" content="Портфолио | FirstTwenli" />
        <meta property="og:description" content="Посмотрите примеры наших реализованных проектов — от лендингов до интернет-магазинов." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://firsttwenli.kz/portfolio" />
      </Helmet>
    <main>
      <div className="container">
        <h1 className="title__portfolio">Наше портфолио</h1>
        <div className="rows__card__portfolio">
          {portfolioData.map((item) => (
            <div className="card__portfolio" key={item.id}>
                 <img
                className="img__card__info__portfolio"
                src={`${API_URL}${item.image}`}
                alt="img portfolio"
              />
              <div className="decr__info">
                <div className="title__button__more">
                  <h2 className="title_card_portfolio">{item.title}</h2>
                  <button onClick={() => openModal(item)}>подробнее</button>
                </div>
                <p className="pre__title_card">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

{modalVisible && activeProject && (
  <div className={`modal__overlay ${modalOpen ? "show" : "hide"}`} onClick={closeModal}>
    <div
      className={`modal__content ${modalOpen ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="modal__close" onClick={closeModal}>×</button>
      
      <div className="modal__navigation">
        <button className="nav__arrow" onClick={prevProject}></button>
        <button className="nav__arrow" onClick={nextProject}></button>
      </div>

      <h2>{activeProject.title}</h2>
      <img   src={`${API_URL}${activeProject.image}`} alt="portfolio full" style={{ width: "100%", borderRadius: "10px" }} />
      <p style={{ marginTop: "20px", color: '#666' }}>{activeProject.details}</p>
    </div>
  </div>
)}
    </main>
      </>
  );
}
