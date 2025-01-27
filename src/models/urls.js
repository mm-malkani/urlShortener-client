const createShortUrl = async (url, customSlug, qrCode) => {
        let data = {
            createdAt: new Date(),
            url: url,
            shortUrl: `sampleShortUrl\`${customSlug}`,
            customSlug: customSlug,
            qrCode: qrCode,
        }
        return data
}

export {
    createShortUrl as createShortUrlSchema
}