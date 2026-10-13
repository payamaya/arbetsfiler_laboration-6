'use strict'
/*
 * Laboration 6 - Receptsökaren
 * Namn: Paul Yashouh
 */

const form = document.querySelector('#searchform')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchbutton')

const errorMessage = document.querySelector('#error')
const apiMessage = document.querySelector('#message')
const recipeOutput = document.querySelector('#recipe')

const API_URL = `https://dummyjson.com/recipes`

/**
 * Validera formulärt inmatning
 * @return {Boolean}
 */

// Läs sökfras som användaren skriver i formuläret
function validateForm() {
  const search = searchInput.value.trim()
  let errors = []
  errorMessage.textContent = ''
  // Om sökfältet är tomt
  if (search === '') {
    console.log('enter :>> ', search)
    errors.push('Du måste fylla i sökfras')
  }
  if (errors.length > 0) {
    errorMessage.textContent = errors.join(', ')
    return false
  }
  console.log('search :>> ', search)
  // Retunera TRUE om sökfältet är fylld
  return true
}

// Validering av sökfältet
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const isValid = validateForm()
  // Validera om formuläret INTE är giltigt
  if (!isValid) {
    console.log('Is From valid :>> ', isValid)
    return
  }
  const searchQuery = searchInput.value.trim()
  readData(searchQuery)
})
// Hantera API-svaret
async function getData(query) {
  const response = await fetch(`${API_URL}/search?q=${query}`)
  // Konvertera json till javascript objekt
  const data = await response.json()
  return data
}
// Ta emot sökordet och plocka rätt data från API-et
async function readData(query) {
  // Rensa gamla sökreultat när ny sökningen sker
  recipeOutput.innerHTML = ''
  apiMessage.textContent = '' // Rensa gamla fel meddelande

  const data = await getData(query)

  if (!data.recipes || data.recipes.length === 0) {
    apiMessage.textContent = 'Inget recept hittades. prova en ny sökfras...'
    return
  }

  console.log('recipes :>> ', data.recipes[0])
  // Visa första Receptet som skapas och lägg till i DOM
  // showRecipe()
  showRecipe(data.recipes[0])
}

// caloriesPerServing  difficulty   instructions   ingredients   cookTimeMinutes  prepTimeMinutes    name

function showRecipe(recipe) {
  let innerSection = ''
  innerSection += `<article>
                    <h3>${recipe.name}</h3>

                    <img src="${recipe.image}" alt="${recipe.name}">

                    <div class="recipe-info">
                        <p><strong>Servings:</strong> ${recipe.servings}</p>
                        <p><strong>Prep time:</strong> ${recipe.prepTimeMinutes} minutes</p>
                        <p><strong>Cooking time:</strong> ${recipe.cookTimeMinutes} minutes</p>
                        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                    </div>

                    <h4>Ingredients</h4>
                    <ul>
                    ${getIngredients(recipe.ingredients)}
                    </ul>
                    <h4>Instructions</h4>
                    <ol>
                        ${getInstruction(recipe.instruction)}
                    </ol>
                </article>`
  recipeOutput.innerHTML = innerSection
}
// Ta emot array med ingrediens och omvandla den till HTML-sträng med <li> tag
function getIngredients(ingredientsArray = []) {
  return ingredientsArray.map((ingredient) => `<li>${ingredient}</li>`).join('')
}
// Ta emot array med instruktion och omvandla den till HTML-sträng med <li>tag
function getInstruction(instructionsArray = []) {
  return instructionsArray
    .map((instruction) => `<li>${instruction}</li>`)
    .join('')
}
