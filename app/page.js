import recipes from "../recipes.json";
import RecipeCard from "./components/RecipeCard";

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero__overlay">
          <div className="hero__topbar">
            <div className="hero__logo">
              <img src="/logo-les-petits-plats.svg" alt="Les Petits Plats" />
            </div>
          </div>

          <div className="hero__content">
            <h1 className="hero__headline">
              Découvrez nos recettes du quotidien, simples et délicieuses
            </h1>

            <form className="hero__search" action="#" role="search">
              <input
                type="text"
                placeholder="Rechercher une recette, un ingrédient..."
                aria-label="Rechercher une recette"
              />
              {/* Pas de submit tant que la recherche n'est pas implémentée */}
              <button type="button" aria-label="Rechercher">
                <img
                  src="/icon-search.svg"
                  alt=""
                  aria-hidden="true"
                  className="hero__search-icon"
                />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="page">
        <section className="filters-bar">
          <div className="filters-bar__left">
            <select className="filters-bar__select" aria-label="Ingrédients">
              <option>Ingrédients</option>
            </select>
            <select className="filters-bar__select" aria-label="Appareils">
              <option>Appareils</option>
            </select>
            <select className="filters-bar__select" aria-label="Ustensiles">
              <option>Ustensiles</option>
            </select>
          </div>

          <div className="filters-bar__right">
            <span className="filters-bar__count">{recipes.length} recettes</span>
          </div>
        </section>

        <section className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id ?? recipe.name} recipe={recipe} />
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>Copyright © 2025 - Les Petits Plats</p>
      </footer>
    </>
  );
}