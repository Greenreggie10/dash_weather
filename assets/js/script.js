//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city


//dom element selectors variables
var searchBtn = document.getElementById("search");
var inputElement = document.getElementById("#city-search");
var resultsDiv = document.getElementById("results");
var cityName = document.querySelector("input");
var five_day_forcastEl = document.querySelector("#forecast-div");
var API = "286de79db450c76b40b056833d811f67";

searchBtn.addEventListener("click",function(event){
    event.preventDefault();
    var citySearch = document.getElementById("city-search").value; 
    console.log(citySearch);
    locationSearch(citySearch)
    
});    

function locationSearch (citySearch) {
    console.log(citySearch);
    var locationRequestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+citySearch+"&appid="+ API;
    console.log("citySearch clicked",citySearch);
    console.log(locationRequestUrl);
    
        // if the city name is an empty string then alert the user   
        fetch(locationRequestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon='+longitude+'&appid='+ API+"&units=imperial";
            fetch(requestUrl)
            .then(function(response) {
                return response.json();
            })

            
            .then(function(data) {
                console.log("citysearch",data);
                var storageFinder = JSON.parse(localStorage.getItem('weatherDashboard'))||[]
                if(storageFinder.indexOf(citySearch) === -1){
                    storageFinder.push(citySearch);
                    localStorage.setItem('weatherDashboard', JSON.stringify(storageFinder));
                    getLocalStorage()
                }
                dailySearch(data,citySearch);
            });
        });
    };        
    
    
    
    
    function dailySearch(data, citySearch) {
        var dailyResults = document.querySelector('.results');
        let color = ui => ui>5 ? 'green' : ui>8 ? 'yellow' : 'red';
        // console.log("dailySearch", dailyResults);
        var htmlText = `<h3>${citySearch} ${new Date(data.current.dt*1000).toLocaleDateString()}</h3>
        <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" />
        <h4> ${data.current.weather[0].description} </h4>
        <h4>Temperature: ${data.current.temp}</h4>
        <h4>Humidity: ${data.current.humidity}</h4>
        <h4>wind: ${data.current.wind_speed}</h4>
        <h4>UV index: <sapn class='${color(data.current.uvi)}'> ${data.current.uvi}</span></h4>`;
       
        dailyResults.innerHTML = htmlText;
        
        var forecastHTML = ""
        
        for (let i = 1; i <= 5; i++) {
            forecastHTML += `
            <div class="card">
                <h5> ${new Date(data.current.dt*1000).toLocaleDateString()}</h5>
                <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" />
                <span> ${data.daily[i].weather[0].description} </span>
                <h6>Temperature: ${data.daily[i].temp.day}</h6>
                <h6>Humidity: ${data.daily[i].humidity}</h6>
                <h6>wind: ${data.daily[i].wind_speed}</h6>
            </div>`
        }
        five_day_forcastEl.innerHTML = forecastHTML;              
        console.log(five_day_forcastEl)
};                 
                                                                  


function getLocalStorage() {
    var storageFinder = JSON.parse(localStorage.getItem('weatherDashboard'))||[]
    var storeageHtml = "";
    for (let i = 0; i < storageFinder.length; i++) {
        storeageHtml +=`<button data-city="${storageFinder[i]}" class="search-city-list btn btn-secondary"> ${storageFinder[i]}</button>`
        
    }
    document.querySelector('.search-list').innerHTML = storeageHtml;
    var list = document.querySelectorAll(".search-city-list")
    list.forEach(element => element.addEventListener("click", btnsearch))
};



getLocalStorage();

function btnsearch(event){
  locationSearch(event.target.dataset.city)
}





//remove clear searchhistory
$("#remove-tasks").on("click", function() {
    localStorage.removeItem('weatherDashboard');
   location.reload();

});


