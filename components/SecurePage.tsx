import { useRouter } from "next/router"
import React from "react"
import { useAuth } from "../utility/hooks/authentication"
import { useScreen } from "../utility/hooks/screen"

/**
 * Helps ensures that users are logged in when visiting pages that require authentication
 */
export default function SecurePage({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<React.ReactNode>(<></>)
  const { user } = useAuth()
  const router = useRouter()
  const { updateErrorToast } = useScreen()

  React.useEffect(() => {
    // Occurs if we haven't attempted to see if the user is logged in.
    if (user === undefined) {
      return
    }

    // Logged in users have a valid uid.
    if (user?.uid.length === 0) {
      updateErrorToast("please login before using the application!")
      router.push("/auth/login")
      return
    }

    // Need to finish adding additional details.
    if (!user.didFinishRegister) {
      updateErrorToast("please finish adding details before using the application!")
      router.push("auth/details")
      return
    }

    // Only allow content to be returned if user is logged in.
    setContent(children)
  }, [user])

  return <>{content}</>
}
