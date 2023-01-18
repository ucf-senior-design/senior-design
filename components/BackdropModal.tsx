import React from 'react';
import { Modal } from '@mui/material';
interface BackdropModalProps {
  isOpen: boolean;
  toggleShow: () => void;
  children: React.ReactNode;
}
/**
 * Creates a modal with a backdrop.
 * @param {boolean} isVisible whether or not modal is visible
 * @param {Function} toggleShow toggles the modal from being visible
 * @param {React.ReactNode} children React element to appear within the modal
 */
export function BackdropModal(props: BackdropModalProps) {
  const { isOpen, toggleShow, children } = props;
  return (
    <>
      <Modal open={isOpen} onClose={() => toggleShow()}>
        <div style={$childrenWrapper}>{children}</div>
      </Modal>
    </>
  );
}

const $childrenWrapper: React.CSSProperties = {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: 10,
  width: '100%',
};
