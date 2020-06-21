
$(".btn").on("click", function(event) {

    event.preventDefault();

    console.log("testing")

    let city = $("#searchCity").val()

    let apiKey = "c39ae89dcd41698e3a248031a2df1568"
    let lat = Response.coord.lat
    let lon = response.coord.lon
    console.log(lat)
   
    let queryURLUv = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid="+ apiKey + "&lat={lat}&lon={lon}&cnt={cnt}"
    let queryURLSingle = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apiKey
    let queryURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ apiKey
    
    $.ajax({
        url: queryURLSingle,
        method: "GET"

    }).then(function(response){
     
     console.log(queryURLSingle)

     console.log(response);

     var tempF = (response.main.temp - 273.15) * 1.80 + 32;

     
     $("#currentCity").html("" + response.name + " weather details");
     $("#windInput").text("" + response.wind.speed + "MPH");
     $("#humInput").text("" + response.main.humidity +"%");
     $("#tempInput").text("" + tempF);
    
    })

    $.ajax({
        url: queryURLForecast,
        method: "GET"

    }).then(function(response){
        console.log(queryURLForecast)
        console.log(response)
    })
    
})
