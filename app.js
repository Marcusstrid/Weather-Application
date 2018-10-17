

getData();
async function getData()
{
    
    let currentDay= await fetchData('http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&appid=62ebe99f35cb1477d0d30c7e84d5e6b9');
    let fiveDay = await fetchData('http://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&appid=62ebe99f35cb1477d0d30c7e84d5e6b9');
    

   
    console.log(fiveDay);
    
    var respons = JSON.stringify(currentDay);
  
    var city = currentDay.name;
    var currentDate = new Date();
    var datum = currentDate.toDateString();
    
    var iconCode = currentDay.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" +iconCode + ".png";
   
    
   var temp = JSON.stringify(currentDay.main.temp);
   $("#city").html(city);
   $("#temp").html(" "+ temp + "°");
   $("#date").html(datum);
   $(".icon").html("<img src='" + iconUrl  + "'>");

   let searchResultList = document.getElementById("searchResult");
   let foreCastIcon = "http://openweathermap.org/img/w/";

   for(let i = 7; i < fiveDay.list.length; i+=8) {
       let femDarDiv = document.createElement("div");
       femDarDiv.classList.add("weatherDiv");
       
       let city = document.createElement("p");
       let textCity = document.createTextNode(fiveDay.city.name);
       city.appendChild(textCity);
       femDarDiv.appendChild(city);

       let temp = document.createElement("p");
       let textTemp = document.createTextNode("Temperatur: " + fiveDay.list[i].main.temp + "°");
       temp.appendChild(textTemp);
       femDarDiv.appendChild(temp);

      
       let tempMin = document.createElement("p");
       let textTempMin = document.createTextNode("Min Temperatur: " + fiveDay.list[i].main.temp_min + "°");
       tempMin.appendChild(textTempMin);
       femDarDiv.appendChild(tempMin);

       let tempMax = document.createElement("p");
       let textTempMax = document.createTextNode("Max Temperatur: " + fiveDay.list[i].main.temp_max + "°");
       tempMax.appendChild(textTempMax);
       femDarDiv.appendChild(tempMax);
       
       
       let date = document.createElement("p");
       let textDate = document.createTextNode(new Date(fiveDay.list[i].dt_txt));
       date.appendChild(textDate);
       femDarDiv.appendChild(date);


       
       
       let icon = document.createElement("img");
       icon.setAttribute("src",foreCastIcon + fiveDay.list[i].weather[0].icon + ".png");
       femDarDiv.appendChild(icon);
      searchResultList.appendChild(femDarDiv);
    }


    }







async function fetchData(url)
{
    let promise = await fetch(url);
    let data = await promise.json();
    
    return data; 
}