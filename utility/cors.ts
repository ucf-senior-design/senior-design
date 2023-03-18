import { NextApiRequest, NextApiResponse } from "next"

export default function allowCors(
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
): (req: NextApiRequest, res: NextApiResponse) => void {
  return (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://we-tinerary-git-fix-cors-ucf-senior-design.vercel.app/",
    )
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
    )

    if (req.method === "OPTIONS") {
      res.status(200).end()
      return
    }

    handler(req, res)
  }
}
