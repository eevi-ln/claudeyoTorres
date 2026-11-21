interface mission {
    name: string;
    complete: boolean;
}

interface zone {
    active: boolean;
    missions: mission[];
}

const zones: Record<string, zone> = {};

document.querySelectorAll<HTMLElement>(
    ".sidebar-phase[data-building]"
).forEach((phase) => {

    const code = phase.dataset.building;
    if (!code) return;

    zones[code] = {
        active: false,

        missions: Array.from(
            phase.querySelectorAll<HTMLElement>(".mission-item"),
            (item) => ({
                name: item.textContent?.trim() ?? "",
                complete: item.classList.contains("completed"),
            })
        ),
    };
});

const opacitySlider = document.getElementById(
    "opacity-slider"
) as HTMLInputElement;

opacitySlider.addEventListener("input", () => {
    const opacity = Number(opacitySlider.value);

    root.style.setProperty(
        "--unlocked-opacity",
        opacity.toString()
    );

    if (opacityValue) {
        opacityValue.textContent = `${Math.round(opacity * 100)}%`;
    }

    Object.keys(zones).forEach(updateProgress);
});

const opacityValue = document.getElementById("opacity-value");

const root = document.documentElement;

function updateOpacity(): void {
    const value = Number(opacitySlider.value);

    root.style.setProperty("--unlocked-opacity", value.toString());

    if (opacityValue) {
        opacityValue.textContent = `${Math.round(value * 100)}%`;
    }

    Object.keys(zones).forEach(updateProgress);
}

opacitySlider.addEventListener("input", updateOpacity);
updateOpacity();

function updateProgress(building: string): void {
    const zone = zones[building];
    if (!zone) return;

    const total = zone.missions.length;

    const completed = zone.missions.filter(
        mission => mission.complete
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    const phase = document.getElementById(`phase-${building}`);
    if (!phase) return;

    const progressText = phase.querySelector<HTMLElement>(
        ".progress-percentage"
    );

    const progressFill = phase.querySelector<HTMLElement>(
        ".progress-fill"
    );

    if (progressText) {
        progressText.textContent = `${percentage}%`;
    }

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    const buildingElement = document.querySelector<SVGPolygonElement>(
        `.building[data-building="${building}"]`
    );
    let opacity = "1";
    if (buildingElement) {
        if (percentage === 0) {
            buildingElement.style.fill = "#525860";
            buildingElement.style.fillOpacity = "1";
        } else {
            buildingElement.style.fill = "";
            buildingElement.style.fillOpacity =
                percentage === 100
                    ? opacitySlider.value
                    : "1";
        }
        if (percentage === 100) {
            opacity = opacitySlider.value;
        }
    }

    if (buildingElement) {
        buildingElement.style.fillOpacity = opacity.toString();
    }
}

Object.keys(zones).forEach(updateProgress);


document.addEventListener("DOMContentLoaded", () => {
    const buildings = document.querySelectorAll<SVGPolygonElement>(".building");
    const menu_items = document.querySelectorAll<HTMLLIElement>(".building-menu li");
    const phases = document.querySelectorAll<HTMLElement>(".sidebar-phase");
    const back_buttons = document.querySelectorAll<HTMLButtonElement>("[data-back]");

    function show_phase(building: string): void {
        phases.forEach((phase) => {
            phase.classList.remove("active");
        });

        const selected_phase = document.getElementById(
            `phase-${building}`
        );

        if (selected_phase) {
            selected_phase.classList.add("active");
        } else {
            console.warn(`No sidebar view found for building: ${building}`);
        }

        buildings.forEach((item) => {
            item.classList.toggle(
                "selected",
                item.dataset.building === building
            );
        });
    }

    buildings.forEach((building) => {
        building.addEventListener("click", () => {

            const building_id = building.dataset.building;

            if (building_id) {
                show_phase(building_id);
            }

        });
    });

    menu_items.forEach((item) => {
        item.addEventListener("click", () => {
            const building_id = item.dataset.target;
            if (building_id) {
                show_phase(building_id);
            }

        });
    });

    back_buttons.forEach((button) => {
        button.addEventListener("click", () => {
            show_phase("default");
        });
    });

    show_phase("default");
});

function completeMission(
    building: string,
    missionIndex: number
): void {

    const zone = zones[building];
    if (!zone) return;

    const mission = zone.missions[missionIndex];
    if (!mission) return;

    mission.complete = !mission.complete;

    const phase = document.getElementById(`phase-${building}`);
    if (!phase) return;

    const elements = phase.querySelectorAll<HTMLElement>(
        ".mission-item"
    );

    const element = elements[missionIndex];

    element.classList.toggle("completed", mission.complete);
    element.classList.toggle("pending", !mission.complete);

    updateProgress(building);
}

document.querySelectorAll<SVGPolygonElement>(
    ".building"
).forEach((building) => {

    const code = building.dataset.building;
    if (!code) return;

    const zone = zones[code];
    if (!zone) return;

    building.classList.toggle("unlocked", zone.active);

});

document.querySelectorAll<HTMLElement>(
    ".sidebar-phase[data-building]"
).forEach((phase) => {

    const building = phase.dataset.building;
    if (!building) return;

    phase.querySelectorAll<HTMLElement>(
        ".mission-item"
    ).forEach((mission, index) => {

        mission.addEventListener("click", () => {
            completeMission(building, index);
        });

    });
});
