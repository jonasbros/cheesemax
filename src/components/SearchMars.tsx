import { useState } from 'react'
import BaseInput from './BaseInput'
import SearchMarsResults from './SearchMarsResults'

import { firestore, auth } from './../firebase.config'

function SearchMars() {
    let [showSearchMarsResults, setShowSearchMarsResults] = useState(false)
    let [marsResults, setMarsResults] = useState([])

    async function searchMars({value}: {value: string}) {
        if( value ) {
            let marsRes = await firestore.collection("users")
                            .where('email', '!=', auth.currentUser!.email)
                            .orderBy("email", "asc")
                            .startAt(value)
                            .endAt(value+"\uf8ff")
                            .get()

            // marsRes.map() doesnt work hmmm
            let marsResData: any = []
            marsRes.forEach((mars) => {
                marsResData.push({ uid: mars.id ,...mars.data()})
            })

            setMarsResults(marsResData)
            setShowSearchMarsResults(showSearchMarsResults = true)
        }else {
            hideMarsResults()
        }
    }

    function hideMarsResults() {
        setShowSearchMarsResults(showSearchMarsResults = false)
    }

    function onAddMarsHideResults() {
        hideMarsResults()
    }

    return (
        <div className="mb-3 text-gray-700 relative">
            <BaseInput
                onDebouncedInput={searchMars}
                onInput={hideMarsResults}
                onClick={searchMars}
                onBlur={hideMarsResults}
                inputProps={{
                    type: "text",
                    labelHidden: true,
                    required: false,
                    label: 'Search Mars Email... '
                }}
            />
            {showSearchMarsResults && <SearchMarsResults marsResults={marsResults} onAddMars={onAddMarsHideResults}/>}
        </div>
    )
}


export default SearchMars