import { MongoClient } from "mongodb"
import "dotenv/config"

let _db,
	urls_coll,
	users_coll
const mongoConnect = async () => {
	new Promise(async (resolve, reject) => {
		MongoClient.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
		})
			.then(async client => {
				_db = await client.db()
				urls_coll = await _db.collection("urls")
				users_coll = await _db.collection("users")
				resolve()
			})
			.catch(err => {
				reject(err)
			})
	})
		.then(async () => {
			console.log("Databse plugged in and healthy to serve.!")
		})
		.catch(err => {
			console.log("Error connecting to database")
			console.log(err)
		})
}

const urlscoll = async () => {
	if(urls_coll) return urls_coll
	throw "Urls Collection not found"
}

const userscoll = async () => {
	if(users_coll) return users_coll
	throw "Users Collection not found"
}

export {
	 mongoConnect,
	 urlscoll,
	 userscoll
	 }
