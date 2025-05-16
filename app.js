let state = reactive({ message: "Hello little bird!" });

function renderApp() {
    render("app", `<h1>${state.message}</h1>`);
}

renderApp();

setTimeout(() => {
    state.message = "Hello big bird!";
}, 500);
