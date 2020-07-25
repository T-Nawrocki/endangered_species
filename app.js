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
        conservationStatus: data.conservationStatus.value,
        range: arrayFromChecklist(data.range),
        population: data.population.value,
        habitat: data.habitat.value,
        diet: data.diet.value
    };
};

const logValues = data => {
    console.log("=".repeat(40));
    console.log("New Species Submitted with the following data:");
    console.log("-".repeat(40));
    console.log('commonName :>> ', data.commonName);
    console.log('scientificName :>> ', data.scientificName);
    console.log('conservationStatus :>> ', data.conservationStatus);
    console.log('range :>> ', data.range);
    console.log('population :>> ', data.population);
    console.log('habitat :>> ', data.habitat);
    console.log('diet :>> ', data.diet);
};

const getSpeciesTitle = data => {
    return data.commonName ? data.commonName : data.scientificName;
};

const addListItem = (parent, heading, text) => {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `<b>${heading}</b>: ${text}`;
    parent.appendChild(newListItem);
};

const conservationStatusDisplay = status => {
    const displayList = {
        EX: "EX (Extinct",
        EW: "EW (Extinct in the Wild",
        CR: "CR (Critically Endangered)",
        EN: "EN (Endangered)",
        VU: "VU (Vulnerable)",
        NT: "NT (Near Threatened)",
        LC: "LC (Least Concern)",
        DD: "DD (Data Deficient)",
        NE: "NE (Not Evaluated)"
    };
    return displayList[status]
};

const rangeDisplay = rangeList => rangeList.join(", ");

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
    addListItem(
        body,
        "Conservation Status",
        conservationStatusDisplay(data.conservationStatus)
    );
    addListItem(body, "Estimated Population in the Wild", data.population);
    addListItem(body, "Range", rangeDisplay(data.range));
    addListItem(body, "Habitat", data.habitat);
    addListItem(body, "Diet", data.diet);
    listItem.appendChild(body);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", handleDeleteClick);
    listItem.appendChild(deleteButton);
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

const handleDeleteAllClick = function () {
    console.log("=".repeat(40));
    console.log("Deleting all species in list...")
    const speciesList = document.querySelector("#species-list");
    speciesList.innerHTML = "";
};

const handleDeleteClick = function () {
    console.log("=".repeat(40));
    console.log("Deleting species entry...")
    this.parentNode.remove();
};


// DOM INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    console.log("js loaded");

    const newSpeciesForm = document.querySelector("#new-species-form");
    newSpeciesForm.addEventListener("submit", handleNewSpecies);

    const deleteAllButton = document.querySelector("#delete-all");
    deleteAllButton.addEventListener("click", handleDeleteAllClick);
});
