document.getElementById("searchButton").addEventListener('click', searchRecipes);

function searchRecipes(){
    const searchTerm = document.getElementById('searchInput').value.trim();
    if(searchTerm !== ""){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        displayRecipes(data.meals)
    }).catch(error => console.error('error fetching data', error));
    }else{
        clearResult();
    }

    function displayRecipes(recipes){
        const resultsList = document.getElementById('results');
        resultsList.innerHTML = ''; //for every search before the item is displayed 
        //the previous item must be cleared otherwise both the items merges

        if(recipes){
            recipes.forEach(recipe => {
                const li = document.createElement('li');
                li.classList.add('recipe');


                const img = document.createElement('img');
                img.src = recipe.strMealThumb;
                img.alt = recipe.strMeal;

                const title = document.createElement('h3');
                title.textContent = recipe.strMeal;

                const ingredients = document.createElement('ul');
                ingredients.classList.add('ingredients');
                const subtitle = document.createElement('h4');
                subtitle.textContent = "Ingredients";
                
                var ingredientNo = "strIngredient";
                var MeasureNO = "strMeasure";
                let i = 1;
                while(true){
                    if(recipe[ingredientNo + i] != undefined && recipe[ingredientNo + i] !== ""){
                        const ingredientList = document.createElement('li');
                        const ingredient = document.createElement('p');
                        ingredient.textContent = recipe[ingredientNo+i]+'('+recipe[MeasureNO + i]+')';
                        ingredientList.appendChild(ingredient);
                        ingredients.appendChild(ingredientList);
                        i++;
                    }
                    else{
                        break;
                    }
                }

                const subtitle2 = document.createElement('h4');
                subtitle2.textContent = "RECIPE DETAILS";
                

                const recipeDetails = document.createElement('ul');
                recipeDetails.style.listStyle = 'none';
                const recipedetails = recipe.strInstructions.split('.');
                recipedetails.forEach((step) => {
                    let li = document.createElement('li');
                    let p = document.createElement('p');
                    p.textContent = step;
                    li.appendChild(p);
                    recipeDetails.appendChild(li);
                })
                li.appendChild(img);
                li.appendChild(title);
                li.appendChild(subtitle);
                li.appendChild(ingredients);
                li.appendChild(subtitle2);
                li.appendChild(recipeDetails);


                resultsList.appendChild(li);
            });
        }else{
            const li = document.createElement('li');
            li.textContent = "No Recipes Found";
            resultsList.appendChild(li);
        }
    }
}

function clearResult(){
    document.getElementById('result').innerHTML = '';
}