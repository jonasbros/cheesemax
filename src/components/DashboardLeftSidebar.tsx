import React, { useState, useEffect } from 'react'
import { firebase, firestore, auth } from './../firebase.config'

import SearchMars from './SearchMars'
import MarsChatList from './MarsChatList'

interface MarsInterface {
    authUID: string;
    createdAt: string;
    displayName: string;
    email: string;
    lastMessageTime: string;
    photoURL: string;
    uid: string;
}


function DashboardLeftSidebar({onClickMarsListItem}: {onClickMarsListItem: Function}) {
    let [marsList, setMarsList] = useState<MarsInterface[]>([])

    useEffect(() => {
        const getMarsChatList = async () => {
            if( auth.currentUser ) {
                let marsListRef = await firestore.collection("mars")
                .orderBy("lastMessageTime", "desc")
                .where("authUID", "==", auth.currentUser.uid)
                .get()
    
                // marsRes.map() doesnt work hmmm
                let marsListData: any = []
                marsListRef.forEach((mars: any) => {
                    marsListData.push({ uid: mars.id ,...mars.data()})
                })

                console.log(marsListData)
                setMarsList(marsListData)
            } 
        }

        getMarsChatList()
    }, [])

    function addMars(mars: any) {
        if( auth.currentUser ) {
            let { serverTimestamp } = firebase.firestore.FieldValue
            let newMars: MarsInterface = {
                authUID: auth.currentUser.uid,
                ...mars,
                lastMessageTime: serverTimestamp()
            }
        
            setMarsList([newMars, ...marsList])
        }
    }

    return (
        <aside className="col-span-1 p-4 bg-blue-300 flex flex-col sticky h-full">
            <SearchMars onAddMars={addMars} />
            <MarsChatList marsList={marsList} onClick={(mars: any) => onClickMarsListItem(mars)} />
        </aside>
    )
}



export default DashboardLeftSidebar