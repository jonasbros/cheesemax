import React from 'react'
import { auth } from './../firebase.config'

import Avatar from './Avatar'

function Messages({message}: {message: any}) {

    let isAuthMsgOwner = message.senderUID === auth.currentUser!.uid
        
    let msgSide = isAuthMsgOwner ? 'ml-auto' : ''
    let imgOrder = isAuthMsgOwner ? 'float-right' : 'float-left'
    
    let time = message.sendTime && message.sendTime.toDate().toLocaleString('en-US')    
    
    return (
        <li className={`${msgSide} block w-max mb-5`}>
            <Avatar 
                addedClass={`${imgOrder} mx-2`}
                src={ isAuthMsgOwner ? auth.currentUser!.photoURL : message.senderPhoto } 
                alt={ message.displayName } 
                size="small"
            />
            <div className="inline-block rounded-md bg-blue-500 px-3 py-2">
                <p className="text-xs text-white mb-1">{time}</p>
                <p className="text-white">{message.message}</p>
            </div>
        </li>  
    )
    
}


export default Messages
