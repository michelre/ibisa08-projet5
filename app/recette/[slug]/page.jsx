import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./RecipeDetail.module.css";

import recipesData from "../../../recipes.json";

// Selon la config/build, l'import JSON peut être wrap dans `default`
const RECIPES_SOURCE = recipesData?.default ?? recipesData;

const RECIPES = Array.isArray(RECIPES_SOURCE)
  ? RECIPES_SOURCE
  : Array.isArray(RECIPES_SOURCE?.recipes)
    ? RECIPES_SOURCE.recipes
    : [];

function formatTime(minutes) {
  if (!minutes || minutes <= 0) return "—";
  return `${minutes}min`;
}

function formatQty(q) {
  if (q === undefined || q === null || q === "") return "";
  return String(q);
}

function getUnit(ing) {
  return ing?.unit || ing?.unite || "";
}

function slugify(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getRecipeId(r) {
  return r?.id ?? r?.ID ?? r?.recipeId ?? r?.idRecipe;
}

function getRecipeName(r) {
  return r?.name ?? r?.title ?? r?.nom;
}

export default async function RecipeDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? "";
  const slugStr = Array.isArray(slug) ? slug.join("/") : String(slug);

  // 1) Match direct sur le champ `slug`
  let recipe = RECIPES.find((r) => r?.slug === slugStr);

  // 2) Match par id si l'URL commence par un nombre (ex: "2-poisson-cru-a-la-tahitienne")
  if (!recipe) {
    const id = parseInt(slugStr, 10);
    if (!Number.isNaN(id)) {
      recipe = RECIPES.find((r) => Number(getRecipeId(r)) === id);
    }
  }

  // 3) Fallback : slugify(name)
  if (!recipe) {
    const slugNoId = slugStr.replace(/^\d+-/, "");
    recipe = RECIPES.find((r) => {
      const n = getRecipeName(r);
      if (!n) return false;
      const s = slugify(n);
      return s === slugStr || s === slugNoId;
    });
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/" aria-label="Retour à l'accueil" className={styles.brand}>
            <Image
              src="/logo-les-petits-plats.svg"
              alt="Les Petits Plats"
              width={190}
              height={26}
              className={styles.brandLogo}
              priority
            />
          </Link>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.card}>
          <div className={styles.left}>
            <div className={styles.imageFrame}>
              <Image
                src={`/recipes/${recipe.image}`}
                alt={recipe.name}
                width={520}
                height={520}
                className={styles.recipeImage}
                priority
              />
            </div>
          </div>

          <div className={styles.right}>
            <h1 className={styles.title}>{recipe.name}</h1>

            <div className={styles.metaBlock}>
              <div className={styles.metaLabel}>TEMPS DE PRÉPARATION</div>
              <div className={styles.timePill}>{formatTime(recipe.time)}</div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>INGRÉDIENTS</div>
              <div className={styles.ingredientsGrid}>
                {recipe.ingredients.map((ing, idx) => (
                  <div key={idx} className={styles.ingredientRow}>
                    <div className={styles.ingredientName}>{ing.ingredient}</div>
                    {(ing.quantity || ing.quantity === 0 || getUnit(ing)) && (
                      <div className={styles.ingredientQty}>
                        {formatQty(ing.quantity)} {getUnit(ing)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>USTENSILES NÉCESSAIRES</div>
              <div className={styles.simpleList}>
                {recipe.ustensils?.length ? recipe.ustensils.join(", ") : "—"}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>APPAREILS NÉCESSAIRES</div>
              <div className={styles.simpleList}>{recipe.appliance || "—"}</div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionLabel}>RECETTE</div>
              <ol className={styles.steps}>
                {recipe.description
                  .split(".")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((step, i) => (
                    <li key={i}>{step}.</li>
                  ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>Copyright © 2025 - Les Petits Plats</footer>
    </div>
  );
}