import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  // This will allow OPTIONS request
  if (method === "OPTIONS") {
    return res.status(200).send("ok")
  }
}
