import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_SOCKET_HOST, {
  withCredentials: true,
  extraHeaders: {
    "x-access-bingo-token":
      JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
  },
});
