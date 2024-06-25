let openWeatherAppAPIKey = "05eb9f4cdcc2cd8c41198a5d8c0d306e";

const container = document.createElement("div");
container.classList.add("container");
const h1 = document.createElement("h1");
h1.setAttribute("id","title");
h1.className="text-center";
h1.textContent="Rest Countries using Fetch API";
container.appendChild(h1);
const row = document.createElement("div");
row.classList.add("row");

const foo = async () => {
    try {
    let res = await fetch("https://restcountries.com/v3.1/all");
    let data = await res.json();
  for (var i = 0; i < data.length; i++) {
    const col = document.createElement("div");
    col.classList.add("col-lg-4", "col-sm-12");
    col.innerHTML = `<div class="card border-secondary mb-3 bg-warning text-light" style="max-width: 18rem;">
  <div class="card-header text-center"><h4>${data[i].name.common}</h4></div>
  <img style="height:180px;" src="${data[i].flags.png}" class="card-img-top p-4" alt="${data[i].name.common}">
  <div class="card-body text-light text-center">
    <p class="card-text">Capital: ${data[i].capital}</p>
    <p class="card-text">Region: ${data[i].region}</p>
    <p class="card-text">Country Code: ${data[i].cca3}</p>
    <p class="card-text" id='${data[i].name.common}'></p>
    <button onclick="open_weather(${data[i].latlng[0]},${data[i].latlng[1]},'${data[i].name.common}')" class="btn btn-secondary">Click For Weather</button>
  </div>
  </div>`;            
    row.append(col);
    container.append(row);
    document.body.appendChild(container);
}
}catch(error) {
    console.log(error);
}
};

let open_weather = async (lat, lon, name)=> {
try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherAppAPIKey}`);
    let data = await res.json();
    console.log(data)
    let temp = document.getElementById(name);
    let re = Math.round(data.main.temp-273.15).toFixed(1);
    temp.innerHTML = `Temperature: ${re} °C`;
    setTimeout(()=>{temp.innerHTML =""},5000 );
}catch(error) {
    console.log(error);
}
}

foo();