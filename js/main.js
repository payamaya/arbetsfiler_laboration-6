'use strict'
/*
 * Laboration 6 - Receptsökaren
 * Namn: Paul Yashouh
 */

const form = document.querySelector('#searchform')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchbutton')

const errorMessage = document.querySelector('#error')

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
})
