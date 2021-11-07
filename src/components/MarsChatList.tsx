import React from 'react'
import Avatar from './Avatar'

interface MarsInterface {
    authUID: string;
    createdAt: string;
    displayName: string;
    email: string;
    lastMessageTime: string;
    photoURL: string;
    uid: string;
}

//components
function MarsChatList({ marsList, onClick }: { marsList: any, onClick: Function }) {
    return (
        <div className="w-full h-full rounded-md bg-blue-200 shadow-inner overflow-hidden">
            <ul>
                { 
                    marsList.map( (mars: MarsInterface) =>
                        <li 
                            key={mars.uid} 
                            className="flex flex-row justify-between items-center mb-0.5 last:mb-0 p-3 bg-white"
                            onClick={() => onClick(mars)}
                        >
                            <Avatar 
                                src={mars.photoURL} 
                                alt={mars.displayName}
                            />

                            <div className="mr-auto ml-3">
                                <p className="font-bold">{mars.displayName}</p>
                                <p className="text-sm">{mars.email}</p>
                            </div>
                        </li> 
                    )
                }
            </ul> 
        </div>  
    );
}


export default MarsChatList
