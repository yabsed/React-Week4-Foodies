import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Food() {
  const { id } = useParams();
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img 
          src={food.image} 
          alt={food.name}
        />
        <div>
          <h1>{food.name}</h1>
          <span>
            {food.difficulty}
          </span>
          <div>
            <p>🍽️ {food.cuisine}요리</p>
            <p>⏱️ 준비시간 {food.prepTimeMinutes}분</p>
            <p>🔥 조리시간 {food.cookTimeMinutes}분</p>
          </div>
        </div>

        <div>
          {food.tags && food.tags.length > 0 ? (
            <p>🏷️ {food.tags.join(', ')}</p>
          ) : (
            <p>태그가 없습니다</p>
          )}
        </div>
      </div>

      <section>
        <h2>재료</h2>
        <p>
          {food.ingredients.join(', ')}
        </p>
      </section>

      <section>
        <h2>레시피</h2>
        <ol>
          {food.instructions.map((step, index) => (
            <li key={index}>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>요리 정보</h2>
        <div>
          <p>유형: {food.mealType.join(', ')}</p>
          <p>인분: {food.servings}인분</p>
          <p>칼로리: {food.caloriesPerServing}kcal</p>
          <p>평점: ⭐ {food.rating}</p>
        </div>
      </section>
    </div>
  );
}

export default Food;
