import { useScreen } from "../screen"
import { useTrip } from "../trip"

export default function useCreateWeather() {
  const { createWeather } = useTrip()
  const { updateErrorToast } = useScreen()

  async function create(callback: (isSuccess: boolean) => void) {
    await createWeather((response) => {
      if (response.isSuccess) {
        callback(true)
      } else {
        updateErrorToast(response.errorMessage)
      }
    })
  }

  return { create }
}
