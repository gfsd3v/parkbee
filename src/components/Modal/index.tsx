import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modalSelector, closeModal } from '@/state/modal'

const Modal: React.FC = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(modalSelector)

  const getBtnClass = (color: string | undefined): string => (color ? `btn btn-${color}` : `btn btn-primary`)

  return (
    <>
      {modalState.modal && (
        <div className="modal modal-open">
          <div className="modal-box transform">
            <p>{modalState.modal.description}</p>
            <div className="modal-action">
              <button className={getBtnClass(modalState.modal.mainButtonColor)} onClick={modalState.modal.onAccept}>
                {modalState.modal.mainButtonText || 'Ok'}
              </button>
              <button className="btn" onClick={() => dispatch(closeModal())}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
