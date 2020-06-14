/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    image: "https://robohash.org/" + form.name.value + "?set=set4",
    name: form.name.value,
    mood: "Tolerant",
    affection: 5
  };

  
  kittens.push(kitten)
  saveKittens()
  form.reset()
  drawKittens()
  console.log(kittens)
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  
  let kittenData= JSON.parse(window.localStorage.getItem("kittens"))
  if(!kittenData){
    kittens = kittenData
  }
  kittens = kittenData
drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  
  let kittenCard = ""
  kittens.forEach(kitten => {
    kittenCard += `
  <div class="card text-center">
    <div class = "kitten ${kitten.mood}"><img  src="${kitten.image}"></div>
    <div> Name: ${kitten.name}</div>
    <div>Mood: ${kitten.mood}</div>
    <div>Affection: ${kitten.affection}</div>
    <button onclick="pet('${kitten.id}')">Pet</button>
    <button onclick="catnip('${kitten.id}')">Catnip</button>
    <button onclick="deleteKitten('${kitten.id}')">Delete Kitten</button>
  
  </div>
    `
  }

  )
document.getElementById("kittenContainer").innerHTML=kittenCard
}




/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitty = findKittenById(id)
  let ranNum = Math.random()
    if(ranNum > .7){
      kitty.affection++
  }
  else if(kitty.affection < 0){
    kitty.affection = 0
  }
  else(kitty.affection--)

  kitty.mood = setKittenMood(kitty)

saveKittens()
drawKittens()

}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitty = findKittenById(id)
  kitty.affection = 5
  kitty.mood = setKittenMood(kitty)

  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 */
function setKittenMood(kitty) {
  if(kitty.affection >= 6){
    kitty.mood = "happy"
  }
  else if(kitty.affection <= 5 && kitty.affection > 3){
    kitty.mood ="tolerant"
  }
  else if(kitty.affection <= 3 && kitty.affection >0){
    kitty.mood ="angry"
  }
  else{
    kitty.mood = "gone"
  }
  return kitty.mood
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();

}

function deleteKitten(id) {
  let kitty = findKittenById(id)
  kittens != kittens.splice(kittens.indexOf(kitty), 1)
  saveKittens()
  drawKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
drawKittens()
loadKittens()