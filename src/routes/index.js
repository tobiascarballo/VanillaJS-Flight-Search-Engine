// este archivo se encarga de gestionar las rutas de la aplicación
import Home from "../pages/Home.js";
import Results from "../pages/Results.js";
import Error404 from "../pages/Error404.js";

const routes = { // rutas de la aplicación
    "/": Home,
    "/results": Results,
};

const router = async () => {
    const content = document.getElementById("content");
    const fullHash = (location.hash.slice(1) || "/").toLowerCase();
    const [path] = fullHash.split("?");
    const render = routes[path] ? routes[path] : Error404; 
    content.innerHTML = await render();
};

export default router;