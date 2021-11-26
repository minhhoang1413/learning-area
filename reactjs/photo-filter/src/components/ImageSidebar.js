import { useState, useEffect, forwardRef } from "react"

const ImageSidebar = ({ handleLoadImage, resetImage, downloadImage }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [imageSrc, setImageSrc] = useState()
    useEffect(() => {
        if (!selectedFile) {
            setImageSrc(null)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setImageSrc(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <div className="">
            <div>
                <label htmlFor="upload">Upload</label>
                <input onChange={onSelectFile} type="file" className="" id="upload" />
            </div>

            {imageSrc
                ? (<>  <img className="preview" onLoad={handleLoadImage} src={imageSrc} />
                    <button onClick={resetImage}>Reset</button>
                    <button onClick={downloadImage}>Download</button>
                </>)
                : null
            }

        </div>
    )
}


export default ImageSidebar