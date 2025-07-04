import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";

const CommentItem = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const contentRef = useRef(null);
  const commentRating = comment.rating ? Number(comment.rating) : 0;

  useEffect(() => {
    if (contentRef.current) {
      // Получаем высоту строки
      const lineHeight =
        parseInt(getComputedStyle(contentRef.current).lineHeight) || 24;
      const maxCollapsedHeight = 48; // 48px для 2 строк
      const contentHeight = contentRef.current.scrollHeight;

      // Если контент занимает больше 48px (примерно 3 строки), показываем кнопку
      setNeedsExpand(contentHeight > maxCollapsedHeight + 1); // Добавляем погрешность, например, 1px

      // Если контент по высоте меньше или равен 48px (2 строки), показываем текст полностью
      if (contentHeight <= maxCollapsedHeight) {
        setIsExpanded(true);
      }
    }
  }, [comment.comment_text]);

  return (
    <li className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.user_name}</span>
        <span className="comment-date">{comment.formatted_date}</span>
      </div>

      <div className="comment-rating">
        {[...Array(5)].map((_, i) => {
          const rating = i + 1;
          return (
            <AiFillStar
              key={i}
              className={`star-icon ${
                rating <= commentRating ? "filled" : "empty"
              }`}
            />
          );
        })}
      </div>

      <motion.div
        ref={contentRef}
        initial={false}
        animate={{
          height: isExpanded
            ? contentRef.current?.scrollHeight || "auto"
            : needsExpand
            ? 24
            : "auto",
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ overflow: "hidden" }}
      >
        <div>
          <p className="comment-text">{comment.comment_text}</p>
        </div>
      </motion.div>

      {needsExpand && (
        <div className="read-more-container">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="read-more-btn"
          >
            {isExpanded ? "Скрыть" : "Читать полностью"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </button>
        </div>
      )}
    </li>
  );
};

export default CommentItem;
