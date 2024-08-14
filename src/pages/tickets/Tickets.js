import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import Timer from "components/Timer";
import Footer from "components/Footer";
import Header from "components/Header";
import { updateBingoSerie } from "helpers/BINGO";
import Ticket from "components/Ticket";

const Tickets = ({ t }) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("_id");

  let ticketsData = {
    ticket0: {
      row0: [],
      row1: [],
      row2: [],
    },
    ticket1: {
      row0: [],
      row1: [],
      row2: [],
    },
    ticket2: {
      row0: [],
      row1: [],
      row2: [],
    },
  };

  const [state, setState] = useState(null);

  if (state) {
    state.forEach((ticket, index) => {
      let a = ticketsData[`ticket${index}`];
      for (let i = 0; i < ticket.childNodes.length; i++) {
        // console.log(ticket.childNodes[i].innerText);
        if (i < 9) {
          a["row0"].push(ticket.childNodes[i].innerText);
        } else if (i >= 9 && i < 18) {
          a["row1"].push(ticket.childNodes[i].innerText);
        } else if (i >= 18 && i < 27) {
          a["row2"].push(ticket.childNodes[i].innerText);
        } else {
          console.error("ERROR");
        }
      }
    });
  }

  const buyTicket = async (ticket, index) => {
    // console.log(ticket);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST}/tickets`,
        {
          room_id: id,
          user_id: JSON.parse(sessionStorage.getItem("x_b__id")) ?? null,
          ticket: ticket,
        },
        {
          headers: {
            "x-access-bingo-token":
              JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
          },
        }
      );

      swal(data.message);
      sessionStorage.setItem("xbw", JSON.stringify(data.data.new_balance));

      document.getElementById(`buy-ticket-${index}`).classList.add("d-none");

      document
        .getElementById(`bought-ticket-${index}`)
        .classList.remove("d-none");
    } catch (err) {
      console.error(err);
      swal(err.response.data.message);
    }
  };

  useEffect(() => {
    if (!id) {
      navigate("/lobby");
    }

    setState(updateBingoSerie());

    return () => {};
  }, []);

  return (
    <div className="ticket-table px-3">
      <div className="table-content pt-1">
        <Header />

        {/* DO NOT REMOVE */}
        <div className="serie">
          <div id="ticket1" className="ticket"></div>
          <div id="ticket2" className="ticket"></div>
          <div id="ticket3" className="ticket"></div>
        </div>
        {/* DO NOT REMOVE */}

        {state &&
          Object.keys(ticketsData).map((key, index) => (
            <div key={index}>
              <Ticket data={ticketsData[key]} />
              <div className="d-flex align-items-center justify-content-between">
                <button
                  id={`buy-ticket-${index}`}
                  className="btn btn-warning my-1 btn-sm text-white font-weight-bold"
                  onClick={() => buyTicket(ticketsData[key], index)}
                >
                  {t("buy")}
                </button>

                <button
                  id={`bought-ticket-${index}`}
                  className="btn btn-danger my-1 btn-sm text-white font-weight-bold d-none"
                  disabled
                >
                  {t("bought")}
                </button>

                {index === Object.keys(ticketsData).length - 1 && (
                  <button
                    style={{ backgroundColor: "transparent", border: "none" }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <i className="fa-solid fa-shuffle text-secondary-light"></i>
                  </button>
                )}

                {index === Object.keys(ticketsData).length - 1 && (
                  <h5 className="text-warning">
                    {t("Game")} {t("id")} {id}
                  </h5>
                )}
              </div>
            </div>
          ))}

        <Timer time={location?.state?.nextGame ?? null} t={t} />

        <Footer />
      </div>
    </div>
  );
};

export default Tickets;
