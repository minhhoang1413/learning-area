import React, { useState } from "react";
import Modal from "./Modal";

function Gallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    function handleClick(img) {
        setSelectedImage(img)
        setIsOpenModal(true)
    }
    function closeModal() {
        setIsOpenModal(false)
    }
    return (
        <section className="gallery">
            <Modal selectedImage={selectedImage} isOpenModal={isOpenModal} closeModal={closeModal} />
            {images.map(img =>
                <div key={img.image} className="card" onClick={() => handleClick(img)}>
                    <img src={img.image} alt={img.title} />
                    <div className="card-body">
                        <span>{img.title}</span>
                        <span>{img.user}</span>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Gallery