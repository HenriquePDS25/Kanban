//previsão do tempo
const input = document.querySelector("input");
const button = document.querySelector("button");
const img = document.querySelector("img");

const city = document.querySelector("#city");
const degree = document.querySelector("#degree");

const content = document.querySelector(".content");

button.addEventListener("click", () => {
  if (!input.value) return;
  getWeatherData();
});

async function getWeatherData() {
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
  )}&units=metric&appid=97c8005bb249b5ce1548932ca66c2122`;

  try {
    await fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Cidade não encontrada");
        }
        loadWeatherInfo(data);
      });
  } catch (error) {
    alert(error);
  }
}

function loadWeatherInfo(data) {
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  degree.innerHTML = `Temperatura: ${Math.floor(data.main.temp)} ºC`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  content.style.display = "flex";
}

// Kanban

let columns = document.querySelectorAll(".column");

/* Criei dois eventos ouvintes: dragstart e dragend. O primeiro observa
se algum item foi arrastado e adiciona a classe “dragging”.
O segundo verifica se o item foi solto e remove a classe “dragging”.
*/

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    let dragging = document.querySelector(".dragging");
    let applyAfter = getNewPosition(item, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      item.prepend(dragging);
    }
  });
});

function getNewPosition(column, positionY) {
  let cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    let box = refer_card.getBoundingClientRect();
    let boxcenterY = box.y + box.height / 2;

    if (positionY >= boxcenterY) result = refer_card;
  }
  return result;
}

let addcards = document.querySelector(".button");

function adiciona() {
  addcards.classList.add("item");
}

/* Na function adiciona(), ele adiciona a class de .item ao meu button, mas eu gostaria de fazer ele adicionar
um novo .item no quadro e não qie ele vire um.*/
