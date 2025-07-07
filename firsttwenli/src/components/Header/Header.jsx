import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logo_1.png";
import ModalForm from "../ModalForm/ModalForm";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? " scrolledd" : ""}`}>
      <div className={`container-header${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <nav className="nav">
          <NavLink
            className={`navds${scrolled ? " scrolleddg" : ""}`}
            to="/"
            end
          >
            Главная
          </NavLink>
          <NavLink
            className={`navds${scrolled ? " scrolleddg" : ""}`}
            to="/services"
          >
            Услуги
          </NavLink>
             <NavLink
            className={`navds${scrolled ? " scrolleddg" : ""}`}
            to="/portfolio"
          >
            Портфолио
          </NavLink>
          <NavLink
            className={`navds${scrolled ? " scrolleddg" : ""}`}
            to="/contact"
          >
            Контакты
          </NavLink>
         <NavLink
            className={`navds${scrolled ? " scrolleddg" : ""}`}
            to="/about"
          >
            О нас
          </NavLink>
        </nav>
        <button className="cta-button" onClick={handleOpenModal}>
          Оставить заявку
        </button>
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceTitle="Наши услуги"
      />
    </header>
  );
};

export default Header;
