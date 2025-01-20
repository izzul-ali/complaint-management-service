import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import routerV1 from "./routes/index.v1.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.disable("x-powered-by")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: "*" }))

app.use(process.env.BASE_URL_V1 as string, routerV1)

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Not Found" })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at port :${port}`)
})

export default app
