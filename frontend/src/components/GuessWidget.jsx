import "../styles/GuessWidget.css"

export const GuessWidget = () => {
  return (
    <div className="guessDiv">
      <input type="text" name="name" required autoComplete="given-name" />
      <button>Verificar</button>
      <button>Saltar</button>
      <button>¿Pista?</button>
    </div>
  );
};
