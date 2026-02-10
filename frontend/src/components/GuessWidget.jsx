import "../styles/GuessWidget.css";

export const GuessWidget = ({ success, skip, onKeyDown, inputRef }) => {
  return (
    <div className="guessDiv">
      <input ref={inputRef} type="text" name="name" required autoComplete="given-name" onKeyDown={(event) => onKeyDown(event)} />
      <button onClick={() => success()}>Verificar</button>
      <button onClick={() => skip()}>Saltar</button>
      <button disabled>¿Pista?</button>
    </div>
  );
};
