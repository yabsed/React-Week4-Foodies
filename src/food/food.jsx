import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/common.css";
import styles from "./food.module.css";

function Food() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setFood(data);
        console.log(data);
      });
  }, [id]);

  if (!food) {
    return <div className="loading">레시피를 불러오는 중...</div>;
  }

  return (
    <div className={styles.foodContainer}>
      <button 
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← 뒤로 가기
      </button>
      
      <div className={styles.foodHeader}>
        <div className={styles.foodHero}>
          <img 
            src={food.image} 
            alt={food.name}
            className={styles.foodImage}
          />
          <div className={styles.foodDetails}>
            <h1 className={styles.foodTitle}>{food.name}</h1>
            <span className={styles.foodDifficulty}>
              🔥 {food.difficulty}
            </span>
            <div className={styles.foodQuickInfo}>
              <div className={styles.quickInfoItem}>
                <p><span className="emoji">🍽️</span> {food.cuisine} 요리</p>
              </div>
              <div className={styles.quickInfoItem}>
                <p><span className="emoji">⏱️</span> 준비 {food.prepTimeMinutes}분</p>
              </div>
              <div className={styles.quickInfoItem}>
                <p><span className="emoji">🔥</span> 조리 {food.cookTimeMinutes}분</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.foodTagsSection}>
        <h2 className="section-title">🏷️ 태그</h2>
        {food.tags && food.tags.length > 0 ? (
          <div className={styles.foodTags}>
            {food.tags.map((tag, index) => (
              <span key={index} className={styles.foodTag}>
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p>태그가 없습니다</p>
        )}
      </div>

      <section className={styles.foodSection}>
        <h2>🥘 재료</h2>
        <p className={styles.ingredientsText}>
          {food.ingredients.join(', ')}
        </p>
      </section>

      <section className={styles.foodSection}>
        <h2>👨‍🍳 레시피</h2>
        <ol className={styles.instructionsList}>
          {food.instructions.map((step, index) => (
            <li key={index} className={styles.instructionItem}>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.foodSection}>
        <h2>📊 요리 정보</h2>
        <div className={styles.foodInfoGrid}>
          <div className={styles.foodInfoItem}>
            <p><span className="emoji">🍽️</span> 유형: {food.mealType.join(', ')}</p>
          </div>
          <div className={styles.foodInfoItem}>
            <p><span className="emoji">👥</span> 인분: {food.servings}인분</p>
          </div>
          <div className={styles.foodInfoItem}>
            <p><span className="emoji">⚡</span> 칼로리: {food.caloriesPerServing}kcal</p>
          </div>
          <div className={styles.foodInfoItem}>
            <p><span className="emoji">⭐</span> 평점: <span className={styles.rating}>{food.rating}</span></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Food;
