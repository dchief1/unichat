import React, { useRef, useState, useEffect } from 'react'
import { useHistory  } from 'react-router'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
 
const Chats = () => {
    const history = useHistory()
    const { user } = useAuth()
    const {loading, setLoading} = useState(true)

    console.log(user)

    const handleLogout = async () => {
        await auth.signOut()

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if(!user) {
            history.push('/')

            return
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "bc915856-5e22-49f7-820f-d2237dcfc076",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users',
                       formdata,
                       { headers: {"private-key": "a60de87f-7df7-4372-98fc-02bf4e02ae80"} }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history])

    if(!user || loading) return 'loading... '

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Unichat</div>
                <div onClick={handleLogout} className="logout-tab">Logout</div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="bc915856-5e22-49f7-820f-d2237dcfc076"
                userName={user.email}
                userSecret={user.uid}
             />
        </div>
    )
}

export default Chats
