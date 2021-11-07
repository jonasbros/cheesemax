import { firestore, auth } from './../firebase.config'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import SearchMars from './SearchMars'
import MarsChatList from './MarsChatList'


function DashboardLeftSidebar({onClickMarsListItem}: {onClickMarsListItem: Function}) {
    let marsListRef = firestore.collection("mars")
        .orderBy("lastMessageTime", "asc")
        .where('mars', 'array-contains', auth.currentUser!.uid)

    let [marsList] = useCollectionData(marsListRef, {idField: 'id'})
    let formattedMarsList: any = []

    if( marsList?.length ) {
        formattedMarsList = marsList?.map((mars, i, list) => {
            let marsUID = mars.mars.filter((uid: string) => uid != auth.currentUser!.uid)[0]
            let marsInfo = list[i][marsUID]

            return { uid: marsUID, displayName: marsInfo.displayName, email: marsInfo.email, photoURL: marsInfo.photoURL }
        })
    }

    return (
        <aside className="col-span-1 p-4 bg-blue-300 flex flex-col sticky h-full max-h-full">
            <SearchMars />
            <MarsChatList marsList={formattedMarsList} onClick={(mars: any) => onClickMarsListItem(mars)} />
        </aside>
    )
}



export default DashboardLeftSidebar