import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

const app = express();
dotenv.config();

interface mysqlOptionsType {
  host: any;
  port: any;
  database: any;
  user: any;
  password: any;
}

const mysqlOptions: mysqlOptionsType = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const connection = mysql.createConnection(mysqlOptions);
connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: express.Request, res: express.Response) => {
  console.log(1);
  res.send("hello world");
});

app.post("/auth/register", (req: express.Request, res: express.Response) => {
  console.log(req.body);
  console.log(2);
  res.send("hi");
});

app.listen(6000, () => {
  console.log("express 서버 구동");
});
