import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";

import BingoNumbers from "components/BingoNumbers";
import Footer from "components/Footer";
import Header from "components/Header";
import Ticket from "components/Ticket";

import { socket } from "../../socket/index";
import Timer from "components/Timer";

const GameRoom = ({ t }) => {
  let navigate = useNavigate();
  let location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("_id");
  const userId = JSON.parse(sessionStorage.getItem("x_b__id"));

  const R1 = useRef(0);
  const R2 = useRef(0);

  const [bingoTickets, setBingoTickets] = useState({
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
  });
  const [roomData, setRoomData] = useState({});
  const [tickets, setTickets] = useState([]);
  const [newBingoArray, setNewBingoArray] = useState([]);
  const [showTimer, setShowTimer] = useState(false);

  // socket
  const [isConnected, setIsConnected] = useState(socket.connected);

  const getRoom = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/rooms/${id}`,
        {
          headers: {
            "x-access-bingo-token":
              JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
          },
        }
      );

      if (data.message === "Room not started!") {
        setShowTimer(true);
      }

      setRoomData(data?.data ?? {});
    } catch (err) {
      console.error(err);
      swal(err.response.data.message);
      if (err.response.status === 401) {
        navigate("/");
      }
    }
  };

  const getTicket = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOST}/tickets?user_id=${userId}&room_id=${id}`,
        {
          headers: {
            "x-access-bingo-token":
              JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
          },
        }
      );

      setTickets(
        data.data.map((item, index) => ({
          [`ticket${index}`]: JSON.parse(item.ticket),
        }))
      );
    } catch (err) {
      console.error(err);
      swal(err.response.data.message);
      if (err.response.status === 401) {
        navigate("/");
      }
    }
  };

  // const removeFirstElement = async () => {
  //   if (JSON.parse(roomData.bingo_nums).nums.length) {
  //     setRoomData({
  //       ...roomData,
  //       bingo_nums: JSON.stringify({
  //         nums: JSON.parse(roomData.bingo_nums).nums.slice(1),
  //       }),
  //     });
  //   } else {
  //     navigate("/winner", {
  //       replace: true,
  //       state: { winner: "None", id: id, reward: roomData?.ticket_price },
  //     });
  //   }
  // };

  const pushNumToBingoArray = (elem) => {
    setNewBingoArray((prev) => [...prev, elem]);
  };

  const updateTickets = (ticketNo, rowNo, item) => {
    setBingoTickets((prev) => ({
      ...prev,
      [ticketNo]: {
        ...prev[ticketNo],
        [rowNo]: [...prev[ticketNo][rowNo], Number(item)],
      },
    }));
  };

  const showWinner = ($data) => {
    navigate("/winner", {
      replace: true,
      state: { winner: $data.winner, id: id, reward: $data.prize },
    });
  };

  const winBingo = (e) => {
    e.preventDefault();

    // console.log(newBingoArray);

    let flagA = false;
    let flagB = false;
    let flagC = false;

    const sequence = Object.keys(bingoTickets).map((key, idx) => ({
      [`ticket${idx}`]: Object.keys(bingoTickets[key]).filter(
        (rowNo) => bingoTickets[key][rowNo].length === 5
      ).length
        ? Object.keys(bingoTickets[key]).filter(
            (rowNo) => bingoTickets[key][rowNo].length === 5
          )[0]
        : "",
    }));

    const sq1 = sequence[0]?.ticket0
      ? bingoTickets.ticket0[sequence[0].ticket0]
      : false;
    const sq2 = sequence[1]?.ticket1
      ? bingoTickets.ticket1[sequence[1].ticket1]
      : false;
    const sq3 = sequence[2]?.ticket2
      ? bingoTickets.ticket2[sequence[2].ticket2]
      : false;

    if (sq1) {
      sq1.pop();
      flagA = checkSequence(newBingoArray, sq1);
    }
    if (sq2) {
      sq2.pop();
      flagB = checkSequence(newBingoArray, sq2);
    }
    if (sq3) {
      sq3.pop();
      flagC = checkSequence(newBingoArray, sq3);
    }

    if (flagA || flagB || flagC) {
      socket.emit(process.env.REACT_APP_SOCKET_ID, {
        bingo_tickets: bingoTickets,
        roomId: id,
        userId: userId,
        win: flagA || flagB || flagC,
      });
    } else {
      swal("Better Luck Next Time!!!");
      navigate("/lobby");
    }
  };

  const checkSequence = (master, sub) => {
    return sub.every(
      (
        (i) => (v) =>
          (i = master.indexOf(v, i) + 1)
      )(0)
    );
  };

  const setTimerOff = () => {
    setShowTimer(false);
    getRoom();
    // window.location.reload();
  };

  useEffect(() => {
    if (R2.current === 0) {
      getTicket();
      R2.current = 1;
    }

    return () => {};
  });

  useEffect(() => {
    if (R1.current === 0) {
      getRoom();
      R1.current = 1;
    }

    return () => {};
  });

  // socket
  useEffect(() => {
    socket.emit(
      process.env.REACT_APP_SOCKET_ON,
      { userId: userId, roomId: id },
      (error) => {
        if (error) {
          alert(error);
        }
      }
    );

    socket.on(process.env.REACT_APP_BINGO_ROOM, (data) => {
      console.log("BINGO_ROOM");
    });

    return () => {
      socket.emit(process.env.REACT_APP_SOCKET_OFF);
      socket.off();
    };
  }, [id, userId, window.location.search]);

  useEffect(() => {
    socket.on(process.env.REACT_APP_BINGO_WINNER, (data) => {
      showWinner(data);
    });

    return () => {};
  }, []);

  return (
    <div className="ticket-table px-3">
      <div className="table-content pt-1">
        <Header />

        {roomData && roomData?.bingo_nums && (
          <BingoNumbers
            id={id}
            win={roomData?.win ?? ""}
            bingoRandomNumbers={JSON.parse(roomData.bingo_nums).nums}
            pushNumToBingoArray={pushNumToBingoArray}
          />
        )}

        <h5 className="text-warning">
          {t("Game")} {t("id")} {id}
        </h5>

        {tickets.length &&
          tickets.map((ticket, index) => (
            <div key={index} className={index === 1 ? "my-2" : ""}>
              <Ticket
                data={ticket[`ticket${index}`]}
                ticketNo={index}
                updateTickets={updateTickets}
              />
            </div>
          ))}

        <h3 className="text-warning text-center">
          {t("Prize")} ${roomData?.win ?? null}
        </h3>

        <div className="d-flex align-items-center justify-content-center mt-4">
          <button
            className="rounded-circle bg-white p-3 text-center round-orange-border"
            onClick={winBingo}
            disabled={showTimer}
          >
            {t("Bingo")}
          </button>
        </div>

        {showTimer && (
          <div
            className="card shadow-sm p-3 bg-secondary border-radius-none mt-5"
            style={{
              position: "absolute",
              zIndex: 999,
              width: "80%",
              top: "176px",
              left: "60px",
            }}
          >
            <Timer
              time={location?.state?.time ?? null}
              t={t}
              color={""}
              setTimerOff={setTimerOff}
            />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default GameRoom;
