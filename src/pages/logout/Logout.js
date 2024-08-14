import { useNavigate } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";

const Logout = ({ t }) => {
  let navigate = useNavigate();

  return (
    <>
      <div className="ticket-table px-3">
        <div className="table-content pt-1">
          <Header />

          <div className="card shadow-sm p-3 bg-body border-radius-none box-shadow mt-5">
            <h1 className="text-center">
              {t("You")} {t("are")} {t("about")} {t("to")} {t("logout")}
            </h1>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-success"
                onClick={() => {
                  sessionStorage.removeItem("x-bingo-token");
                  sessionStorage.removeItem("xbw");
                  sessionStorage.removeItem("x_b__id");
                  navigate("/");
                }}
              >
                {t("ok")}
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/lobby");
                }}
              >
                {t("cancel")}
              </button>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Logout;
