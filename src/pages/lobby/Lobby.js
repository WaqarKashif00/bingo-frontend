import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Footer from "components/Footer";
import Header from "components/Header";
import Timer from "components/Timer";
import TimeNow from "components/TimeNow";

export default function Lobby({ t }) {
  let navigate = useNavigate();

  const [state, setState] = useState({
    rooms: [],
    announcementText: "Welcome to Bingo Lobby!",
  });

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/rooms?all=true`,
        {
          headers: {
            "x-access-bingo-token":
              JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
          },
        }
      );

      setState({ ...state, rooms: data.data });
    } catch (err) {
      console.error(err);
      swal(err.response.data.message);
      if (err.response.status === 401) {
        navigate("/");
      }
    }
  };

  // const startGame = (room) => {
  //   const currentTime = new Date().toLocaleString("en-US", {
  //     hour12: false,
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: undefined,
  //   });

  //   if (currentTime >= room.start_time && room.opponents > 1)
  //     navigate(`/game?_id=${room.id}`, {
  //       state: { time: room.start_time.split(" ")[1] },
  //     });
  //   else swal("Room has been closed or hasn't started yet.");
  // };

  const startGame = (room) => {
    navigate(`/game?_id=${room.id}`, {
      state: { time: room.start_time },
    });
  };

  const purchaseTicket = (room) => {
    const twoMinsBeforeRoomStart = new Date(
      new Date(room.start_time) - 2 * 60000
    ).toLocaleString("en-US", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    });

    const currentTime = new Date().toLocaleString("en-US", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    });

    if (currentTime >= twoMinsBeforeRoomStart)
      swal("Ticket counter closed for this room.");
    else
      navigate(`/tickets?_id=${room.id}`, {
        state: {
          nextGame: state.rooms.length ? state.rooms[0].start_time : null,
        },
      });
  };

  useEffect(() => {
    fetchRooms();
    return () => {};
  }, []);

  return (
    <div className="ticket-table px-3">
      <div className="table-content pt-1">
        <Header />
        <TimeNow t={t} />
        {state.rooms.length ? (
          <div className="table mt-3">
            <table className="table table-sm">
              <thead className="text-secondary-light">
                <tr>
                  <th>{t("id")}</th>
                  <th>{t("opponents")}</th>
                  <th>{t("price")}</th>
                  <th>{t("time")}</th>
                  <th>{t("buy")}</th>
                </tr>
              </thead>
              <tbody className="text-light">
                {state.rooms.map((room, index) => (
                  <tr key={room.id}>
                    <td className="text-warning">
                      <button
                        style={{ border: "none", background: "transparent" }}
                        onClick={() => startGame(room)}
                        className="text-warning"
                      >
                        #{room.id}
                      </button>
                    </td>
                    <td>{room.opponents}</td>
                    <td>${room.ticket_price}</td>
                    <td className="text-success">
                      {room.start_time.split(" ")[1]}
                    </td>
                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => purchaseTicket(room)}
                        className="text-white btn btn-sm btn-ticket"
                      >
                        {t("tickets")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h5 className="text-white text-center">
            {t("None")} {t("rooms")} {t("are")} {t("available")}.
          </h5>
        )}

        <Timer
          time={state.rooms.length ? state.rooms[0].start_time : null}
          t={t}
        />

        <div className="annoucments text-center text-light border-warning py-2">
          <h5>{state.announcementText}</h5>
        </div>

        <Footer time={state.rooms.length ? state.rooms[0].start_time : null} />
      </div>
    </div>
  );
}
