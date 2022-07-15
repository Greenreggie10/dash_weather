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




var searchBtn = document.getElementById("search");

searchBtn.addEventListener("click",function(event){
    var API = "286de79db450c76b40b056833d811f67";
    var citySearch = document.getElementById("city-search").value; 
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+citySearch+"&appid="+ API;
    console.log("citySearch clicked",citySearch);
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon='+longitude+'&appid='+ API;
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
        })
    .then(function(data) {
        console.log("line35",data);
    });
    });
    


});    





























// remove all tasks
// $("#remove-tasks").on("click", function() {
//   for (var key in tasks) {
//     tasks[key].length = 0;
//     $("#list-" + key).empty();
//   }
//   saveTasks();
// });

// // load tasks for the first time
// loadTasks();