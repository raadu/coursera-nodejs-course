const express = require("express");
const http = require("http");
const hostname = "localhost";
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser")

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.json());

//Routers
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

app.use((req, res, next) => 
{
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.end("<htm><body><h1>This is an express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => 
{
	console.log(`Server running at http://${hostname}:${port}`);
});