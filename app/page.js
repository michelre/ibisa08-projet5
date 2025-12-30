"use client";

import { useState } from "react";
import recipes from "../recipes.json";
import RecipeCard from "./components/RecipeCard";
import Select from "./components/Select";
import Tag from "./components/Tag";

export default function Home() {
  const [allRecipes, setAllRecipes] = useState(recipes);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppareils, setSelectedAppareils] = useState([]);
  const [selectedUstensils, setSelectedUstensils] = useState([]);

  const ingredients = Array.from(
    new Set(
      recipes
        .map((r) => r.ingredients)
        .flat()
        .map((i) => i.ingredient)
    )
  ).map((ingredient, index) => ({ id: `ingredient-${index}`, label: ingredient }));

  const appareils = Array.from(new Set(recipes.map((r) => r.appliance))).map((appliance, index) => ({
    id: `appliance-${index}`,
    label: appliance,
  }));

  const ustensils = Array.from(new Set(recipes.map((r) => r.ustensils).flat())).map((ustensil, index) => ({
    id: `ustensil-${index}`,
    label: ustensil,
  }));

  const filterByIngredients = (list) => {
    if (list.length === 0) return recipes;
    return recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) => i.ingredient);
      return list.every((x) => recipeIngredients.includes(x));
    });
  };

  const filterByAppareils = (list) => {
    if (list.length === 0) return recipes;
    return recipes.filter((recipe) => list.includes(recipe.appliance));
  };

  const filterByUstensils = (list) => {
    if (list.length === 0) return recipes;
    return recipes.filter((recipe) => list.every((x) => recipe.ustensils.includes(x)));
  };

  const filterRecipes = (
    ing = selectedIngredients,
    ust = selectedUstensils,
    app = selectedAppareils
  ) => {
    const idsI = filterByIngredients(ing).map((r) => r.id);
    const idsU = filterByUstensils(ust).map((r) => r.id);
    const idsA = filterByAppareils(app).map((r) => r.id);

    const intersectionIds = idsI.filter((id) => idsU.includes(id) && idsA.includes(id));
    const nextAll = intersectionIds.map((id) => recipes.find((r) => r.id === id)).filter(Boolean);

    setAllRecipes(nextAll);
  };

  const onSelectIngredient = (value) => {
    if (selectedIngredients.includes(value)) return;
    const next = [...selectedIngredients, value];
    setSelectedIngredients(next);
    filterRecipes(next, selectedUstensils, selectedAppareils);
  };

  const onSelectAppareil = (value) => {
    if (selectedAppareils.includes(value)) return;
    const next = [...selectedAppareils, value];
    setSelectedAppareils(next);
    filterRecipes(selectedIngredients, selectedUstensils, next);
  };

  const onSelectUstensil = (value) => {
    if (selectedUstensils.includes(value)) return;
    const next = [...selectedUstensils, value];
    setSelectedUstensils(next);
    filterRecipes(selectedIngredients, next, selectedAppareils);
  };

  // Suppression via croix
  const removeIngredient = (label) => {
    const next = selectedIngredients.filter((x) => x !== label);
    setSelectedIngredients(next);
    filterRecipes(next, selectedUstensils, selectedAppareils);
  };

  const removeUstensil = (label) => {
    const next = selectedUstensils.filter((x) => x !== label);
    setSelectedUstensils(next);
    filterRecipes(selectedIngredients, next, selectedAppareils);
  };

  const removeAppareil = (label) => {
    const next = selectedAppareils.filter((x) => x !== label);
    setSelectedAppareils(next);
    filterRecipes(selectedIngredients, selectedUstensils, next);
  };

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
            <Select
              label="Ingrédients"
              options={ingredients}
              selected={selectedIngredients}
              onSelect={onSelectIngredient}
            />
            <Select
              label="Appareils"
              options={appareils}
              selected={selectedAppareils}
              onSelect={onSelectAppareil}
            />
            <Select
              label="Ustensiles"
              options={ustensils}
              selected={selectedUstensils}
              onSelect={onSelectUstensil}
            />
          </div>

          <div className="tags-bar">
            {selectedIngredients.map((i) => (
              <Tag key={`ing-${i}`} label={i} onRemove={removeIngredient} />
            ))}
            {selectedUstensils.map((i) => (
              <Tag key={`ust-${i}`} label={i} onRemove={removeUstensil} />
            ))}
            {selectedAppareils.map((i) => (
              <Tag key={`app-${i}`} label={i} onRemove={removeAppareil} />
            ))}
          </div>

          <div className="filters-bar__right">
            <span className="filters-bar__count">{allRecipes.length} recettes</span>
          </div>
        </section>

        <section className="recipes-grid">
          {allRecipes.map((recipe) => (
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