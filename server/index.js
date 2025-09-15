import 'dotenv/config';
import express from "express"
import transceiversRoutes from "./routes/transceiversRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./db/dbConection.js";
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express();
const port = 3000;
const origin='http://localhost:5173';

connectDB();
app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: origin,
    credentials: true,
}));
app.get('/', (req, res) => {
  res.send('This is my API for the inventory for Quantic')
});

app.use("/api",transceiversRoutes);
app.use("/users",userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
