import { useEffect, useRef, useState } from "react";

import { Flag } from "../components/Flag";
import { GuessWidget } from "../components/GuessWidget";

import "../styles/FlagsGame.css";
import { useParams } from "react-router-dom";

import { normalizeCountryName } from "../helpers/functions.js";

export const FlagsGame = () => {
  const { continent } = useParams();

  const [loading, setLoading] = useState(true);

  const [countries, setCountries] = useState([]);
  const [actualIndex, setActualIndex] = useState(0);

  const [numOfFlags, setNumOfFlags] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);

    // llamada al backend
    fetch(`http://localhost:8000/countries/${continent}`)
      .then((res) => res.json())
      .then((res) => {
        // prueba con pocos paises
        // const prueba = res.slice(0, 5);

        setCountries(res.map((country) => ({ ...country, guess: false })));
        setActualIndex(0);
        setNumOfFlags(res.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar countries:", err);
        setLoading(false);
      });
  }, [continent]);

  // pais actual
  const actualCountry = countries[actualIndex] ?? null;

  const actualCountryNames = countries[actualIndex]?.name.map((name) => {
    return normalizeCountryName(name);
  });

  // acierto
  const successGuess = () => {
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

    // suma el numero de aciertos
    setSuccessCount((prevValue) => prevValue + 1);

    // limpiar el input
    inputRef.current.value = "";

    // focus en el input por si clicka algun boton
    inputRef.current.focus();
  };

  // boton de skippear
  const handleSkip = () => {
    setActualIndex((prev) => {
      if (prev + 1 < countries.length) {
        return prev + 1;
      }

      // llega al final → filtra igual que en success
      setCountries((prevCountries) => prevCountries.filter((c) => !c.guess));

      return 0;
    });

    // focus en el input por si clicka algun boton
    inputRef.current.focus();
  };

  // boton de verificar
  const handleSuccess = () => {
    wellOrWrong();
  };

  // tecla enter al input
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      wellOrWrong();
    }
  };

  // verifica si el valor del input es correcto
  const wellOrWrong = () => {
    if (
      actualCountryNames.includes(normalizeCountryName(inputRef.current.value))
    ) {
      successGuess();
    } else {
      console.log("mal");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (countries.length === 0) return <div>END</div>;

  return (
    <div className="container">
      <div>
        <div className="gameInfoHeader">
          Banderas de {continent} | {successCount} / {numOfFlags}
        </div>
        <div className="box">
          <Flag country_code={actualCountry?.code.toLowerCase()} />
          <GuessWidget
            success={handleSuccess}
            skip={handleSkip}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
};
