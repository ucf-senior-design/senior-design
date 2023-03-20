import { doc, getDoc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import { firebaseDatbase } from "../../../../../utility/firebase"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.query.user as string
  switch (req.method) {
    case "GET": {
        try {
            const docRef = doc(firebaseDatbase, "Users", user)
            const userData = await (await getDoc(docRef)).data()
            res.status(200).send(JSON.stringify(userData))
        } catch (e) {
            res.status(400).send("Error when executing team query.")
        }
        break
    }
  }
}
