import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
const res=await fetch('http://15.207.168.169:8082/cities');
const cities=await res.json();
return cities;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divEle=document.createElement("div");
  divEle.className='col-6 col-lg-3 mb-3';
  let innerHTML=`<a id=${id} href="pages/adventures/?city=${id} "><img href="${image}" ><h5>${city}</h5><p>${description}</p></a>`;
  
  divEle.innerHTML=innerHTML;
  
  let contain=document.getElementById("data").append(divEle);
  return contain;

}

export { init, fetchCities, addCityToDOM };
