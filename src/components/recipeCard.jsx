export default function RecipeCard({ meal, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
    </div>
  );
}