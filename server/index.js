const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;

const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://192.168.1.107:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const generateID = () => Math.random().toString(36).substring(2, 10);

let todoList = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("addTodo", (todo) => {
		console.log("add Todo working")
		todoList.unshift({ _id: generateID(), title: todo, comments: [] });
		socket.emit("todos", todoList);
	});

	socket.on("retrieveComments", (id) => {
		let result = todoList.filter((todo) => todo._id === id);
		socket.emit("displayComments", result[0].comments);
	});

	socket.on("addComment", (data) => {
		let result = todoList.filter((todo) => todo._id === data.todo_id);
		result[0].comments.unshift({
			id: generateID(),
			title: data.comment,
			user: data.user,
		});
		socket.emit("displayComments", result[0].comments);
	});

	socket.on("deleteTodo", (id) => {
		let result = todoList.filter((todo) => todo._id !== id);
		todoList = result;
		socket.emit("todos", todoList);
	});

	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

app.get("/todos", (req, res) => {
    console.log(`entering to the list${res}`)
	res.json(todoList);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});