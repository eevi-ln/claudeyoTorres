export function create_button(
    parent: HTMLElement,
    label: string,
    foo_click: (event: MouseEvent) => void
): HTMLButtonElement {
    const button = document.createElement("button");
    button.addEventListener("click", foo_click);
    parent.appendChild(button);
    return button;
}
