import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../styles/common.css";
import styles from "./home.module.css";

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const N = 8;
  const currentPage = parseInt(searchParams.get('page')) || 1; 
  const [foods, setFoods] = useState([]);
  const [foodsNum, setFoodsNum] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes?limit=${N}&skip=${N*(currentPage-1)}`)
      .then(res => res.json())
      .then(data => {
        setFoods(data.recipes); 
        setFoodsNum(data.total);
      });
  }, [currentPage]);

  if (!foods || foods.length === 0) {
    return <div className="loading">레시피를 불러오는 중...</div>;
  }

  // 총 페이지 수 계산
  const totalPages = Math.ceil(foodsNum / N);
  
  // 페이지네이션 번호 생성 함수
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // 총 페이지가 5개 이하면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 항상 5개 페이지를 표시하도록 로직 수정
      let startPage = Math.max(1, currentPage - 2);
      let endPage = startPage + maxVisiblePages - 1;
      
      // 마지막 페이지를 넘어가면 시작 페이지를 조정
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const changePage = (newPage) => {
    navigate(`/React-Week4-Foodies/?page=${newPage}`);
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>🍽️ 천개의 레시피</h1>
      <hr className={styles.homeDivider} />
      
      <div className={styles.recipesGrid}>
        {foods.map(food => (
          <Link key={food.id} to={`/React-Week4-Foodies/${food.id}`} className={styles.recipeCard}>
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
        {/* 이전 페이지 버튼 */}
        <button
          className={styles.paginationButton}
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← 이전
        </button>
        
        {/* 페이지 번호들 */}
        {generatePageNumbers().map(num => (
          <button
            key={num}
            className={styles.paginationButton}
            onClick={() => changePage(num)}
            disabled={currentPage === num}
          >
            {num}
          </button>
        ))}
        
        {/* 다음 페이지 버튼 */}
        <button
          className={styles.paginationButton}
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음 →
        </button>
      </div>
      
      {/* 페이지 정보 표시 */}
      <div className={styles.pageInfo}>
        <p>
          전체 {foodsNum}개 레시피 중 {((currentPage - 1) * N) + 1} - {Math.min(currentPage * N, foodsNum)}번째 표시 
          (페이지 {currentPage} / {totalPages})
        </p>
      </div>
    </div>
  );
}

export default Home;
