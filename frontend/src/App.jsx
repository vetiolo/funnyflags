import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada al backend
    fetch("http://localhost:8000/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar countries:", err);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div>Cargando...</div>
  ) : (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Paises</h1>
      <h4>Códigos</h4>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            {country.code}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
