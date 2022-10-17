const CLEFAPI = '74c7ba1017422f451cce0f825af9b629';

let resultatsAPI;

const input = document.querySelector('.input_text');
const button = document.querySelector('.submit');
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.ville');
const vitesseVent = document.querySelector('.vitesse-vent-detail');
const humidity = document.querySelector('.humidite-pourcentage-detail');
const heure = document.querySelector('.heure');
const afficheDate = document.querySelector('.date');
const imgIcone = document.querySelector('.weatherIcon');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`)
    })
}

function AppelAPI(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then((reponse) => {return reponse.json();
        })
        .then((data) => {
            console.log(data);
            resultatsAPI = data;
            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}`;
            ville.innerText = resultatsAPI.timezone;
            vitesseVent.innerText = `${Math.trunc(resultatsAPI.current.wind_speed)}`;
            humidity.innerText = `${Math.trunc(resultatsAPI.current.humidity)}`;
            imgIcone.src = `../img/${resultatsAPI.current.weather[0].icon}.svg`;

            
        })
}



button.addEventListener('click', function (name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&units=metric&lang=fr&appid=74c7ba1017422f451cce0f825af9b629')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            resultatsAPI = data;
            temps.innerText = resultatsAPI.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.main.temp)}`;
            ville.innerText = resultatsAPI.name;
            vitesseVent.innerText = `${Math.trunc(resultatsAPI.wind.speed)}`;
            humidity.innerText = `${Math.trunc(resultatsAPI.main.humidity)}`;
            input.value = "";
            imgIcone.src = `./img/${resultatsAPI.weather[0].icon}.svg`;

        })

        .catch(err => alert("Wrong city name!"));
})



const inputEnter = document.querySelector(".input_text");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".submit").click();
    }
});

function date() {
    let dateDuJour = new Date();
    let options = { weekday: "long", day: "2-digit", month: "long", year: "numeric"  };
    /* console.log(dateDuJour.toLocaleDateString("fr-FR", options)); */
    afficheDate.innerText = dateDuJour.toLocaleDateString("fr-FR", options);
}

function horloge() {
    let today = new Date();
    let hours = today.getHours() + ":" + today.getMinutes();
    heure.innerText = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
}
setInterval("horloge()", 100);
setInterval("date()", 100);



