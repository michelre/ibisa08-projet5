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

export default function RecipeCard({ recipe }) {
  const name = recipe?.name ?? "";
  const id = recipe?.id;
  const slug = recipe?.slug; // présent dans ton JSON

  const href =
    id != null && slug ? `/recette/${id}-${slug}` : `/recette/${slug || ""}`;

  const imgSrc = getRecipeImageSrc(recipe);

  return (
    <Link href={href} className="recipe-card recipe-card--clickable">
      <div className="recipe-card__image-wrapper">
        <img className="recipe-card__image" src={imgSrc} alt={name} />
        <span className="recipe-card__badge">{recipe.time}min</span>
      </div>

      <div className="recipe-card__body">
        <h2 className="recipe-card__title">{name}</h2>

        <div className="recipe-card__content">
          <div className="recipe-card__col">
            <div className="recipe-card__section-title">RECETTE</div>
            <p className="recipe-card__description">{recipe.description}</p>
          </div>

          <div className="recipe-card__col">
            <div className="recipe-card__section-title">INGRÉDIENTS</div>
            <ul className="recipe-card__ingredients">
              {(recipe.ingredients || []).map((it, idx) => (
                <li key={idx}>
                  <span className="recipe-card__ingredient-name">{it.ingredient}</span>
                  <span className="recipe-card__ingredient-qty">{formatQty(it)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}