function getRecipeHref(recipe) {
  const id = recipe?.id;
  const slug = recipe?.slug;

  // URL attendue: /recette/1-limonade-de-coco
  if (id != null && slug) return `/recette/${id}-${slug}`;

  // Fallbacks de secours
  if (slug) return `/recette/${slug}`;
  if (id != null) return `/recette/${id}`;
  return "/";
}

function getRecipeImageSrc(recipe) {
  if (recipe?.image) return `/recipes/${recipe.image}`;
  return "/hero-bg.jpg";
}

function formatIngredientQty(it) {
  const qty = it?.quantity;
  const unit = it?.unit || it?.unite || "";

  if (qty == null || qty === "") return "";
  return `${qty}${unit ? ` ${unit}` : ""}`;
}

function formatTimeBadge(time) {
  if (time == null || time === "") return "—";
  return `${time}min`;
}

export default function RecipeCard({ recipe }) {
  const name = recipe?.name ?? "";
  const href = getRecipeHref(recipe);
  const imgSrc = getRecipeImageSrc(recipe);

  return (
    <a
      href={href}
      className="recipe-card-link"
      aria-label={`Voir la recette : ${name}`}
    >
      <article className="recipe-card">
        <div className="recipe-card__image-wrapper">
          <img className="recipe-card__image" src={imgSrc} alt={name} />
          <span className="recipe-card__badge">
            {formatTimeBadge(recipe?.time)}
          </span>
        </div>

        <div className="recipe-card__body">
          <h2 className="recipe-card__title">{name}</h2>

          <div className="recipe-card__content">
            <div className="recipe-card__col">
              <div className="recipe-card__section-title">RECETTE</div>
              <p className="recipe-card__description">{recipe?.description ?? ""}</p>
            </div>

            <div className="recipe-card__col">
              <div className="recipe-card__section-title">INGRÉDIENTS</div>
              <ul className="recipe-card__ingredients">
                {(recipe?.ingredients ?? []).map((it, idx) => (
                  <li key={idx}>
                    <span className="recipe-card__ingredient-name">
                      {it?.ingredient ?? ""}
                    </span>
                    <span className="recipe-card__ingredient-qty">
                      {formatIngredientQty(it)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}