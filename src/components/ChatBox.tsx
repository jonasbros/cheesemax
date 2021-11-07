import { useRef } from 'react'
import { firebase, firestore, auth } from './../firebase.config'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import BaseBtn from './BaseBtn'
import Messages from './Messages'
import Avatar from './Avatar'
import SignOut from './SignOut'

function ChatBox({ marsChat }: { marsChat: any }) {
    let textareaVal = useRef<HTMLTextAreaElement | null>(null)

    let authUID = auth.currentUser ? auth.currentUser.uid : ''

    let marsMsgs = firestore.collection("messages")
        .orderBy("sendTime", "asc")
        .where('mars', 'in', [ 
            [authUID, marsChat.uid], [marsChat.uid, authUID] 
        ])
        .limit(30)
    //get data real time and onload
    let [messages] = useCollectionData(marsMsgs, {idField: 'id'})


    function onEnterSendMessage(e: any) {
        if( e.key !== 'Enter' ) return
        sendMessage()
    }

    function sendMessage() {
        if( !auth.currentUser || !textareaVal.current || !textareaVal.current.value || !marsChat ) return

        let { serverTimestamp } = firebase.firestore.FieldValue

        let msgObj = {
            message: textareaVal.current.value,
            senderUID: auth.currentUser.uid,
            mars: [
                auth.currentUser.uid,
                marsChat.uid
            ],
            marsPhoto: marsChat.photoURL,
            senderPhoto: auth.currentUser.photoURL,
            sendTime: serverTimestamp()
        }
        console.log(msgObj)
        firestore.collection('messages').doc().set(msgObj)
        textareaVal.current.value = ''
    }

    return (
        <section className="relative col-span-3 flex flex-col justify-between bg-yellow-100 max-h-screen p-4">
            <div className="flex flex-row items-center w-full h-20 bg-yellow-300 absolute top-0 left-0 px-4 py-5 mb-4">
                <Avatar 
                    src={marsChat.photoURL} 
                    alt={marsChat.displayName}
                />

                <div className="mr-auto ml-3">
                    <p className="font-bold">{marsChat.displayName}</p>
                    <p className="text-sm">{marsChat.email}</p>
                </div>

                <SignOut />
            </div>

            <ul className="bg-white w-full h-full max-h-full bg-white rounded-md p-4 mb-3 mt-20 overflow-y-scroll">
                { messages && messages.map(message => <Messages  key={message.id} message={message}/>) }
            </ul>

            <div className="flex flex-row justify-between items-center w-full">
                <textarea 
                    ref={textareaVal}
                    className="resize-none w-full p-2 mr-3 rounded-md" 
                    rows={3}
                    onKeyUp={(e) => onEnterSendMessage(e)}
                ></textarea>

                <BaseBtn 
                    onClick={sendMessage}
                    btnProps={{
                        type: 'button',
                        color: 'blue',
                        text: 'Send',
                        size: 'fullheight'
                    }}
                />
            </div>            
        </section>
    );
}


export default ChatBox
