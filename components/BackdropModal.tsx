import React from "react"
import { Modal } from "@mui/material"
interface BackdropModalProps {
  isOpen: boolean
  toggleShow: () => void
  children: React.ReactNode
}
/**
 * Creates a modal with a backdrop.
 * @param {boolean} isOpen whether or not modal is visible
 * @param {Function} toggleShow toggles the modal from being visible
 * @param {React.ReactNode} children React element to appear within the modal
 */
export function BackdropModal(props: BackdropModalProps) {
  const { isOpen, toggleShow, children } = props
  return (
    <>
      <Modal
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isOpen}
        onClose={() => {
          toggleShow()
        }}
      >
        <div style={$childrenWrapper}>{children}</div>
      </Modal>
    </>
  )
}

const $childrenWrapper: React.CSSProperties = {
  padding: 10,
}
