const exprees = require("express");
const connect = require("./Config/connect");
const cors = require('cors');
const userRouter = require("./Routes/userRouter");
const productRouter = require("./Routes/productRouter");
const OrderRouter = require("./Routes/OrderRouter");

const app = exprees();
const port = 3200;
app.use(cors({
  origin: '*'
}));


app.use(exprees.json());
//Call the connect funtion to db
connect();
//definition of the routes of the project
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/order",OrderRouter);


//Running server
app.listen(port, (err) => {
  err
    ? console.log("something went wrong with the server")
    : console.log(`we are running on .. http://localhost:${port}`);
});
