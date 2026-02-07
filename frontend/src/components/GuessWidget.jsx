import "../styles/GuessWidget.css";

export const GuessWidget = ({ success, skip }) => {
  return (
    <div className="guessDiv">
      <input type="text" name="name" required autoComplete="given-name" />
      <button onClick={() => success()}>Verificar</button>
      <button onClick={() => skip()}>Saltar</button>
      <button disabled>¿Pista?</button>
    </div>
  );
};
