import { doc, updateDoc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, firebaseDatbase } from "../../../../utility/firebase"
import { User } from "../../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      if (firebaseAuth.currentUser !== null) {
        res.status(200).send(firebaseAuth.currentUser.toJSON())
      } else {
        res.status(400).send("Not Logged In.")
      }
      break;
    }
    case "PUT": {
      try {
        let user: User = req.body.user;
          console.log(JSON.stringify(user))
          const docRef = doc(firebaseDatbase, "Users", user.uid)

          // Cringe 🤓
          if (user.email !== undefined) {
            await updateDoc(docRef, {
              email: user.email,
            });
          }
          // if (user.name !== undefined) {
          //   await updateDoc(docRef, {
          //     name: user.name,
          //   });
          // }
          // if (user.username !== undefined) {
          //   await updateDoc(docRef, {
          //     username: user.username,
          //   });
          // }
          if (user.medicalInfo !== undefined) {
            await updateDoc(docRef, {
              medicalInfo: user.medicalInfo,
            });
          }
          if (user.allergies !== undefined) {
            await updateDoc(docRef, {
              allegeries: user.allergies,
            });
          }
          if (user.profilePic !== undefined) {
            await updateDoc(docRef, {
              profilePic: user.profilePic
            });
          }
          res.status(200).send(docRef.id)
        } catch (e) {
          console.log(e)
          res.status(400).send("Error when updating user details.")
        }
          break;
  }
  }
}
