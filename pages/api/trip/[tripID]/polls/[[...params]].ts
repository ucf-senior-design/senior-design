import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"
import { Poll } from "../../../../../utility/types/trip"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = req.query.params
  const tripID = req.query.tripID as string

  function getVoteDetails() {
    if (params === undefined || params?.length !== 3) {
      return { error: true, pollID: "", index: 0 }
    }
    return { error: false, pollID: params[1], index: parseInt(params[2]) }
  }

  function getPollDetails() {
    if (params === undefined || params?.length !== 1) {
      return { error: true, pollID: "" }
    }
    return { error: false, pollID: params[0], index: parseInt(params[1]) }
  }

  switch (req.method) {
    case "POST": {
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/polls`)
        .add(req.body)
        .then(async (value) => {
          const id = (await value.get()).id
          const data = (await value.get()).data()
          res.status(200).send({ uid: id, ...data })
        })
        .catch(() => {
          res.status(400).send("Could not create poll.")
        })
      break
    }

    case "GET": {
      if (params === undefined) {
        await firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/polls`)
          .get()
          .then((value) => {
            const polls = unpackArrayResponse(value.docs)
            res.status(200).send({ data: polls })
          })
          .catch((e) => {
            res.status(400).send("Error getting polls")
          })
      } else {
        await firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/polls/${params[0]}`)
          .get()
          .then((value) => {
            const polls = unpackArrayResponse(value.docs)

            res.status(200).send(polls)
          })
          .catch((e) => {
            res.status(400).send("Error getting polls")
          })
      }

      break
    }

    case "PUT": {
      const { error, pollID, index } = getVoteDetails()
      if (error) {
        res.status(400).send("Missing Poll ID")
        return
      }

      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/polls`)
        .doc(pollID)
        .get()
        .then(async (doc) => {
          let docData = doc.data() as Poll

          docData.options[index].voters.push(req.body.uid)

          await doc.ref.update(docData).then(() => {
            res.status(200).send({})
            return
          })
        })
        .catch((e) => {
          console.log("error 2", e)
          res.status(400).send(e)
        })

      break
    }

    case "DELETE": {
      const { error, pollID } = getPollDetails()
      if (error) {
        res.status(400).send("Missing Poll ID")
        return
      }

      firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/polls`)
        .doc(pollID)
        .delete()
        .then(() => {
          res.status(200).send({})
        })
        .catch((e) => {
          res.status(400).send("Could not create poll.")
        })
    }
  }
}
