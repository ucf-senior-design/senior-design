import { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.query.user as string
  switch (req.method) {
    case "GET": {
      await firebaseAdmin
        .firestore()
        .collection("Users")
        .where("username", "==", user)
        .get()
        .then((results) => {
          if (results.docs.length === 0) {
            res.status(400).send("User does not exist")
            return
          }
          res.status(200).send(results.docs[0].data())
        })
        .catch((e) => {
          res.status(400).send("Cannot find users at this time.")
        })
    }
  }
}
