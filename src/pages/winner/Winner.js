import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Footer from "components/Footer";
import swal from "sweetalert";
import Header from "components/Header";

const Winner = ({ t }) => {
  let navigate = useNavigate();
  let location = useLocation();

  if (
    location?.state &&
    location?.state?.winner === "None" &&
    location?.state?.id
  ) {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_HOST}/rooms/end_game?xb_room_id=${location?.state?.id}`,
          {
            headers: {
              "x-access-bingo-token":
                JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
            },
          }
        );
      } catch (err) {
        console.error(err);
        swal(err.response.data.message);
        if (err.response.status === 401) {
          navigate("/");
        }
      }
    })();
  }

  if (
    location?.state &&
    location?.state?.reward &&
    location?.state?.winner !== "None"
  ) {
    const amount = (
      Number(JSON.parse(sessionStorage.getItem("xbw"))).toFixed(2) +
      Number(location.state.reward)
    ).toString();
    sessionStorage.setItem("xbw", amount);
  }

  return (
    <div className="ticket-table px-3">
      <div className="table-content pt-1">
        <Header />

        <div className="card shadow-sm p-3 bg-body border-radius-none box-shadow mt-5">
          <h1 className="text-center text-dark fw-bolder">
            {location?.state?.winner
              ? t(`${location?.state?.winner}`)
              : "No One"}
          </h1>
          <h1 className="text-center text-warning fw-bold">
            {t("is")} {t("the")} {t("WINNER")}
          </h1>
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="text-center text-dark fw-bold">{t("of")}</h1>
            <h1 className="text-center text-warning fw-bold">
              {location?.state && location?.state?.reward
                ? `${location.state.reward}`
                : null}
            </h1>
          </div>

          <button
            style={{ border: "none" }}
            onClick={() => navigate("/lobby", { replace: true })}
            className="text-white btn btn-sm btn-ticket"
          >
            {t("Go")} {t("To")} {t("Lobby")}
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Winner;
