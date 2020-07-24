// HELPERS
const arrayFromChecklist = checklist => {
    // => array of values from checked elements of NodeList
    array = Array.from(checklist)
    return array.filter(child => child.checked).map(child => child.value);
};

const getValuesFromData = data => {
    // => object holding input values from event target
    return {
        commonName: data.commonName.value,
        scientificName: data.scientificName.value,
        habitat: data.habitat.value,
        range: arrayFromChecklist(data.range),
        population: data.population.value,
        conservationStatus: data.conservationStatus.value  
    };
};

const logValues = values => {
    console.log("=".repeat(40));
    console.log("New Species Submitted with the following data:");
    console.log("-".repeat(40));
    console.log('commonName :>> ', values.commonName);
    console.log('scientificName :>> ', values.scientificName);
    console.log('habitat :>> ', values.habitat);
    console.log('range :>> ', values.range);
    console.log('population :>> ', values.population);
    console.log('conservationStatus :>> ', values.conservationStatus);
    console.log("=".repeat(40));
};

const populateListItem = (listItem, values) => {
    listItem.textContent = "test";
};




// EVENT HANDLERS
const handleNewAnimal = function () {
    event.preventDefault()

    const values = getValuesFromData(this);
    logValues(values);
    
    const newListItem = document.createElement("li");
    populateListItem(newListItem, values)
    
    const list = document.querySelector("#species-list");
    list.appendChild(newListItem);

    this.reset();
};


// DOM INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    console.log("js loaded");

    const newAnimalForm = document.querySelector("#new-animal-form");
    newAnimalForm.addEventListener("submit", handleNewAnimal);
});
