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

//routers
const dishRouter = require("./routes/dishRouter");

//dishes id endpoints

/* COMMENTING OUT

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

DONE COMMENTING OUT */

app.use("/dishes", dishRouter);

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