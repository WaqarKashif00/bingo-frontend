import axios from "axios";
import { useEffect, memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/index";

const BingoNumbers = ({ win, id, pushNumToBingoArray }) => {
  let navigate = useNavigate();

  const firstCall = useRef(1);
  const firstCallForTemp = useRef(0);
  const [BN, setBN] = useState([]);
  const [passed, setPassed] = useState([]);
  // socket
  const [isConnected, setIsConnected] = useState(socket.connected);

  const temp = () => {
    if (BN.length) {
      pushNumToBingoArray(BN[0]);
      setPassed([...passed, BN[0]]);
    } else {
      navigate("/winner", {
        replace: true,
        state: { winner: "None", id: id, reward: win },
      });
    }
  };

  useEffect(() => {
    const _id = setInterval(() => {
      socket.emit(
        process.env.REACT_APP_BINGO_NUMBER_DURATION_FETCH_ID,
        { roomId: id },
        (error) => {
          if (error) {
            alert(error);
          }
        }
      );
    }, process.env.REACT_APP_BINGO_NUMBER_DURATION_FETCH ?? 5000);

    return () => {
      clearInterval(_id);
    };
  });

  useEffect(() => {
    if (firstCall.current === 1) {
      socket.emit(
        process.env.REACT_APP_BINGO_NUMBER_DURATION_FETCH_ID,
        { roomId: id },
        (error) => {
          if (error) {
            alert(error);
          }
        }
      );

      firstCall.current = 2;
    }

    return () => {};
  });

  useEffect(() => {
    socket.on(
      process.env.REACT_APP_BINGO_NUMBER_DURATION_SEND_ID,
      ({ nums }) => {
        setBN(JSON.parse(nums).nums ?? []);
      }
    );

    return () => {};
  });

  useEffect(() => {
    if (firstCallForTemp.current === 1) temp();
    else firstCallForTemp.current = 1;
  }, [BN]);

  useEffect(() => {
    if (BN && BN.length) {
      new Audio(`./assets/audio/${BN[0]}.mp3`).play();
    }
  }, [BN]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-evenly">
        <div className="rounded-circle bg-white p-1 text-center round-orange-border">
          {passed && passed.length && passed[1]}
        </div>
        <div className="rounded-circle bg-white p-1 text-center round-orange-border">
          {passed && passed.length && passed[2]}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-around">
        <div className="rounded-circle bg-white p-1 text-center round-orange-border">
          {passed && passed.length && passed[3]}
        </div>
        <div className="rounded-circle bg-white p-3 text-center round-yellow-border">
          {BN && BN.length && BN[0]}
        </div>
        <div className="rounded-circle bg-white p-1 text-center round-orange-border">
          {passed && passed.length && passed[4]}
        </div>
      </div>
    </>
  );
};

export default memo(BingoNumbers);
