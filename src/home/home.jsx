import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/common.css";
import styles from "./home.module.css";

function Home() {

  const N = 12

  const [pageIndex, setPageIndex] = useState(1); 
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes?limit=${N}&skip=${N*(pageIndex-1)}`)
      .then(res => res.json())
      .then(data => {
        setFoods(data.recipes); 
        console.log(data.recipes); 
      });
  }, [pageIndex]);

  if (!foods || foods.length === 0) {
    return <div className="loading">레시피를 불러오는 중...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>🍽️ 천개의 레시피</h1>
      <hr className={styles.homeDivider} />
      
      <div className={styles.recipesGrid}>
        {foods.map(food => (
          <Link key={food.id} to={`/React-Week4/${food.id}`} className={styles.recipeCard}>
            <img 
              src={food.image} 
              alt={food.name} 
              className={styles.recipeImage}
            />
            <div className={styles.recipeContent}>
              <h2 className={styles.recipeTitle}>{food.name}</h2>
              <span className={styles.recipeDifficulty}>
                🔥 {food.difficulty}
              </span>
              <ul className={styles.recipeTags}>
                {food.tags.slice(0, 3).map((tag, idx) => (
                  <li key={idx} className={styles.recipeTag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
      
      <div className={styles.pagination}>
        {[1,2,3,4,5,6,7,8,9,10].map(num => (
          <button
            key={num}
            className={styles.paginationButton}
            onClick={() => setPageIndex(num)}
            disabled={pageIndex === num}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
