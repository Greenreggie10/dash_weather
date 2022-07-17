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

var API = "286de79db450c76b40b056833d811f67";
searchBtn.addEventListener("click",function(event){
    var citySearch = document.getElementById("city-search").value; 
    locationSearch(citySearch)
    
});    

function locationSearch (citySearch) {
    var locationRequestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+citySearch+"&appid="+ API;
    console.log("citySearch clicked",citySearch);
    
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
                dailySearch(data,citySearch);
            });
        });
        

}
     
function dailySearch(data,citySearch) {
    var daiyResults = document.querySelector('.results');
    console.log("dailySearch",daiyResults);
    var htmlTEXT = `<h3>${citySearch}</h3>
    <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" /><span> ${data.current.weather[0].description} </span><p>Temperature: ${data.current.temp}</p><a>Humidity: ${data.current.humidity}</a><h4>wind: ${data.current.wind_speed}</h4><h6>UV index ${data.current.uvi}</h6>`
    daiyResults.innerHTML = htmlTEXT

    var forecastHTML = ""

    for(let i=1;i<=5;i++){
        forecastHTML += `
        <h3>${citySearch}</h3>
    <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" /><span> ${data.daily[i].weather[0].description} </span><p>Temperature: ${data.daily[i].temp.day}</p><a>Humidity: ${data.daily[i].humidity}</a><h4>wind: ${data.daily[i].wind_speed}</h4><h6>UV index ${data.daily[i].uvi}</h6>`
    }
document.querySelector('.five-day-forecast').innerHTML = forecastHTML
};





























// //remove all tasks
// $("#remove-tasks").on("click", function() {
//   for (var key in tasks) {
//     tasks[key].length = 0;
//     $("#list-" + key).empty();
//   }
//   saveTasks();
// });

// // load tasks for the first time
