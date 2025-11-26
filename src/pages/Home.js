// template de la página de Home
const Home = () => {
    const view = `
        <section class="home">
            <h1>Bienvenido!</h1>
            <p>Hace click en Siguiente para poder avanzar con la consulta</p>
            <a href="#/results">Siguiente</a>
        </section>
    `;
    return view;
};

export default Home;
