// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ad540a33f1fbff0e82a5a2367d10894a&units=metric';

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener for the element with the id: generate, with a callback function to execute when it is clicked
document.getElementById('generate').addEventListener('click', (event)=> 
{
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
    .then(function(data){
        console.log(data);
        postData('/add', { date: d, temp: data.main.temp, content: feelings});
        retrieveData();
    })
});

//function to get web API data
const getWeather = async(baseURL, zip, key)=>
{
    const response = await fetch(baseURL+zip+key);
    try{
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("Error", error);
    }
}

//function to post data
const postData = async (url = '', data = {})=>
{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error)
    {
        console.log("Error", error);
    }
}

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData[0].temp)+ " degrees";
    document.getElementById('content').innerHTML = allData[0].feel;
    document.getElementById('date').innerHTML = allData[0].date;
    }
    catch(error) {
      console.log("Error", error);
      // appropriately handle the error
    }
   }