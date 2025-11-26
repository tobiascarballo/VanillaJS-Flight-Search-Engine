// template que define el componente Results que muestra los vuelos disponibles según el presupuesto ingresado por el usuario
import getData from "../utils/getData.js";

// Definimos el componente Results, que mostrará los vuelos disponibles
const Results = async () => {

  const fullHash = (location.hash.slice(1) || "/");
  const queryString = fullHash.split("?")[1] || "";
  const params = new URLSearchParams(queryString);
  const budgetParam = params.get("budget"); 
  const budget = budgetParam ? Number(budgetParam) : null;

  // Llamamos getData() para obtener los vuelos
  const data = await getData();

  // Si el usuario ingresó un presupuesto (budget != null), filtramos. Si no, no mostramos resultados hasta que ingrese uno
  const availableFlights = budget !== null ? data.filter(flight => flight.price <= budget) : [];

  let view = `
    <section class="results">
      <h1>Resultados de vuelos</h1>
      <form id="budget-form" onsubmit="event.preventDefault(); const v = document.getElementById('budget-input').value; location.hash = '/results?budget=' + encodeURIComponent(v);">
        <label for="budget-input">Presupuesto: $</label>
        <input id="budget-input" type="number" min="0" placeholder="Ingresa tu presupuesto" value="${budget !== null ? budget : ""}" />
        <button type="submit">Aplicar</button>
      </form>
      <ul>
        ${
          budget !== null
            ? (availableFlights.length > 0
                ? availableFlights
                    .map(
                      (flight) => `
              <li class="flight-card">
                <strong>${flight.origin} → ${flight.destination}</strong><br>
                Precio: $${flight.price}<br>
                Disponibles: ${flight.availability}<br>
                Fecha: ${new Date(flight.date).toLocaleDateString("es-AR")}
              </li>
            `
                    )
                    .join("") 
                : `<p>No hay vuelos disponibles con tu presupuesto de $${budget}.</p>`)
            : `<p>Introduce el presupuesto para poder ver los vuelos.</p>`
        }
      </ul>
      <a href="#/">Volver al inicio</a>
    </section>
  `;
  return view;
};

export default Results;