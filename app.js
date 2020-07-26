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

const rangeAnswered = data => data.range[0];

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

const speciesCount = () => {
    const speciesList = document.querySelector("#species-list")
    return speciesList ? speciesList.children.length : 0;
};


// HELPERS—CREATE/MANIPULATE DOM ELEMENTS

const addListItem = (parent, heading, text) => {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `<b>${heading}</b>: ${text}`;
    parent.appendChild(newListItem);
};

const createSpeciesList = () => {
    console.log("=".repeat(40));
    console.log("Creating species list...")

    const container = document.createElement("div");
    container.id = "species-list-container";

    const heading = document.createElement("h1");
    heading.classList.add("heading");
    heading.textContent = "Species";
    container.appendChild(heading);

    const list = document.createElement("ul");
    list.id = "species-list";
    list.classList.add("content");
    container.appendChild(list);

    const body = document.querySelector("body");
    body.appendChild(container);
    console.log("Species list created");
};

const populateSpeciesListItem = (listItem, data) => {
    const titleRow = document.createElement("div");
    titleRow.classList.add("species-title-row");
    
    const title = document.createElement("h2");
    title.classList.add("species-title");
    title.textContent = getSpeciesTitle(data);
    titleRow.appendChild(title);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", handleDeleteClick);
    titleRow.appendChild(deleteButton);

    listItem.appendChild(titleRow);

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
};
    


// EVENT HANDLERS
const handleNewSpecies = function () {
    event.preventDefault()

    const data = parseData(this);
    logValues(data);

    if (rangeAnswered(data)) {
        let speciesList = document.querySelector("#species-list");
        if (!speciesList) {createSpeciesList();}

        const newSpeciesListItem = document.createElement("li");
        newSpeciesListItem.classList.add("species-item");
        populateSpeciesListItem(newSpeciesListItem, data);
        
        speciesList = document.querySelector("#species-list");
        speciesList.appendChild(newSpeciesListItem);

        this.reset();
    } else {
        console.log("=".repeat(40));
        console.log("Failed to save species: no range provided.");
        alert("Please enter the species' range.");
    }
};

const handleDeleteAllClick = function () {
    console.log("=".repeat(40));
    console.log("Deleting all species in list...")
    const listContainer = document.querySelector("#species-list-container");
    if (listContainer) {listContainer.remove();}
};

const handleDeleteClick = function () {
    console.log("=".repeat(40));
    if (speciesCount() === 1) {
        console.log("Deleting last species in list (list will be removed)");
        const listContainer = document.querySelector("#species-list-container")
        listContainer.remove()
    } else {
        console.log("Deleting species entry...");
        this.parentNode.parentNode.remove();
        console.log(`${speciesCount()} species remaining.`);
    }
};


// DOM INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    console.log("js loaded");

    const newSpeciesForm = document.querySelector("#new-species-form");
    newSpeciesForm.addEventListener("submit", handleNewSpecies);

    const deleteAllButton = document.querySelector("#delete-all");
    deleteAllButton.addEventListener("click", handleDeleteAllClick);
});
