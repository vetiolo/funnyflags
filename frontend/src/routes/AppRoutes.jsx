import { Navigate, Route, Routes } from "react-router-dom";
import { GamesMenu } from "../pages/GamesMenu";
import { FlagsGame } from "../pages/FlagsGame";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<GamesMenu />} />
      <Route path="/flags-game/:continent" element={<FlagsGame />} />
    </Routes>
  );
};
