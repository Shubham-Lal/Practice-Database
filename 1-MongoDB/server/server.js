require('dotenv').config();
const connectDatabase = require('./config/connectDB');

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const { readdirSync } = require('fs');
readdirSync("./routes").map((r) => app.use("/api/", require('./routes/' + r)));

app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: "Server runing..." });
});

connectDatabase().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on PORT => ${PORT}`));
});