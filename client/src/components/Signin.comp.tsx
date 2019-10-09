import React, { useState } from 'react'
import { sendAction, Actions } from '../redux/constants/actions'
import { connect } from 'react-redux'

const SiginPresentor = ({submit} : {submit: Function}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                submit(username, password)
            }}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

const SigninController = ({signin} : {signin: Function}) => {

    return <SiginPresentor submit={signin} />
}

const mTs = (state: any) => ({

})

const mTd = (dispatch: any) => ({
    signin: (username: string, password: string) => dispatch(sendAction(Actions.REQUEST_SIGNIN, {username, password}))
})

export default connect<any, any>(mTs, mTd)((props: any) => <SigninController {...props} />)