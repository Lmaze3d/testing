
const wrapper = document.querySelector(".wrapper"),
  selectBtn = wrapper.querySelector(".select-btn"),
  searchInp = wrapper.querySelector("input"),
  options = wrapper.querySelector(".options");

let countries = ["Arabia", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

const countryPositions = {
  "Brazil": { x: "0", y: "50%" }, // Posición para Brasil
  "Algeria": { x: "20%", y: "20%" }, // Posición para Argelia
  // Añadir más posiciones para otros países según sea necesario
};

function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addCountry();

function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

    // Selecciona el rectángulo y modifica su estilo de visualización
    const rectangle = document.querySelector("#rectangle");
    rectangle.style.display = "block";

    // Obtener la posición para el país seleccionado
    const countryPosition = countryPositions[selectedLi.innerText];
    if (countryPosition) {
        rectangle.style.left = countryPosition.x;
        rectangle.style.top = countryPosition.y;
    } else {
        // Si no se encuentra una posición específica, colocar el rectángulo en el centro de la página
        rectangle.style.left = "50vw";
        rectangle.style.top = "50vh";
    }

    // Cambiar el color del rectángulo según el país seleccionado
    rectangle.style.backgroundColor = selectedLi.innerText === "Brazil" ? "#FFA402" : "red";
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase(); 
    arr = countries.filter(data => {
        return data.toLowerCase().includes(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
