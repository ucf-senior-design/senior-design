import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import { firebaseDatbase } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = req.query.params
  const teamID = req.query.teamID as string

  switch (req.method) {
    case "GET": {
      // Returns members of a team given a team name or id
      try {
        const docRef = doc(firebaseDatbase, "Teams", teamID)
        const team = await (await getDoc(docRef)).data()
        res.status(200).send(JSON.stringify({ teams: team }))
      } catch (e) {
        res.status(400).send("Error when executing team query.")
      }
      break
    }

    case "PUT": {
      if (
        params === undefined ||
        params.length !== 1 ||
        (!params[0] && params[0] !== "join" && params[0] !== "leave")
      ) {
        res.status(400).send("Invalid Params")
      } else {
        const purpose = params[0] // join | leave
        let userID = req.body
        try {
          const docRef = doc(firebaseDatbase, "Teams", teamID)
          switch (purpose) {
            case "join": {
              await updateDoc(docRef, {
                members: arrayUnion(userID),
              })
              break
            }
            case "leave": {
              await updateDoc(docRef, {
                members: arrayRemove(userID),
              })
              break
            }
          }
          res.status(200).send(docRef.id)
        } catch (e) {
          res.status(400).send("Error when updating team.")
        }
      }
      break
    }

    case "DELETE": {
      if (teamID == undefined || teamID.length == 0) {
        res.status(400).send("tripID is undefined")
      } else {
        firebaseAdmin
          .firestore()
          .collection(`Teams/`)
          .doc(teamID)
          .delete()
          .then(() => {
            res.status(200).send({})
          })
          .catch((e) => {
            res.status(400).send("Could not delete team.")
          })
      }
      break
    }
  }
}
