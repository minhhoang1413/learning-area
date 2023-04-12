import React from "react";

function Modal({ selectedImage, isOpenModal, closeModal }) {

    if (!isOpenModal) {
        return null
    }
    return (
        <section className="modal-section">
            <div className="modal">
                <div className="modal-top">
                    <div>
                        <h3>{selectedImage.title}</h3>
                        <p>{selectedImage.user}</p>
                        <small>{new Date(selectedImage.createdAt.seconds * 1000).toDateString()}</small>
                    </div>
                    <button onClick={closeModal}>x</button>
                </div>
                <div className="modal-center">
                    <img src={selectedImage.image} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Modal