import React, { useState } from 'react'
import { sendAction, Actions } from '../redux/constants/actions'
import { connect } from 'react-redux'

const SignupPresentor = ({submit} : {submit: Function}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (username.length > 0 && password === confirmPassword) {
                    submit(username, password)
                }
            }}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Retype Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

const SignupController = ({signup} : {signup: Function}) => {

    return <SignupPresentor submit={signup} />
}

const mTs = (state: any) => ({

})

const mTd = (dispatch: any) => ({
    signup: (username: string, password: string) => dispatch(sendAction(Actions.REQUEST_SIGNUP, {username, password}))
})

export default connect<any, any>(mTs, mTd)((props: any) => <SignupController {...props} />)