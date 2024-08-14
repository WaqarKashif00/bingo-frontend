import { useState, useEffect, memo } from "react";
import { socket } from "../socket/index";

const Header = () => {
  const [value, setValue] = useState(
    Number(JSON.parse(sessionStorage.getItem("xbw"))).toFixed(2)
  );

  useEffect(() => {
    const _id = setInterval(() => {
      setValue(Number(JSON.parse(sessionStorage.getItem("xbw"))).toFixed(2));
    }, 1000);
    return () => {
      clearInterval(_id);
    };
  });

  useEffect(() => {
    socket.on("receiveWallet", ({ userBalance }) => {
      sessionStorage.setItem("xbw", JSON.stringify(userBalance));
    });

    return () => {};
  });

  useEffect(() => {
    const __id = setInterval(() => {
      socket.emit("sendUserId", {
        userId: JSON.parse(sessionStorage.getItem("x_b__id")),
      });
    }, 2000);

    return () => {
      clearInterval(__id);
    };
  });

  return (
    <div className="cstm-header pt-1">
      <div className="header d-flex justify-content-between align-items-center">
        <div className="logo">
          <img src="./assets/images/logo.png" width="200" height="100" alt="" />
        </div>
        <div className="money">
          <h4 className="text-warning">${value ?? "0.00"}</h4>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
