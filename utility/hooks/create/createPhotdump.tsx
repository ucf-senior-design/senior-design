import React from "react"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export default function useCreatePhotodump() {
//   const { createPhotodump } = useTrip()
  const { updateErrorToast } = useScreen()
  const [albumURL, updateAlbumURL] = React.useState<string>()

  async function create(callback: (isSuccess: boolean) => void) {
    if (albumURL === undefined) {
      updateErrorToast("A valid link to the google photos shared album must be provided")
      return
    }

    // await createPhotodump(albumURL, (response: Response) => {
    //   if (response.isSuccess) {
    //     callback(true)
    //   } else {
    //     updateErrorToast(response.errorMessage)
    //   }
    // })
  }

  return { create, albumURL, updateAlbumURL}
}
