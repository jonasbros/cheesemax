import { firebase, auth, firestore } from './../firebase.config'
//components
import BaseBtn from './BaseBtn'

function SignInPage() {
    return (
        <main className="w-full h-full flex flex-col items-center bg-yellow-200 mx-auto pt-20">
            <img 
                className="animate-bounce"
                src="/logo.png" 
                alt="Cheesemax" 
                height="140" 
                width="140"
            />
            <h1 className="text-6xl text-blue-600 font-bold my-9 uppercase">Cheesemax</h1>
            {SignIn()}
        </main>
    )
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)

        auth.onAuthStateChanged(user => {            
            if( user ) {
                const userRef = firestore.collection('users')
                const { serverTimestamp } = firebase.firestore.FieldValue
                const getUser = userRef.doc(user.uid)
                
                getUser.set({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: serverTimestamp()
                })
            }
        })
    }

    return (
        <BaseBtn 
            onClick={signInWithGoogle}
            btnProps={{
                type: 'button',
                color: 'blue',
                text: 'Sign in with Google'
            }}
        />
    )
}

export default SignInPage
