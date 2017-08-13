// Javascript -TODO
// External API is used effectively to achieve the content of the mockups. - Done
// Query is captured from the search field for use in the XHR (AJAX call). - TODO
// Gulp is used to handle common development tasks (such as compiling scss to css). - TODO
// Data is written to the DOM from the API. - TODO
// Application javascript uses ES6(ES2015) for any applicable uses. -TODO


// Fetch method

const input = document.querySelector('input')
const form = document.querySelector('form')
const headerContainer = document.querySelector('#resultsContainer')
const resultsContainer = document.querySelector('.results')
const buttonContainer = document.querySelector('.more')
const base = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&titleStartsWith=`
const key = "ece84784d501b9d36801c24c742ac9b4"
const params = "&apikey="
let data = []

const myImage = document.querySelector('img')

// https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&title=spider&apikey=ece84784d501b9d36801c24c742ac9b4

const options = {
  method:"GET"
}

// When button is pressed
form.addEventListener("submit", (e)=> {
  e.preventDefault()

  let comic = encodeURI(input.value)
  let url = `${base}${comic}${params}${key}`
  console.log(url)

  fetch(url, options)
  .then(response => response.json())
  .then(responseAsJson => {
    data = responseAsJson.data.results
    console.log(data);
    comicName(data)
  })

  .catch(error => {
    console.log("An Error Occurred", error);
  })
})

function comicName (data) {
  let output = "<div class=results>"
  data.forEach((data, index) => {
    if (data.title) {
      output+= "<article>"
      output+= "<img src=" + data.thumbnail.path + "." +  data.thumbnail.extension + ">"
      output+= "<p>" + data.title + "</p>"
      output+= "</article>"
    }
  })
    output+= "</div>"
  let button = "<a href=" + "https://marvel.com/search?q=" + input.value + ">View more on Marvel</a>"
  let header = "<h1>Results for " + input.value + "</h1>" + output

  headerContainer.innerHTML = header
  resultsContainer.innerHTML = output
  buttonContainer.innerHTML = button
}
