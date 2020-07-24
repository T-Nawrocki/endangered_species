// HELPERS
const arrayFromChecklist = checklist => {
    // => array of values from checked elements of NodeList
    array = Array.from(checklist)
    return array.filter(child => child.checked).map(child => child.value);
};

const parseData = data => {
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

const logValues = data => {
    console.log("=".repeat(40));
    console.log("New Species Submitted with the following data:");
    console.log("-".repeat(40));
    console.log('commonName :>> ', data.commonName);
    console.log('scientificName :>> ', data.scientificName);
    console.log('habitat :>> ', data.habitat);
    console.log('range :>> ', data.range);
    console.log('population :>> ', data.population);
    console.log('conservationStatus :>> ', data.conservationStatus);
    console.log("=".repeat(40));
};

const getSpeciesTitle = data => {
    return data.commonName ? data.commonName : data.scientificName;
};

const addListItem = (parent, text) => {
    const newListItem = document.createElement("li");
    newListItem.textContent = text;
    parent.appendChild(newListItem);
};

const conservationStatusDisplay = status => {
    const displayList = {
        EX: "EX (Extinct",
        EW: "EW (Extinct in the wild",
        CR: "CR (Critically endangered)",
        EN: "EN (Endangered)",
        VU: "VU (Vulnerable)",
        NT: "NT (Near threatened)",
        LC: "LC (Least concern)",
        DD: "DD (Data deficient)",
        NE: "NE (Not evaluated)"
    };
    return `Conservation Status: ${displayList[status]}`
};

const rangeDisplay = rangeList => {
    const range =  rangeList.join(", ")
    return `Range: ${range}`
};

const populateSpeciesListItem = (listItem, data) => {
    const title = document.createElement("h2");
    title.classList.add("species-title");
    title.textContent = getSpeciesTitle(data);
    listItem.appendChild(title);

    if (data.commonName) {
        const subtitle = document.createElement("h3");
        subtitle.classList.add("species-subtitle");
        subtitle.textContent = data.scientificName;
        listItem.appendChild(subtitle);
    }

    const body = document.createElement("ul");
    body.classList.add("species-body");
    addListItem(body, conservationStatusDisplay(data.conservationStatus));
    addListItem(body, `Estimated Population in the Wild: ${data.population}`);
    addListItem(body, rangeDisplay(data.range));
    addListItem(body, `Habitat: ${data.habitat}`);
    listItem.appendChild(body);
};




// EVENT HANDLERS
const handleNewSpecies = function () {
    event.preventDefault()

    const data = parseData(this);
    logValues(data);
    
    const newSpeciesListItem = document.createElement("li");
    populateSpeciesListItem(newSpeciesListItem, data)
    
    const speciesList = document.querySelector("#species-list");
    speciesList.appendChild(newSpeciesListItem);

    this.reset();
};


// DOM INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    console.log("js loaded");

    const newSpeciesForm = document.querySelector("#new-species-form");
    newSpeciesForm.addEventListener("submit", handleNewSpecies);
});
