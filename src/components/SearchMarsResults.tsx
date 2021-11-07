import React from 'react'
import { firebase, firestore, auth } from './../firebase.config'

import BaseBtn from './BaseBtn'
import Avatar from './Avatar'


function SearchMarsResults({ marsResults, addMarsState }: { marsResults: any, addMarsState: Function }) {
    function addMarsResult(mars: any) {
        addMarsState(mars)
        addMarsFirestore(mars)
    }

    async function addMarsFirestore(mars: any) {
        if( auth.currentUser ) {
            let marsRef = firestore.collection('mars')
            let getUser = marsRef.doc(auth.currentUser.uid + mars.uid)
            let getGetUser = await getUser.get()
            let { serverTimestamp } = firebase.firestore.FieldValue


            let marsData = {
                authUID: auth.currentUser.uid,
                ...mars,
                lastMessageTime: serverTimestamp()
            }

            console.log(getGetUser)

            if( !getGetUser.exists ) {
                getUser.set(marsData)               
            }
        }
    }

    return (
        <div className="absolute px-3 py-4 mt-1 bg-white rounded-md w-full">
            <ul>
                { 
                    marsResults.length ?
                        marsResults.map((mars: any) => 
                            <li key={mars.uid} className="flex flex-row justify-between items-center mb-5 last:mb-0">
                                <Avatar 
                                    src={ mars.photoURL } 
                                    alt={ mars.displayName } 
                                />

                                <div className="mr-auto ml-3">
                                    <p className="font-bold">{mars.displayName}</p>
                                    <p className="text-sm">{mars.email}</p>
                                </div>

                                <BaseBtn 
                                    onClick={()=> addMarsResult(mars)}
                                    btnProps={{
                                        type: 'button',
                                        text: 'Add Mars',
                                        color: 'blue',
                                        size: 'small'
                                    }}
                                />
                            </li>
                        )
                        
                    : <li><p>Mars Not Found...</p></li>
                } 
            </ul>
        </div>
    )
}

export default SearchMarsResults