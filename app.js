// HELPERS
const arrayFromChecklist = checklist => {
    // => array of values from checked elements of NodeList
    array = Array.from(checklist)
    return array.filter(child => child.checked).map(child => child.value);
}


// EVENT HANDLERS
const handleNewAnimal = function () {
    event.preventDefault()

    const commonName = this.commonName.value;
    const scientificName = this.scientificName.value;
    const habitat = this.habitat.value;
    const range = arrayFromChecklist(this.range);
    const population = this.population.value;
    const conservationStatus = this.conservationStatus.value;

    console.log('event :>> ', event);
    console.log('new animal :>> ', this);
    console.log('commonName :>> ', commonName);
    console.log('scientificName :>> ', scientificName);
    console.log('habitat :>> ', habitat);
    console.log('range :>> ', range);
    console.log('population :>> ', population);
    console.log('conservationStatus :>> ', conservationStatus);

    this.reset();
};


// DOM INTERACTIONS
document.addEventListener("DOMContentLoaded", () => {
    console.log("js loaded");

    const newAnimalForm = document.querySelector("#new-animal-form");
    newAnimalForm.addEventListener("submit", handleNewAnimal);
});
