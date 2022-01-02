import { Link } from "react-router-dom";

const RecipeList = props => {

    return (
        <div>
            <h1>Recipes</h1>
            <section>
                {props.recipes.map((recipe, index) => {
                    return (
                        <div className="recipe" key={index + 1}>
                            <Link to={`/ingredients/${recipe.uuid}`}>
                                <div className="recipe-details">
                                    <h3>{recipe.title}</h3>
                                    <div>{recipe.description}</div>
                                </div>
                                <img src={`http://localhost:3001/${recipe.images.small}`} alt="error loading" />
                            </Link>
                        </div>
                    );
                })}
            </section>
        </div>
    )
}

export default RecipeList;