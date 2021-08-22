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
          <div className="modal-box transform prose">
            <h2 className="text-center">{modalState.modal.title}</h2>
            <p className="text-neutral">{modalState.modal.description}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => dispatch(closeModal())}>
                Close
              </button>
              <button className={getBtnClass(modalState.modal.mainButtonColor)} onClick={modalState.modal.onAccept}>
                {modalState.modal.mainButtonText || 'Ok'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
