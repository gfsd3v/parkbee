import React from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { modalSelector, closeModal } from '@/state/modal'

const Modal: React.FC = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(modalSelector)

  const getBtnClass = (color: string | undefined): string => (color ? `btn w-34 btn-${color}` : `btn w-28 btn-primary`)

  const handleClick = () => {
    // Functions are not saved at the redux store after reloading the page
    if (!modalState?.modal?.onAccept) {
      dispatch(closeModal())
      toast.error("Seems like you've reloaded the page at the confirmation screen, please try again")
    } else {
      modalState.modal.onAccept()
    }
  }

  return (
    <>
      {modalState.modal && (
        <div className="modal modal-open">
          <div className="modal-box transform">
            <h1 className="text-center font-semibold text-2xl mb-4">{modalState.modal.title}</h1>
            <p className="text-neutral text-center">{modalState.modal.description}</p>
            <div className="justify-center modal-action">
              <button className="btn min-w-max" onClick={() => dispatch(closeModal())}>
                Cancel
              </button>
              <button className={getBtnClass(modalState.modal.mainButtonColor)} onClick={handleClick}>
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
