import { useEffect, useState } from "react";

import { Flag } from "../components/Flag";
import { GuessWidget } from "../components/GuessWidget";

import "../styles/FlagsGame.css";
import { useParams } from "react-router-dom";

export const FlagsGame = () => {
  const { continent } = useParams();

  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState([]);
  const [actualIndex, setActualIndex] = useState(0);

  useEffect(() => {
    setLoading(true);

    // llamada al backend
    fetch(`http://localhost:8000/countries/${continent}`)
      .then((res) => res.json())
      .then((res) => {
        // prueba con pocos paises
        // const prueba = res.slice(0, 10);

        setCountries(res.map((country) => ({ ...country, guess: false })));
        setActualIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar countries:", err);
        setLoading(false);
      });
  }, [continent]);

  // acierto
  const handleSuccess = () => {
    setCountries((prev) =>
      prev.map((item, index) =>
        index === actualIndex ? { ...item, guess: true } : item,
      ),
    );

    // mover el índice FUERA
    setActualIndex((prev) => {
      if (prev + 1 < countries.length) {
        return prev + 1;
      }

      // último → filtrar
      setCountries((prevCountries) => prevCountries.filter((c) => !c.guess));

      return 0;
    });
  };

  // skippear
  const handleSkip = () => {
    setActualIndex((prev) => {
      if (prev + 1 < countries.length) {
        return prev + 1;
      }

      // llega al final → filtra igual que en success
      setCountries((prevCountries) => prevCountries.filter((c) => !c.guess));

      return 0;
    });
  };

  const actualCountry = countries[actualIndex] ?? null;

  if (loading) return <div>Cargando...</div>;
  if (countries.length === 0) return <div>END</div>;

  return (
    <div className="container">
      <div>
        <h1>Banderas de {continent}</h1>
        <div className="box">
          <Flag country_code={actualCountry?.code.toLowerCase()} />
          <GuessWidget success={handleSuccess} skip={handleSkip} />
        </div>
      </div>
    </div>
  );
};
