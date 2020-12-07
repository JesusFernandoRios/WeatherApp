
    let storedCity = [];

    localStorage.getItem('cities')

    let cityHistory = JSON.parse(localStorage.getItem('cities'))

    
        if(localStorage['cities']){
        $('#history1').text(cityHistory[0].name)
        $('#history2').text(cityHistory[1].name)
        $('#history3').text(cityHistory[2].name)
        $('#history4').text(cityHistory[3].name) 

        }else{
            console.log('nothing here')
        }
    
$(".btn").on("click", function(event) {

    event.preventDefault()

    let city = $("#searchCity").val()
    let apiKey = "c39ae89dcd41698e3a248031a2df1568"
    
    let queryURLSingle = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apiKey
    let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+ apiKey

        // Getting Data For Current Location

        $.ajax({
            url: queryURLSingle,
            method: "GET"

        }).then(function(response){
        
        console.log(queryURLSingle)

        console.log(response);


        let singleFav = 'http://openweathermap.org/img/wn/'


        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        let lat = response.coord.lat
        let lon = response.coord.lon

        
        $("#currentCity").html("" + response.name);
        $("#singleFav").attr('src', singleFav + response.weather[0].icon + '@2x.png')
        $("#windInput").text("" + response.wind.speed + "MPH");
        $("#humInput").text("" + response.main.humidity +"%");
        $("#tempInput").text("" + tempF.toFixed(1));
        getUvIndex(apiKey, lat, lon);
        })

    // UV Index Data
    // used function to call UVindex in weather ajax to use lat and lon variables 
    function getUvIndex(apiKey, lat, lon){

     
     let queryURLUv =`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: queryURLUv,
            method: "GET"
        }).then(function(responseUv){
            console.log(responseUv)
            console.log("this is UV")
            $('#uvInput').text(responseUv.value)
        })

    }

    // 5-Day Forecast Section
    
        $.ajax({
            url: queryURLForecast,
            method: "GET"

        }).then(function(responseforecast){
            console.log(queryURLForecast)
            console.log(responseforecast)
            console.log('this is the forecast one')

            let favicons = ' http://openweathermap.org/img/wn/'

            //Converting Temp to Fahrenheit
            let temp_1 = (responseforecast.list[0].main.temp - 273.15) * 1.80 + 32;
            let temp_2 = (responseforecast.list[8].main.temp - 273.15) * 1.80 + 32;
            let temp_3 = (responseforecast.list[2].main.temp - 273.15) * 1.80 + 32;
            let temp_4 = (responseforecast.list[3].main.temp - 273.15) * 1.80 + 32;
            let temp_5 = (responseforecast.list[4].main.temp - 273.15) * 1.80 + 32;

            // 5-Day Forecast Date
            $('.date1').text(responseforecast.list[0].dt_txt);
            $('.date2').text(responseforecast.list[8].dt_txt);
            $('.date3').text(responseforecast.list[16].dt_txt);
            $('.date4').text(responseforecast.list[24].dt_txt);
            $('.date5').text(responseforecast.list[32].dt_txt);

            // 5-Day Forecast Temperature
            $('#1-temp').text(temp_1.toFixed(1))
            $('#2-temp').text(temp_2.toFixed(1))
            $('#3-temp').text(temp_3.toFixed(1))
            $('#4-temp').text(temp_4.toFixed(1))
            $('#5-temp').text(temp_5.toFixed(1))

            // 5-Day Forecast Humidity
            $('#1-hum').text(responseforecast.list[0].main.humidity + "%")
            $('#2-hum').text(responseforecast.list[8].main.humidity + "%")
            $('#3-hum').text(responseforecast.list[16].main.humidity + "%")
            $('#4-hum').text(responseforecast.list[24].main.humidity + "%")
            $('#5-hum').text(responseforecast.list[32].main.humidity + "%")

            // 5-Day Forecast Favicons
            $("#fav1").attr('src', favicons + responseforecast.list[0].weather[0].icon + '@2x.png')
            $("#fav2").attr('src', favicons + responseforecast.list[8].weather[0].icon + '@2x.png')
            $("#fav3").attr('src', favicons + responseforecast.list[16].weather[0].icon + '@2x.png')
            $("#fav4").attr('src', favicons + responseforecast.list[24].weather[0].icon + '@2x.png')
            $("#fav5").attr('src', favicons + responseforecast.list[32].weather[0].icon + '@2x.png')

            
        })
    

    
        // local storage Section

        let cityObj = {
            name: city
        }
        storedCity.push(cityObj)

        document.querySelector("form").reset();

        console.log({storedCity})

        localStorage.setItem('cities',JSON.stringify(storedCity))

        let getCity = localStorage.getItem("cities")
        let parse = JSON.parse(getCity)

        $('#history1').text(parse[0].name)
        $('#history2').text(parse[1].name)
        $('#history3').text(parse[2].name)
        $('#history4').text(parse[3].name)
    

})

 
