
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params= new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{  
    const res=await fetch(config.backendEndpoint+`/adventures?city=${city}`)
    const result=await res.json();
    return result;
  }catch(err){
    return null; 
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let dataElem=document.getElementById("data");
  adventures.forEach(function(card){
  const divElem=document.createElement("div");
  divElem.classList.add("col-12","col-sm-6","col-lg-3","mb-3");
  divElem.innerHTML=`
  
  <a href="detail/?adventure=${card.id}" id="${card.id}">
  <div class="card activity-card">
  <img src="${card.image}" >
  <div class="category-banner">${card.category}</div>
  <div class="card-body col-md-12 mt-2">
  <div class="d-md-flex justify-content-between">
  <h5>${card.name}</h5>
  <p>${card.costPerHead} </p>
  </div>
  <div class="d-flex justify-content-between">
  <p>Duration</p>
  <p>${card.duration}</p>
  </div> 
  </div>
  </div>
  </a>
 
  `

dataElem.appendChild(divElem);})

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList=list.filter(
    (key)=>key.duration>low&&key.duration<=high
  );
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList=[];
  categoryList.forEach((category)=>{
    list.forEach((key)=>{
      if(key.category===category){
        filteredList.push(key);
      }
    });
  });
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=[];
  if(filters["duration"].length>0 && filters["category"].length>0)
  {
    let choice = filters["duration"].split("-");
    filteredList=filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList=filterByCategory(filteredList,filters["category"]);
  }else if(filters["duration"].length>0){
    let choice = filters["duration"].split("-");
    filteredList=filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    )
  }else if(filters["category"].length>0){
    filteredList=filterByCategory(list,filters["category"]);
  }else{
    filteredList=list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredList;

  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters.duration;
  filters["category"].forEach((key) => {
    let ele=document.createElement("div");
    ele.className="category-filter";
    ele.innerHTML=`
    <div>${key}</div>`;
    document.getElementById("category-list").appendChild(ele);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
