import express from "express"
import transceiversRoutes from "./routes/transceiversRoutes.js"
import connectDB from "./db/dbConection.js";
import cors from "cors"
const app = express();
const port = 3000;

connectDB();
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('This is my API for the inventory for Quantic')
});

app.use("/api",transceiversRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
