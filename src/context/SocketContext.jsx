import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";


const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
        transports: ["websocket"],  // Use only WebSocket transport
        reconnection: true,         // Enable reconnection (default is true)
        reconnectionAttempts: 5,    // Try reconnecting up to 5 times
        reconnectionDelay: 3000,    // Wait 3 seconds between attempts
        reconnectionDelayMax: 10000, // Max delay is 10 seconds
        timeout: 20000,  
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });
      socket.current.on("reconnect_attempt", () => {
        console.log("Reconnection attempt...");
      });
  
      socket.current.on("reconnect", () => {
        console.log("Reconnected to the socket server");
      });
  
      socket.current.on("reconnect_error", (error) => {
        console.error("Reconnection error:", error);
      });
  
      socket.current.on("disconnect", (reason) => {
        console.log("Disconnected from socket server:", reason);
      });
      console.log("Socket reference:", socket.current);

      const handleRecieveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();


        // Log current chat data and type for debugging
        console.log("Selected Chat Data:", selectedChatData);
        console.log("Selected Chat Type:", selectedChatType);
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("message recved", message);
          addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};


