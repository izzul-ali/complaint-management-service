import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at port :${port}`);
});

export default app;
