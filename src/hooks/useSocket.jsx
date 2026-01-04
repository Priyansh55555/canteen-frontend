import { useEffect } from "react";
import socket from "../utils/socket";


const useSocket = (userId) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("🔌 Connected:", socket.id);
      socket.emit("join", userId); // join user room
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};

export default useSocket;
