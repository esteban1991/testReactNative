import { io } from "socket.io-client";
import '../global'

const socket = io.connect(LocalIP+":4000");
export default socket;