import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.scss";

// Названия человекопонятные
const readableNames = {
  services: "Услуги",
  1: "Создание лендингов",
  2: "Сайт-визитка",
  3: "Продвижение сайта",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Главная</Link>
      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;
        const name = readableNames[value] || decodeURIComponent(value);

        return isLast ? (
          <span key={to}> / {name}</span>
        ) : (
          <span key={to}>
            {" / "}
            <Link to={to}>{name}</Link>
          </span>
        );
      })}
    </nav>
  );
}
