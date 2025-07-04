import { useParams, Link } from "react-router-dom";
import "./ServiceDetailsPage.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import card1 from "../../assets/services/Launching-pana.svg";
import card2 from "../../assets/services/Rising-bro.svg";
import card3 from "../../assets/services/Market_launch-pana.svg";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import time from "../../assets/services/timer.svg";
import price from "../../assets/services/price-tag.svg";
import ModalForm from "../ModalForm/ModalForm";
// import {} from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import CommentItem from "../CommentItem/CommentItem";
import {
  FiChevronDown,
  FiClock,
  FiArrowUp,
  FiArrowDown,
  FiStar,
  FiFilter,
} from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
const services = [
  {
    id: 1,
    image: card1,
    title: "Создание лендингов",
    time: "1-2 недели",
    price: "от 20 000 ₸",
    fullText:
      "Создание уникального лендинга под ваш бизнес. Мы продумываем структуру, делаем прототип, дизайн и верстку. Высокая конверсия и адаптивность.",
  },
  {
    id: 2,
    image: card2,
    title: "Сайт-визитка",
    time: "1-2 недели",
    price: "от 20 000 ₸",
    fullText:
      "Идеально для тех, кто хочет просто и быстро представить себя или компанию в интернете. Дизайн, структура и быстрая загрузка.",
  },
  {
    id: 3,
    image: card3,
    title: "Продвижение сайта",
    time: "1-2 недели",
    price: "от 20 000 ₸",
    fullText:
      "SEO, контекстная реклама, настройка аналитики и повышение узнаваемости сайта. Полный аудит и сопровождение.",
  },
];

export default function ServiceDetailsPage() {
  const [commentsData, setCommentsData] = useState({
    comments: [],
    total: 0,
    page: 1,
    totalPages: 1,
    average_rating: 0,
  });
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const service = services.find((s) => s.id === parseInt(id));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [expandedComments, setExpandedComments] = useState({}); // объект { id: true/false }
  const [height, setHeight] = useState("100px");
  const textRef = useRef(null);
  const [errors, setErrors] = useState({
    userName: "",
    comment: "",
    rating: "",
    general: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    sort: "newest",
    rating: null,
  });

  const fetchData = async (page = 1) => {
    // Добавляем параметр page
    setLoadingComments(true);
    try {
      const [commentsRes, ratingRes] = await Promise.all([
        fetch(`http://localhost:5000/api/comments/${id}?page=${page}&limit=5`), // Используем page
        fetch(`http://localhost:5000/api/comments/${id}/rating`),
      ]);

      const commentsData = await commentsRes.json();
      const ratingData = await ratingRes.json();

      setCommentsData({
        ...commentsData,
        average_rating: parseFloat(ratingData.average_rating) || 0,
        total: parseInt(ratingData.total_comments) || commentsData.total,
      });
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const StarRatingDisplay = ({ rating = 0 }) => {
    const numericRating = Math.max(0, Math.min(5, Number(rating))); // Ограничиваем рейтинг от 0 до 5

    return (
      <div className="star-rating-display">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFullyFilled = star <= Math.floor(numericRating);
          const isPartiallyFilled =
            star === Math.ceil(numericRating) && numericRating % 1 > 0;

          return (
            <div key={star} className="star-container">
              <div className="star-background">
                <AiFillStar className="star-icon empty" />
              </div>
              <div
                className="star-foreground"
                style={{
                  width: isFullyFilled
                    ? "100%"
                    : isPartiallyFilled
                    ? `${(numericRating % 1) * 100}%`
                    : "0%",
                }}
              >
                <AiFillStar className="star-icon filled" />
              </div>
            </div>
          );
        })}
        <span className="rating-value">({numericRating.toFixed(1)})</span>
      </div>
    );
  };
  const handleAddComment = async () => {
    // Сброс предыдущих ошибок
    setErrors({
      userName: "",
      comment: "",
      rating: "",
      general: "",
    });
    setError("");

    // Валидация на клиенте
    let isValid = true;
    const newErrors = {
      userName: "",
      comment: "",
      rating: "",
      general: "",
    };

    // Валидация имени
    if (!userName.trim()) {
      newErrors.userName = "Имя обязательно для заполнения";
      isValid = false;
    } else {
      const trimmedName = userName.trim();
      if (trimmedName.length < 2) {
        newErrors.userName = "Имя должно содержать минимум 2 символа";
        isValid = false;
      } else if (trimmedName.length > 50) {
        newErrors.userName = "Имя не должно превышать 50 символов";
        isValid = false;
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/i.test(trimmedName)) {
        newErrors.userName =
          "Имя может содержать только буквы, пробелы и дефисы";
        isValid = false;
      }
    }

    // Валидация комментария
    if (!newComment.trim()) {
      newErrors.comment = "Комментарий обязателен для заполнения";
      isValid = false;
    } else {
      const trimmedComment = newComment.trim();
      if (trimmedComment.length < 20) {
        newErrors.comment = "Комментарий должен содержать минимум 20 символов";
        isValid = false;
      } else if (trimmedComment.length > 400) {
        newErrors.comment = "Комментарий не должен превышать 400 символов";
        isValid = false;
      } else if (trimmedComment.split(/\s+/).length < 3) {
        newErrors.comment = "Комментарий должен содержать минимум 3 слова";
        isValid = false;
      } else if (/[<>{}[\]]/.test(trimmedComment)) {
        newErrors.comment = "Комментарий содержит недопустимые символы";
        isValid = false;
      }
    }

    if (!selectedRating || selectedRating < 1 || selectedRating > 5) {
      newErrors.rating = "Пожалуйста, выберите рейтинг от 1 до 5 звезд";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: id,
          user_name: userName,
          comment_text: newComment,
          rating: selectedRating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при отправке отзыва");
      }

      const ratingRes = await fetch(
        `http://localhost:5000/api/comments/${id}/rating`
      );
      const ratingData = await ratingRes.json();

      const data = await response.json();
      // Обновляем список комментариев
      setCommentsData((prev) => ({
        ...prev,
        comments: [data, ...prev.comments],
        total: prev.total + 1,
        average_rating: parseFloat(ratingData.average_rating) || 0,
      }));
      setNewComment("");
      setUserName("");
      setSelectedRating(0);
    } catch (err) {
      console.error("Error adding comment:", err);
      setErrors({
        ...errors,
        general: err.message || "Не удалось отправить отзыв",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!service) {
    return <div className="container">Услуга не найдена.</div>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true); // Открыть модальное окно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  const toggleExpand = () => {
    if (textRef.current) {
      if (isExpanded) {
        // Сворачиваем обратно
        setHeight("100px");
      } else {
        // Раскрываем до полной высоты
        setHeight(`${textRef.current.scrollHeight}px`);
      }
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    if (textRef.current && isExpanded) {
      setHeight(`${textRef.current.scrollHeight}px`);
    }
  }, [commentsData]);

  return (
    <div className="service-details container">
      <Breadcrumbs />
      <div className="rows_service_details">
        <div className="img_service_details">
          <img src={service.image} alt={service.title} />
        </div>
        <div className="content_service_details">
          <h1>{service.title}</h1>
          <p>{service.fullText}</p>
          <div className="details_card">
            <div className="time_devole">
              <img style={{ maxWidth: "27px" }} src={time} alt="срок" />
              <p>срок {service.time}</p>
            </div>
            <div className="price_card">
              <img style={{ maxWidth: "24px" }} src={price} alt="цена" />
              <p>{service.price}</p>
            </div>
          </div>
          <div className="btn_service_details">
            <Link to="/portfolio" className="portfolio-btn">
              Просмотр портфолио
            </Link>
            <button className="cta-button" onClick={handleOpenModal}>
              Оформить заявку
            </button>
          </div>
          <div className="rating_service_details">
            <p>Оцените нашу работу</p>
            <div className="stars">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <AiFillStar
                    key={index}
                    className={`star-icon ${
                      ratingValue <= selectedRating ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRating(ratingValue)}
                  />
                );
              })}
            </div>
            {errors.rating && (
              <div className="error-message">{errors.rating}</div>
            )}
          </div>

          <div className="add-comment">
            <div className="form-group">
              <input
                type="text"
                placeholder="Ваше имя"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrors({ ...errors, userName: "" });
                }}
                maxLength={50}
                disabled={isSubmitting}
                className={errors.userName ? "error" : ""}
              />
              {errors.userName && (
                <div className="error-message">{errors.userName}</div>
              )}
            </div>

            <div className="form-group">
              <textarea
                placeholder="Поделитесь вашим мнением о нашем сервисе"
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                  setErrors({ ...errors, comment: "" });
                }}
                rows={5}
                className={errors.comment ? "error" : ""}
                disabled={isSubmitting}
              />
              <p className="hint-text">
                {newComment.length}/400 символов
                {newComment.length >= 20 && " ✓"}
              </p>
              {errors.comment && (
                <div className="error-message">{errors.comment}</div>
              )}
            </div>

            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}
            {error && (
              <div className="error-message general-error">{error}</div>
            )}

            <button onClick={handleAddComment} disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить отзыв"}
            </button>
          </div>
        </div>

        <ModalForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceTitle="Сайт лендинг"
        />
      </div>

      <div className="comments-section">
        <h2>Отзывы клиентов ({commentsData.total})</h2>
        <div className="average-rating-container">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <StarRatingDisplay rating={commentsData.average_rating} />
          </motion.div>
        </div>

        {commentsData.comments.length === 0 ? (
          <p className="no-comments">Пока нет отзывов. Будьте первым!</p>
        ) : (
          <>
            <ul className="comments-list">
              {commentsData.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </ul>

            {commentsData.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => fetchData(commentsData.page - 1)}
                  disabled={commentsData.page === 1}
                >
                  Предыдущая
                </button>
                <span>
                  Страница {commentsData.page} из {commentsData.totalPages}
                </span>
                <button
                  onClick={() => fetchData(commentsData.page + 1)}
                  disabled={commentsData.page >= commentsData.totalPages}
                >
                  Следующая
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
