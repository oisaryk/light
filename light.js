function render(element, content) {
    const app = document.getElementById(element);

    if (app !== null) {
        app.innerHTML = content;
    } else {
        throw new Error("Element not found");
    }
}