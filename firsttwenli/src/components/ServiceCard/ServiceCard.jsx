import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.scss";

export default function ServiceCard({
  image,
  title,
  description,
  id,
  onRequest,
}) {
  return (
    <div className="service-card">
      <div className="service-details"></div>
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="link_and_btn">
          <Link to={`/services/${id}`} className="more-btn">
            Подробнее
          </Link>
          <button className="btn_zakaz" onClick={() => onRequest(title)}>
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
}
