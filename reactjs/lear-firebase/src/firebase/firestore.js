import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy, limit, startAfter, endBefore, endAt, where } from "firebase/firestore"
import { app } from "./firebase"

const db = getFirestore(app)
const COLLECTION = "images"

async function addImage({ title, image, user }) {
    try {
        const result = await addDoc(collection(db, COLLECTION), {
            title, image, createdAt: serverTimestamp(), user
        })
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
async function getImages() {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q)
    return generateImages(querySnapshot)
}
async function getImagesNextPage(current) {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(10), startAfter(current.createdAt));
    const querySnapshot = await getDocs(q)
    return generateImages(querySnapshot)
}
async function getImagesPrevPage(current) {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'asc'), limit(10), startAfter(current.createdAt));
    const querySnapshot = await getDocs(q)
    return generateImages(querySnapshot)
}
async function getUserImages(user) {
    console.log(user);
    const q = query(collection(db, COLLECTION), where("user", "==", user), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q)
    return generateImages(querySnapshot)
}

function generateImages(querySnapshot) {
    const images = []
    querySnapshot.forEach((doc) => {
        images.push(doc.data())
    });
    return images
}
export { addImage, getImages, getImagesNextPage, getImagesPrevPage, getUserImages }