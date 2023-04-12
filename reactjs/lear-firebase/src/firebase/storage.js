import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { app } from "./firebase"

const storage = getStorage(app)

async function uploadImage(file) {
    try {
        const storageRef = ref(storage, file.name);
        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)
        return url
    } catch (error) {
        console.log(error);
    }
}

export { uploadImage }