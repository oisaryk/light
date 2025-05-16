function render(element, content) {
    const app = document.getElementById(element);

    if (app !== null) {
        app.innerHTML = content;
    } else {
        throw new Error("Element not found");
    }
}

function reactive(obj) {
    const keys = Object.keys(obj);
    const reactiveObj = {};

    keys.forEach(key => {
        let value = obj[key];

        Object.defineProperty(reactiveObj, key, {
            get() {
                console.log(`Getting ${key}: ${value}`);
                return value;
            },
            set(newValue) {
                console.log(`Setting ${key}: ${newValue}`);
                value = newValue;
                renderApp();
            }
        });
    });

    return reactiveObj;
}