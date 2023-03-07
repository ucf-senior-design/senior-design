import React from "react"

export default function useNavBar() {
  const [open, setOpen] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  function toggleMenu() {
    setOpen((prevOpen) => !prevOpen)
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  const handleMenuClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  return {
    open,
    mobileOpen,
    handleMenuClose,
    handleListKeyDown,
    toggleMenu,
    handleDrawerToggle,
    anchorRef,
  }
}
