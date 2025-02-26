import express from "express";
import getDataBase from "./Database/Database.js";
import bodyParser from "body-parser";
import routes from "./Routes/route.js";
import path from "path";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();
const Port = 3030;

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
getDataBase();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.get("/test", (req, res) => {
  return res.status(200).send("Workds");
});

app.listen(Port, () => {
  console.log("Runing");
});
