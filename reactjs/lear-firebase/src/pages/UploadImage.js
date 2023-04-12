import React, { useEffect, useState } from "react";

function UploadImage({ handleSubmitImage }) {
    const [title, setTitle] = useState("")
    const [fileInput, setFileInput] = useState({ file: null, preview: "" })

    useEffect(() => {
        return () => {
            if (fileInput.preview) {
                console.log('revoke', fileInput.preview);
                URL.revokeObjectURL(fileInput.preview)
            }
        }
    }, [fileInput.preview])
    function handleSubmit(e) {
        e.preventDefault()
        if (!title || !fileInput.file) {
            return
        }
        handleSubmitImage({ image: fileInput.file, title })
        setTitle("")
        setFileInput({ file: null, preview: "" })
    }
    function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) {
            setFileInput({ file: null, preview: "" })
        } else {
            const preview = URL.createObjectURL(e.target.files[0])
            setFileInput({ file, preview })
        }
    }
    return (
        <section>
            <div className="preview">
                {fileInput.preview && <img src={fileInput.preview} alt="preview" />}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input onChange={e => setTitle(e.target.value)} value={title} type="text" name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input onChange={handleFileChange} type="file" name="image" id="image" />
                </div>
                <button type="submit">submit</button>
            </form>
        </section>
    )
}

export default UploadImage