import { Route, Routes } from "react-router-dom";

import { Protect } from "guards";

import Home from "pages/home/Home";
import Login from "pages/login/Login";
import Register from "pages/register/Register";
import Lobby from "pages/lobby/Lobby";
import Logout from "pages/logout/Logout";
import Rounds from "pages/rounds/Rounds";
import Terms from "pages/terms/Terms";
import Winner from "pages/winner/Winner";
import Tickets from "pages/tickets/Tickets";
import GameRoom from "./../pages/gameRoom/GameRoom";

const index = ({ t }) => {
  return (
    <Routes>
      <Route path="/" element={<Home t={t} />} />
      <Route path="login" element={<Login t={t} />} />
      <Route path="register" element={<Register t={t} />} />
      <Route
        path="lobby"
        element={
          <Protect>
            <Lobby t={t} />
          </Protect>
        }
      />
      <Route
        path="logout"
        element={
          <Protect>
            <Logout t={t} />
          </Protect>
        }
      />
      <Route
        path="rounds"
        element={
          <Protect>
            <Rounds t={t} />
          </Protect>
        }
      />
      <Route
        path="terms"
        element={
          <Protect>
            <Terms t={t} />
          </Protect>
        }
      />
      <Route
        path="winner"
        element={
          <Protect>
            <Winner t={t} />
          </Protect>
        }
      />
      <Route
        path="tickets"
        element={
          <Protect>
            <Tickets t={t} />
          </Protect>
        }
      />
      <Route
        path="game"
        element={
          <Protect>
            <GameRoom t={t} />
          </Protect>
        }
      />
      <Route
        path="*"
        element={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              minHeight: "100vh",
              minWidth: "320px",
              margin: 0,
              padding: 0,
              color: "#FFFFFF",
              fontSize: "2rem",
            }}
          >
            <p>{t("URL_NOT_FOUND!")}</p>
            <a href="/">Home</a>
          </div>
        }
      />
    </Routes>
  );
};

export default index;
