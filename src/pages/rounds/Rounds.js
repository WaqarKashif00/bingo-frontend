import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useSearchParams } from "react-router-dom";

import Footer from "components/Footer";
import Header from "components/Header";
import Timer from "components/Timer";

const Rounds = ({ t }) => {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("next");

  const [state, setState] = useState([]);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/history`,
        {
          headers: {
            "x-access-bingo-token":
              JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
          },
        }
      );

      setState(data.data);
    } catch (err) {
      console.error(err);
      swal(err.response.data.message);
      if (err.response.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchHistory();
    return () => {};
  }, []);

  return (
    <div className="ticket-table px-3">
      <div className="table-content pt-1">
        <Header />

        {state && state.length ? (
          <div className="table mt-3">
            <table className="table table-sm">
              <thead className="text-secondary-light">
                <tr>
                  <th>{t("id")}</th>
                  <th>{t("opponents")}</th>
                  <th>{t("win")}</th>
                  <th>
                    {t("date")}/{t("time")}
                  </th>
                  <th>{t("winner")}</th>
                </tr>
              </thead>
              <tbody className="text-light">
                {state.map((item) => (
                  <tr key={item.id}>
                    <td className="text-warning">#{item.id}</td>
                    <td>{item.opponents}</td>
                    <td>{item.winning_price}</td>
                    <td className="text-success">{item.time}</td>
                    <td>
                      <p>{item.winner}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h5 className="text-white text-center">
            {t("No")} {t("rooms")} {t("were")} {t("played")}
          </h5>
        )}

        <Timer time={time ?? null} t={t} />

        <Footer />
      </div>
    </div>
  );
};

export default Rounds;
