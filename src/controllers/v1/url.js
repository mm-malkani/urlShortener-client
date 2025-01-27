import { success } from "../../configs/response.js"
import { createShortUrlHelper } from "../../helpers/urls.js"

const createShortUrl = async (req, res) => {
	const url = req.body.url
	const customSlug = req.query?.customSlug || null
    console.log('url:', url)
    console.log('customSlug:', customSlug)
	createShortUrlHelper(url, customSlug).then(async result => {
		const { shortUrl, qrCode } = result;

        // Extract the base64 data from the QR code
        const qrCodeBase64 = qrCode.split(',')[1]; // Remove the "data:image/png;base64," part

        // Convert base64 string into a buffer
        const qrCodeBuffer = Buffer.from(qrCodeBase64, 'base64');

        // Set the response headers and send the image
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': qrCodeBuffer.length,
        });

        res.end(qrCodeBuffer);
    })
    .catch(error => {
        console.error('Error creating short URL:', error);
        res.status(500).json({ message: 'Error creating short URL', error });
    });
}

export { createShortUrl }
