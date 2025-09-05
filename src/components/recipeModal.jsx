function parseIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`);
    }
  }
  return list;
}

export default function RecipeModal({ meal, onClose }) {
  const ingredients = parseIngredients(meal);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        
        <h2>{meal.strMeal}</h2>
        <p>
          {meal.strCategory} • {meal.strArea}
        </p>

        <h4>Ingredients</h4>
        <ul>
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>Instructions</h4>
        <p>{meal.strInstructions}</p>

        {meal.strYoutube && (
          <p>
            ▶ <a href={meal.strYoutube} target="_blank" rel="noreferrer">
              Watch Tutorial
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
