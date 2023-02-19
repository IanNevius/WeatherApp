

var temp = 100;

var weatherBox = document.getElementById("weatherDisplay");
var inputBox = document.getElementById("zip");

function changeColor(temp, element) {
    if(temp <= 22){
        document.getElementById(element).style.backgroundColor = "rgba(103,70,105,.5)";
    }
    else if(temp <= 32 && temp > 22){
        document.getElementById(element).style.backgroundColor = "rgba(201,224,221,.5)";
    }
    else if(temp <= 43 && temp > 32){
        document.getElementById(element).style.backgroundColor = "rgba(103,70,105,.5)";
    }
    else if(temp <= 53 && temp > 43){
        document.getElementById(element).style.backgroundColor = "rgba(30,152,174,.5)";
    }
    else if(temp <= 66 && temp > 53){
        document.getElementById(element).style.backgroundColor = "rgba(202,211,104,.5)";
    }
    else if(temp <= 77 && temp > 66){
        document.getElementById(element).style.backgroundColor = "rgba(149,179,136,.5)";
    }
    else if(temp <= 88 && temp > 77){
        document.getElementById(element).style.backgroundColor = "rgba(217,181,84,.5)";
    }
    else if(temp >= 89){
        document.getElementById(element).style.backgroundColor = "rgba(161,56,83,.5)";
    }
}

function closeModal() {
    document.getElementById("overlay").style.display = "none";
}

function submit() {

    var zip = inputBox.value;

    if(zip.length != 5 || (/^\d+$/.test(zip)) == false) {
        document.getElementById("overlay").style.display = "inline-block";
        document.getElementById("errorMessage").innerText = `${zip} is not a valid zip code`;
    } else {

    let request = new XMLHttpRequest();
    //const url = `http://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=[YOUR-API-KEY-HERE]`;
    const cururl = `http://api.weatherapi.com/v1/forecast.json?key=62433828d6e84f108e1185936232201&q=${zip}&days=3&aqi=no&alerts=no`;
    //const foreurl = `http://api.weatherapi.com/v1/forecast.json?key=&q=${zip}&days=3&aqi=no&alerts=no`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        const foreresponse = JSON.parse(this.responseText);
        getElements(response);
        //getForeElements(foreresponse);
      }
    };


    function getElements(response) {
        //document.getElementById("temp").innerHTML = (`The humidity in ${zip} is ${response.current.temp_f}`);
        temp = response.current.temp_f;
        weatherBox.style.visibility = "visible";
  
        changeColor(temp, "weatherDisplay");
        document.getElementById("location").innerText = `${response.location.name}`;
        document.getElementById("temp").innerText = "Temp: " + temp + "°"
        document.getElementById("condition").innerText = "Condition: " + response.current.condition.text;



        document.getElementById("fDayTemp").innerText = "Temp: " + response.forecast.forecastday[0].day.maxtemp_f;
        document.getElementById("fDayCond").innerText = "Condition: " + response.forecast.forecastday[0].day.condition.text;
        document.getElementById("fDayIco").src = response.forecast.forecastday[0].day.condition.icon;
        changeColor((response.forecast.forecastday[0].day.maxtemp_f), "fDay");
        document.getElementById("sDayTemp").innerText = "Temp: " + response.forecast.forecastday[1].day.maxtemp_f;
        document.getElementById("sDayCond").innerText = "Condition: " + response.forecast.forecastday[1].day.condition.text;
        document.getElementById("sDayIco").src = response.forecast.forecastday[1].day.condition.icon;
        changeColor((response.forecast.forecastday[1].day.maxtemp_f), "sDay");
        document.getElementById("thrDayTemp").innerText = "Temp: " + response.forecast.forecastday[2].day.maxtemp_f;
        document.getElementById("thrDayCond").innerText = "Condition: " + response.forecast.forecastday[2].day.condition.text;
        document.getElementById("thrDayIco").src = response.forecast.forecastday[2].day.condition.icon;
        changeColor((response.forecast.forecastday[2].day.maxtemp_f), "thrDay");
      }


    request.open("GET", cururl, true);
    request.send();
    //request.open("GET", foreurl, true);
    //request.send();


}
}