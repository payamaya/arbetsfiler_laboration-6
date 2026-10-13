'use strict'
/*
 * Laboration 6 - Receptsökaren
 * Namn: Paul Yashouh
 */

// Hämta element från DOM
const form = document.querySelector('#searchform')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchbutton')

const errorMessage = document.querySelector('#error')
const apiMessage = document.querySelector('#message')
const recipeOutput = document.querySelector('#recipe')

// API endpoint för sökning efter recept
const API_URL = `https://dummyjson.com/recipes/search`

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
  // Om det finns fel, visa och avbryt
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
  //Förhindra sidan att laddas om
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
  const response = await fetch(`${API_URL}?q=${query}`)
  // Kontrollera om svaret är giltigt
  if (!response.ok) {
    throw new Error(`HTTP-fel status: ${response.status}`)
  }
  // Konvertera JSON-sträng till javascript objekt
  const data = await response.json()
  return data
}
// Ta emot sökordet och plocka rätt data från API-et
async function readData(query) {
  // Rensa tidigare receptinformation och gamla fel meddelande
  recipeOutput.innerHTML = ''
  apiMessage.textContent = ''

  try {
    // Försök hämta receptdata
    const data = await getData(query)
    // Om sökning lyckades men inga recept hittades
    if (!data.recipes || data.recipes.length === 0) {
      apiMessage.textContent = 'Inget recept hittades. prova en ny sökfras...'
      return
    }
    // Render första recept i DOM
    showRecipe(data.recipes[0])
    console.log('recipes :>> ', data.recipes[0])
  } catch (error) {
    console.error('Ett fel uppstod :>> ', error)
    // Fel meddelande visas på sidan
    apiMessage.textContent =
      'kunde inte hämta receptet. Kontrollera nätverk eller försök lite senare'
  }
}

function showRecipe(recipe) {
  let innerSection = ''
  // HTML strukturen som visas i DOM
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
                        ${getInstruction(recipe.instructions)}
                    </ol>
                </article>`
  recipeOutput.innerHTML = innerSection
}
// Ta emot array med ingrediens och omvandla den till HTML-sträng med <li> taggar
function getIngredients(ingredientsArray = []) {
  return ingredientsArray.map((ingredient) => `<li>${ingredient}</li>`).join('')
}
// Ta emot array med instruktion och omvandla den till HTML-sträng med <li> taggar
function getInstruction(instructionsArray = []) {
  return instructionsArray
    .map((instruction) => `<li>${instruction}</li>`)
    .join('')
}
