import { Button, Box } from "@mui/material"
import Link from "next/link"
import React from "react"
export function NavBarButton({
  path,
  text,
  variant,
}: {
  path: string
  text: string
  variant: "text" | "outlined" | "contained"
}) {
  return (
    <Link href={path} passHref>
      <Button
        color={path === "/" ? "landing" : "secondary"}
        variant={variant}
        aria-label={`${text}-button`}
      >
        {text}
      </Button>
    </Link>
  )
}
