

const geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?limit=1&q=" ;
const apiKey = "05c92a8c6ba8d86c08c89e9483d44103";

async function getinfo(city){

    const response = await fetch(geoApiUrl + city +`&appid=${apiKey}`);
    let data = await response.json() ;
    document.querySelector(".weather").style.display = "block";
    console.log(data);
    if(data.length === 0){
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none";
    }
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

    async function getweatherinfo(){
        const responseW = await fetch(weatherApiUrl + `&lat=${latitude}&lon=${longitude}` +`&appid=${apiKey}`);
        let dataW = await responseW.json() ; 
        console.log(dataW);
        document.querySelector(".city").innerHTML = data[0].name;
        document.querySelector(".temp").innerHTML = `${Math.round(dataW.main.temp)}°c`;
        document.querySelector(".humidity").innerHTML = `${dataW.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${dataW.wind.speed}mph`;
        document.querySelector(".weather img").src=`images/${(dataW.weather[0].main).toLowerCase()}.png`

        
        
    }

    getweatherinfo();

}
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", ()=>{
    getinfo(searchBox.value);
});

