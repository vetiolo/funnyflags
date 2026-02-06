import { useNavigate } from "react-router-dom";

export const GamesMenu = () => {
  const navigate = useNavigate();

  const chooseMode = (continent) => {
    navigate(`/flags-game/${continent}`);
  };

  return (
    <>
      <h2>Select the game</h2>
      <div>Flags games</div>
      <div>
        <button onClick={() => chooseMode("europa")}>Europa</button>
        <button onClick={() => chooseMode("america")}>America</button>
      </div>

      <div>Maps games</div>
      <div>Comming soon...</div>
    </>
  );
};
