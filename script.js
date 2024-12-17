let url = "https://api.openbrewerydb.org/v1/breweries"; // Link for API

//Element created for default UI
let container = document.createElement("div");
container.className = "container";
let heading = document.createElement("h1");
heading.innerText = "Select the city to get Bewery details of particular city";
let dropdownDiv = document.createElement("div");
dropdownDiv.className = "dropdown"

//Div to display the details of selected city
let outputContainer = document.createElement("div");
outputContainer.className = "outputContainer";

container.appendChild(heading)
container.appendChild(dropdownDiv);
document.body.appendChild(container);
document.body.appendChild(outputContainer);


// Promise Instance created.
let p1 = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();

    req.onload = function() {
        if (req.status == 200) {
            let data = JSON.parse(req.response);
            resolve(data);
        } else {
            reject("Some error occurred while fetching the data");
        }
    }
});

// Function to display the Bewery details of selected city.
function displayDetails(city,name,type,website_url) {
  outputContainer.style.display = "block";
  const beweryDetailsHTML = `<div class="card text-center">
  <div class="card-header">
  ${city}
  </div>
  <div class="card-body">
    <p class="card-text"><span>Bewery Name:</span>  ${name}</p>
    <p class="card-text"><span>Bewery Type:</span> ${type}</p>
    <a href="${website_url}" class="btn btn-primary">Visit the website</a>
  </div>
</div>`
outputContainer.innerHTML = beweryDetailsHTML;
}



p1.then((data) => {
  //Dynamically made the list of cities from API
  dropdownDiv.innerHTML = `<div class="btn-group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Select City
        </button>
        <ul class="dropdown-menu" id="city-list">
         ${data.map((ele)=>
        `<li data-city="${ele.city}" data-name="${ele.name}" data-breweryType="${ele.brewery_type}" 
        data-link="${ele.website_url}">${ele.city}</li>`
      ).join('')}
        </ul>
    </div>`;

  let cityItems = document.querySelectorAll("#city-list li")
  // AddEventListener for each cities added.
  cityItems.forEach((item)=>{
  item.addEventListener("click",function(){
    let city = item.getAttribute("data-city");
    let name = item.getAttribute("data-name");
    let type = item.getAttribute("data-breweryType");
    let website_url= item.getAttribute("data-link")
    //Call the function to display output if action happen.
    displayDetails(city,name,type,website_url);
  })
})

}).catch((err) => console.log(err));



