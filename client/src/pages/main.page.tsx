import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { sendStore, Actions, sendAction } from '../redux/constants/actions'
import { Session } from '../redux/constants/types'
import SignupComp from '../components/Signup.comp'
import SigninComp from '../components/Signin.comp'

import Frame from '../components/Frame.comp'
import { Base } from './base.page'
import { FeedPage } from './feed.page'

const Main = ({session, loadSession, signout} : {session: Session, loadSession: Function, signout: Function}) => {
    const [showSignUp, setShowSignUp] = useState(false)

    useEffect(() => {
        if (session.id === 0) {
            loadSession()
        }
    }, [session.id])

    return (
        <Frame>
            {session.online ? (
                <Base>
                    <FeedPage />
                </Base>
            ) : (
                <div>
                    <div>
                        {showSignUp ? (
                            <SignupComp />
                        ) : (
                            <SigninComp />
                        )}
                    </div>
                    <div>
                        <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? "Already have an account?" : "Need an account?"}</button>
                    </div>
                </div>
            )}
        </Frame>
    )
}

const mTs = (state: any) => ({
    session: state.session
})

const mTd = (dispatch: Function) => ({
    loadSession: () => dispatch(sendStore(Actions.LOAD_SESSION)),
    signout: (id: number) => dispatch(sendAction(Actions.REQUEST_SIGNOUT, {id}))
})

export default connect<any, any>(mTs, mTd)((props: any) => <Main {...props} />)