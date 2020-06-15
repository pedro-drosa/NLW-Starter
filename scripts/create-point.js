function populeteUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then((states)=>{
    states.forEach( state => {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
    });
  })
}

populeteUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;
  fetch(url)
  .then(res=> res.json())
  .then(cities =>{
    cities.forEach(city => {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    });
    citySelect.disabled = false;
  })
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities);

//collection items
const collectedItems = document.querySelector('input[name=items]')
let selectedItems = [];

function handleSelectedItem(event){
  const itemLi = event.target;
  itemLi.classList.toggle("selected");
  const itenId = itemLi.dataset.id;
  
  const alreadySelected = selectedItems.findIndex(item => item == itenId);
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item =>{
      const itemIsDifferent = item != itenId;
      return itemIsDifferent;
    })
    selectedItems = filteredItems
  }else{
    selectedItems.push(itenId);
  }
  collectedItems.value = selectedItems
}

const itensToCollect = document.querySelectorAll('.itens-grid li');
itensToCollect.forEach(item => {
  item.addEventListener('click',handleSelectedItem)
});