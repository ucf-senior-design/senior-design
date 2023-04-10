import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"
import { UserAvailabillity } from "../../../../../utility/types/trip"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripID = req.query.tripID as string
  const user = firebaseAuth.currentUser

  if (user === null) {
    res.status(400).send("Please login before using this endpoint.")
    return
  }
  /**
   * Creates an availabillity widget
   * @param {string} req.body.title purpose of availabillity widget
   * @param {Array<UserAvailabillity>} req.body.dates availabillity dates of user.
   */
  switch (req.method) {
    case "POST": {
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/availabillity`)
        .add({
          owner: user.uid,
          title: req.body.title,
        })
        .then(async (value) => {
          const id = (await value.get()).id
          await value
            .collection("users")
            .doc(user.uid)
            .set({
              dates: req.body.dates,
            })
            .then(() => {
              res.status(200).send({ uid: id, ...req.body })
              return
            })
            .catch((e) => res.status(400).send(e))
        })
        .catch((e) => {
          res.status(400).send(e)
        })
      break
    }

    /**
     * Gets all availabillity widgets for a trip.
     */
    case "GET": {
      try {
        let value = await firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/availabillity`)
          .get()

        let availabillityWidgets = unpackArrayResponse(value.docs)

        let widgetPromises: Array<
          Promise<firebaseAdmin.firestore.QuerySnapshot<firebaseAdmin.firestore.DocumentData>>
        > = []
        availabillityWidgets.forEach(async (a, index) => {
          widgetPromises.push(
            firebaseAdmin
              .firestore()
              .collection(`Trips/${tripID}/availabillity/${a.uid}/users`)
              .get(),
          )
        })

        Promise.all(widgetPromises).then((availabillities) => {
          let widgetData: Array<any> = []

          for (let i = 0; i < availabillities.length; i++) {
            widgetData.push({
              ...availabillityWidgets[i],
              availabillities: unpackArrayResponse(availabillities[i].docs),
            })
          }

          res.status(200).send({
            data: widgetData,
          })
        })
      } catch (e) {
        res.status(400).send(e)
      }

      break
    }
  }
}
