import QRCode from "qrcode"
import { urlscoll } from "../db/mongo.js"
import { createShortUrlSchema } from "../models/urls.js"

const createShortUrl = async (url, customSlug) => {
	return new Promise(async (resolve, reject) => {
		const urls_coll = await urlscoll()
		QRCode.toDataURL(url)
			.then(async qrCode => {
                console.log('qrCode:', qrCode)
				if (customSlug === null) {
					const chars =
						"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
					let result = ""
					for (let i = 0; i < length; i++) {
						result += chars.charAt(
							Math.floor(Math.random() * chars.length)
						)
					}
					customSlug = result
				}
				let data = await createShortUrlSchema(url, customSlug, qrCode)
				urls_coll
					.insertOne(data)
					.then(async response => {
						let resp = {
							success: true,
							error: false,
							code: 200,
							shortUrl: "test",
							qrCode: qrCode,
						}
						resolve(resp)
					})
					.catch(err => {
						let resp = {
							success: false,
							error: true,
							code: 400,
							message: err.message,
						}
						reject(resp)
					})
			})
			.catch(err => {
				let resp = {
					success: false,
					error: true,
					code: 400,
					message: err.message,
				}
				reject(resp)
			})
	})
}

export { createShortUrl as createShortUrlHelper }
