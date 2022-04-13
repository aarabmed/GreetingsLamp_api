const express = require("express");
const router = express.Router();
const fs = require('fs')

router.get("/:title", async(req,res,next)=>{
    const title = req.params.title //home-banner-video
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const isMp4 = title.split('-').includes('mobile')
    const videoPath = isMp4?`./videos/${title}.mp4`:`./videos/${title}.webm`
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = (10 ** 5)/2
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/webm",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
});

module.exports = router;