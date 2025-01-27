import "dotenv/config"
import cors from "cors"
import express from "express"
import authRouter from "./routes/v1/auth.js"
import { mongoConnect } from "./db/mongo.js"
import morgan from "morgan"
import { clientConnect } from "./cache/redis.js"
import cluster from "cluster"
import { cpus } from "os"
import urlRouter from "./routes/v1/url.js"
const app = express()

//Request logger
app.use(morgan("tiny"))

// Third-Party Middleware

app.use(cors())
app.use(express.json({ limit: 100000000 }))


// Built-In Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (cluster.isPrimary) {
	let len = cpus().length
	if (process.env.NODE_ENV !== "production") len = 1
	console.log(`Master ${process.pid} is running`)

	// Fork workers.
	for (let i = 0; i < len; i++) {
		cluster.fork()
	}

	// cluster.on("exit", (worker, code, signal) => {
	// 	console.log(`worker ${worker.process.pid} died`)
	// 	console.log("Let's fork another worker!")
	// 	cluster.fork()
	// })
} else {
	// * Routes * //

	app.use("/v1/auth", authRouter)
	app.use("/v1/url", urlRouter)
	// * Check * //

	app.get("/", (req, res) => {
		res.send("Hello World! " + process.pid)
	})

	// * MQ Connection * //
	setTimeout(async () => {
		//rabbitConnect()
		if (
			process.env?.WORKER_ENABLED &&
			process.env?.WORKER_ENABLED === "true"
		) {
			worker()
		}
	}, 2000)

	// * Redis * //

	// * Redis * //

	// if (process.env.NODE_ENV !== "development") {
	// 	clientConnect()
	// }

	// * Database connection * //
	mongoConnect()

	// * Start * //

	app.listen(parseInt(process.env.PORT), () =>
		console.log(`Server ready to roll on an anonymous port!`)
	)
}
