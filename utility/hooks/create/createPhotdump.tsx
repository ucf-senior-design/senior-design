import React from "react"
import CreatePhotoDump from "../../../components/Create/CreatePhotoDump"
import { useScreen } from "../screen"
import { useTrip } from "../trip"

export default function useCreatePhotodump() {
  //   const { createPhotodump } = useTrip()
  const { updateErrorToast } = useScreen()
  const { createPhotoDump } = useTrip()
  const [albumURL, updateAlbumURL] = React.useState<string>()

  async function create(callback: (isSuccess: boolean) => void) {
    if (albumURL === undefined) {
      updateErrorToast("A valid link to the google photos shared album must be provided")
      return
    }

    createPhotoDump(albumURL, (isSuccess) => {
      callback(true)
    })
  }

  return { create, albumURL, updateAlbumURL }
}
