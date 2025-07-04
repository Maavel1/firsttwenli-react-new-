import React from "react";
import "./HomePage.scss";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import animationData from "../../assets/web_main.json";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
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
                <Link to="/services" class="button type--C">
                  <div class="button__line"></div>
                  <div class="button__line"></div>
                  <span class="button__text">
                    {" "}
                    <Link to="/services">Мне нужен сайт</Link>
                  </span>
                  <div class="button__drow1"></div>
                  <div class="button__drow2"></div>
                </Link>
              </div>
            </div>
          </div>
          <div className="img-main">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
