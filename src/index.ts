import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import routerV1 from "./routes/index.v1.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.disable("x-powered-by")

// app.use(
//   pino(
//     {
//       level: "info",
//       customLevels: {
//         error: 50,
//         info: 20,
//         debug: 10,
//       },
//       useOnlyCustomLevels: true,
//       formatters: {
//         level: (label) => {
//           return { level: label }
//         },
//       },
//       transport: {
//         target: "pino-pretty",
//         options: {
//           colorize: true,
//           translateTime: "SYS:yyyy-mm-dd hh:MM:ss",
//           ignore: "pid",
//         },
//       },
//     }
//     // pinoms.multistream(streams, {
//     //   levels,
//     //   dedupe: true,
//     // })
//   )
// )

app.use(express.json())
app.use(express.urlencoded())

app.use(cors({ origin: "*" }))

app.use(process.env.BASE_URL_V1 as string, routerV1)

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Not Found" })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at port :${port}`)
})

export default app
