import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth"
import { app } from './firebase'

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

async function doSignIn() {
    try {
        const result = await signInWithPopup(auth, provider)
        return result.user
    } catch (error) {
        console.log(error);
    }
}
async function doSignOut() {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error);
    }
}
async function getCurrentUser() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, user => resolve(user))
    })
}
export { doSignIn, doSignOut, getCurrentUser }
