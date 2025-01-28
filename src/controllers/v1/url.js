import { error, success } from "../../configs/response.js"
import { createShortUrlHelper } from "../../helpers/urls.js"

// const createShortUrl = async (req, res) => {
// 	const url = req.body.url
// 	const customSlug = req.query?.customSlug || null
//     console.log('url:', url)
//     console.log('customSlug:', customSlug)
// 	createShortUrlHelper(url, customSlug).then(async result => {
// 		const { shortUrl, qrCode } = result;

//         // Extract the base64 data from the QR code
//         const qrCodeBase64 = qrCode.split(',')[1]; // Remove the "data:image/png;base64," part

//         // Convert base64 string into a buffer
//         const qrCodeBuffer = Buffer.from(qrCodeBase64, 'base64');

//         // Set the response headers and send the image
//         res.writeHead(200, {
//             'Content-Type': 'image/png',
//             'Content-Length': qrCodeBuffer.length,
//         });

//         res.end(qrCodeBuffer);
//     })
//     .catch(error => {
//         console.error('Error creating short URL:', error);
//         res.status(500).json({ message: 'Error creating short URL', error });
//     });
// }

const createShortUrl = async (req, res) => {
    const url = req.body.url
    const customSlug = req.query?.customSlug || null
    let generateQR = req.query?.generateQR || false
    if(generateQR === true) {
        createUrlAndQrCodeHelper(url, customSlug)
            .then(async result => {
                res.status(200).json(
                    success(
                        "Short URL created successfully",
                        {
                            data: {
                                url: result.shortUrl,
                                qrCode: result.qrCode
                            }
                        },
                        res.statusCode
                    )
                )
            })
            .catch(err => {
                res.status(err?.code || 500).json(
                    error(
                        "Error shortening URL",
                        {
                            error: err?.message || "Internal server error"
                        },
                        res.statusCode
                    )
                )
            })
    } else {

    }
}

const createBulkUrls = async (req, res) => {

}



export { createShortUrl }
