import { NextApiRequest, NextApiResponse } from "next"
import * as GooglePhotosAlbum from "google-photos-album-image-url-fetch"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await GooglePhotosAlbum.fetchImageUrls(req.body.url)
    .then((results) => {
      res.status(200).send({ data: results })
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send("Cannot get images.")
    })
}
