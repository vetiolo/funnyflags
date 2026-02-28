import { useNavigate } from "react-router-dom";

import "../styles/GamesMenu.css";

export const GamesMenu = () => {
  const navigate = useNavigate();

  const chooseMode = (continent) => {
    navigate(`/flags-game/${continent}`);
  };

  return (
    <div className="gamesMenuContainer">
      <h2>Modos de juego</h2>

      <div className="modesContainer">
        <div>Juegos de banderas</div>
        <div className="gamesButtons">
          <button onClick={() => chooseMode("europa")}>Europa</button>
          <button onClick={() => chooseMode("america")}>America</button>
          <button onClick={() => chooseMode("asia")}>Asia</button>
          <button onClick={() => chooseMode("africa")}>Africa</button>
          <button onClick={() => chooseMode("oceania")}>Oceania</button>
          <button onClick={() => chooseMode("world")}>El Mundo</button>
        </div>
      </div>

      <div className="separator"></div>

      <div className="modesContainer">
        <div>Juegos de mapas</div>
        <div>Proximamente...</div>
      </div>
    </div>
  );
};
