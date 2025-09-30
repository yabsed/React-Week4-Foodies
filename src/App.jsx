import React, { useEffect, useState } from "react";

function App() {

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

  return (
    <div>
      <h1>천개의 레시피</h1>
      <hr />
      {foods.map(food => (
        <div key={food.id}>
          <img src={food.image} alt={food.name} />
          <h2>{food.name}</h2>
          <p>{food.difficulty}</p>
          <ul>
            {food.tags.slice(0, 3).map((tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        {[1,2,3,4,5,6,7,8,9,10].map(num => (
          <button
            key={num}
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

export default App;
