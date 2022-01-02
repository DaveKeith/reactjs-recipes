import React, { useState, useEffect } from "react";

const Recipe = props => {
    const [specials, setSpecials] = useState([]);
    const rec = props.recipes.filter(item => { return item.uuid === props.recipeId})[0];

    useEffect(() => {
        fetch("http://localhost:3001/specials", 
            {
                method: "get",
                mode: "cors" 
            }
        )
        .then(res => res.json())
        .then(res => setSpecials(res))
        .catch(err => console.log(err));
    }, []);
    
    const findSpecial = ingredient => {
        let mySpecials = specials.filter(item => { 
            return item.ingredientId === ingredient.uuid;
        });

        if(mySpecials.length === 0){
            return null;
        }else{
            let special = mySpecials[0]; 
            return (
                <div className="special">
                    <div>{special.title}</div>
                    <div>{special.type}</div>
                    <div>{special.text}</div>
                </div>
            );
        }
    }

    return ( 
        <div>
            <h1>{rec.title}</h1>
            <h4>{rec.description}</h4>
            <img src={`http://localhost:3001/${rec.images.medium}`} alt="error loading image"/>
            <div>Makes {rec.servings} servings</div>
            <div>Prep time is {rec.prepTime} minutes</div>
            <div>Cook time is {rec.cookTime} minutes</div>
            <h4>Ingredients:</h4>
            <section className="ingredients">
                <ul>
                    {rec.ingredients.map(item => {
                        return (
                            <li>
                                <div>{item.name}</div>
                                {findSpecial(item)}
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div> 
    );
}

export default Recipe;