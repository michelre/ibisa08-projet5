import recipes from "../../../recipes.json";
import { notFound } from "next/navigation";
import Link from "next/link";

function getRecipeImageSrc(recipe) {
  if (recipe?.image) return `/recipes/${recipe.image}`;
  return "/hero-bg.jpg";
}

function formatQty(it) {
  const qty = it?.quantity;
  const unit = it?.unit;
  if (qty == null || qty === "") return "";
  return `${qty}${unit ? ` ${unit}` : ""}`;
}

// (Optionnel mais utile si output export)
export function generateStaticParams() {
  return recipes
    .filter((r) => r?.id && r?.slug)
    .map((r) => ({ slug: `${r.id}-${r.slug}` }));
}

export default async function RecipePage({ params }) {
  // Next.js 15/16: `params` peut être une Promise selon la config
  const resolvedParams =
    params && typeof params.then === "function" ? await params : params;

  const raw = decodeURIComponent(String(resolvedParams?.slug || ""))
    .trim()
    .toLowerCase();

  // Attend "1-limonade-de-coco"
  const match = raw.match(/^(\d+)-(.+)$/);
  const idFromUrl = match ? Number(match[1]) : null;
  const slugFromUrl = (match ? match[2] : raw).trim().toLowerCase();

  const recipe =
    (idFromUrl != null ? recipes.find((r) => Number(r.id) === idFromUrl) : null) ||
    recipes.find((r) => String(r.slug).trim().toLowerCase() === slugFromUrl);

  if (!recipe) return notFound();

  return (
    <>
      <header className="hero hero--compact">
        <div className="hero__overlay">
          <div className="hero__topbar">
            <div className="hero__logo">
              <img src="/logo-les-petits-plats.svg" alt="Les Petits Plats" />
            </div>
          </div>
        </div>
      </header>

      <main className="page">
        <Link href="/" style={{ display: "inline-block", marginBottom: 16 }}>
          ← Retour
        </Link>

        <h1 style={{ marginBottom: 16 }}>{recipe.name}</h1>

        <img
          src={getRecipeImageSrc(recipe)}
          alt={recipe.name}
          style={{
            width: "420px",
            maxWidth: "100%",
            borderRadius: "16px",
            display: "block",
            marginBottom: "24px",
          }}
        />

        <p style={{ marginBottom: 16 }}>
          <strong>Temps :</strong> {recipe.time} min
        </p>

        <h2>Ingrédients</h2>
        <ul>
          {(recipe.ingredients || []).map((it, idx) => (
            <li key={idx}>
              {it.ingredient}
              {formatQty(it) ? ` — ${formatQty(it)}` : ""}
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: 24 }}>Ustensiles</h2>
        <ul>
          {(recipe.ustensils || []).map((u, idx) => (
            <li key={idx}>{u}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 24 }}>Appareil</h2>
        <p>{recipe.appliance || "-"}</p>

        <h2 style={{ marginTop: 24 }}>Recette</h2>
        <p>{recipe.description}</p>
      </main>

      <footer className="site-footer">
        <p>Copyright © 2025 - Les Petits Plats</p>
      </footer>
    </>
  );
}