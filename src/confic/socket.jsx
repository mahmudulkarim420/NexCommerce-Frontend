import { io } from "socket.io-client";
const socket = io("https://nexcommerce.com", {
  transports: ["websocket"],
});
export default socket;
