import { useEffect, useState } from "react";

import { Flag } from "../components/Flag";
import { GuessWidget } from "../components/GuessWidget";

import "../styles/FlagsGame.css";
import { useParams } from "react-router-dom";

export const FlagsGame = () => {
  const { continent } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

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
    <div className="container">
      <div>
        <h1>Banderas de {continent}</h1>
        {countries.map((country) => {
          return (
            <div className="box" key={country.code}>
              <Flag country_code={country.code.toLowerCase()} />
              <GuessWidget />
            </div>
          );
        })}
      </div>
    </div>
  );
};
