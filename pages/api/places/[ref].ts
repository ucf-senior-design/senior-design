import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ref = req.query.ref as string
  const APIKey =
    process.env.REACT_APP_FIREBASE_PLACES_KEY !== undefined
      ? process.env.REACT_APP_FIREBASE_PLACES_KEY
      : process.env.NEXT_PUBLIC_PLACES_KEY
  await axios
    .get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ref}&key=${APIKey}`)
    .then(async (response) => {
      if (response.status === 200) {
        res.status(200).send(response.data.result.photos[0].photo_reference)
      }
    })
    .catch(() => {
      res.status(400).send({})
    })
}
