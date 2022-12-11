/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=ddda12463623567598474932a9429dca";
const units = "&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Adding an event listener on the generate button to call the function onAction
document.getElementById("generate").addEventListener("click", onAction);

/* function to get the weather data from the API, post the data to the server and update the UI.
first we get the zip code and the user's feelings from the DOM, then we call the getWeather function to get the weather data from the API.
then we call the postData function to post the data to the server.
*/
function onAction(e) {
  const zipCode = document.getElementById("zip").value;
  //checking if the zip code is valid
  if (zipCode.length != 5) {
    alert("Please enter a valid zip code");
    return;
  }
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, zipCode, apiKey, units)
    .then(function (data) {
      // checking if there is a city with this zip code
      if (data.cod == "404") {
        alert("Can't find a city with this zip code");
        return;
      }
      console.log(data);
      postData("/add", {
        temperature: data.main.temp,
        date: newDate,
        userResponse: feelings,
      });
    })
    .then(function () {
      updateUI();
    });
}

// async function to get the weather data from the API by using the fetch API and the async/await syntax
const getWeather = async (baseURL, zipCode, apiKey, units) => {
  const res = await fetch(baseURL + zipCode + apiKey + units);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// async function to post the data to the server by using the fetch API and the async/await syntax
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// async function to update the UI by using the fetch API and the async/await syntax and then writing the data to the DOM elements using the innerHTML property
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      "Temperature: " + Math.round(allData.temperature) + " Degrees Celsius";
    document.getElementById("content").innerHTML =
      "Your Feeling: " + allData.userResponse;
    document.getElementById("date").innerHTML = "Date: " + allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
