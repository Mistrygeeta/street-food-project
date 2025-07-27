const express = require("express");
const cors = require("cors")


const app = express();
app.use(cors())

app.use(express.json())
app.use("/api/auth", require("./routes/auth.routes"))

app.use("/api/vendor",require("./routes/vendor.routes"))
app.use("/api/supplier", require("./routes/supplier.routes"))
module.exports = app;