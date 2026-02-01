import { useEffect, useState } from "react";

import "./App.css"

function App() {
  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState("europa");

  useEffect(() => {
    // Llamada al backend
    fetch(`http://localhost:8000/countries/${continent}`)
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
      <h1>Banderas de {continent}</h1>
      <div className="boxes">
        {countries.map((country, index) => (
          <div className="box">
            <img
              src={`/src/assets/flags/${country.code.toLowerCase()}.svg`}
              style={{ width: "5rem" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
