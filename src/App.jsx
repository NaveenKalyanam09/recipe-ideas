import { useState } from "react";
import RecipeCard from "./components/recipeCard";
import RecipeModal from "./components/recipeModal";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  // 🔍 Search by recipe name or ingredient
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a recipe name or ingredient");
      setMeals([]);
      return;
    }

    setLoading(true);
    setError("");
    setMeals([]);

    try {
      // Updated API: search.php?s=
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        query
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.meals) {
        setError("No recipes found. Try another keyword.");
      } else {
        setMeals(data.meals);
      }
    } catch (err) {
      setError("⚠ Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch details for modal
  async function openMealDetails(id) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedMeal(data.meals[0]);
      }
    } catch (err) {
      setError("⚠ Error loading meal details.");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelectedMeal(null);
  }

  return (
    <div className="container">
      <h1>🍽 Recipe Ideas</h1>
      <p className="subtitle">Search by dish name or ingredient</p>

      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="e.g., biryani, tomato rice, pasta"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>

      {loading && <p className="info">Loading…</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {meals.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            onClick={() => openMealDetails(meal.idMeal)}
          />
        ))}
      </div>

      {selectedMeal && (
        <RecipeModal meal={selectedMeal} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
