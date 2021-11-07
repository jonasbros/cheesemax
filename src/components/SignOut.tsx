import React from 'react'
import { auth } from './../firebase.config'

import BaseBtn from './BaseBtn'

function SignOut() {
    return auth.currentUser && (
        <BaseBtn 
            onClick={() => auth.signOut()}
            btnProps={{
                type: 'button',
                color: 'blue',
                text: 'Sign out',
                size: 'small'
            }}
        />
    )
}

export default SignOut