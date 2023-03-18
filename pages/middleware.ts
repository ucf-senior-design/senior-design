import { NextApiResponse, NextApiRequest } from "next"

export default function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://we-tinerary-git-fix-cors-ucf-senior-design.vercel.app/",
  )
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
  )
  res.setHeader("Access-Control-Allow-Credentials", "true")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  next()
}
