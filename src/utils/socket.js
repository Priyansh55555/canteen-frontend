import { io } from "socket.io-client";

// frontend connects to same origin
const socket = io("/", {
  path: "/socket.io",
  autoConnect: false,
});

export default socket;