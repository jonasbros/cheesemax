import { useState } from 'react'

//components
import DashboardLeftSidebar from './DashboardLeftSidebar'
import ChatBox from './ChatBox'
import SignOut from './SignOut'

function Dashboard() {
    let [marsChat, setMarsChat] = useState(null)

    function showChat(mars: any) {
        console.log(mars)
        setMarsChat(mars)
    }

    return (
        <main className="relative grid grid-cols-4 h-full bg-yellow-100">
            <DashboardLeftSidebar onClickMarsListItem={showChat} />
            
            { marsChat 
                ? <ChatBox marsChat={marsChat}/> 

                : <div className="col-span-3 flex flex-row items-center w-full h-20 bg-yellow-300 px-4">
                    <div className="ml-auto">
                        <SignOut />
                    </div>
                </div>
             }
        </main>
    );
}


export default Dashboard
