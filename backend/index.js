const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const MainRouter = require('./routes/main');


app.use("/api/v1", MainRouter);



app.listen(3000);