interface zone {
    active: boolean,
}
let zones: Record<string, zone> = {
    "A": {active: 0},
    "B": {active: 0},
    "C": {active: 0},
    "D": {active: 0},
    "E": {active: 0},
    "F": {active: 0},
    "G": {active: 0},
    "H": {active: 0},
    "I": {active: 0},
    "J": {active: 0},
    "K": {active: 0},
    "L": {active: 0},
    "M": {active: 0},
    "N": {active: 0},
    "O": {active: 0},
    "P": {active: 0},
    "Q": {active: 0},
    "R": {active: 0},
    "S": {active: 1},
    "T": {active: 0},
    "U": {active: 0},
    "V": {active: 0},
    "X": {active: 0},
    "Y": {active: 1},
    "W": {active: 0},
    "Z": {active: 0},
    "AA": {active: 0},
    "AB": {active: 0},
    "AC": {active: 0},
    "AD": {active: 0},
    "AE": {active: 0},
    "AF": {active: 0},
};

const buildings = document.querySelectorAll<SVGPolygonElement>(".building")

buildings.forEach((building) => {
    const code = building.dataset.building;
    if (!zones[code].active) {
        building.style.fill = "#525860";
    }
    console.log(building.id, code);
});
