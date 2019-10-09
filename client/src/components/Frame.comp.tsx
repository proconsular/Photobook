import React, { useState } from 'react'

import { connect } from 'react-redux'

import { mergeStyleSets } from '@uifabric/merge-styles'

import { Session } from '../redux/constants/types'
import { sendAction, Actions } from '../redux/constants/actions'

type Children = JSX.Element[] | JSX.Element

const getStyles = () => {
    return mergeStyleSets({
        main: {

        },
        frame: {
            background: "#333",
            color: "#eee",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 24,
            padding: 8,
            paddingLeft: 18,
            paddingRight: 18,
        },
        menu: {
            position: 'relative'
        },
        menuContents: {
            position: 'absolute',
            background: '#555',
            width: 200,
            right: -18,
            marginTop: 8,
            selectors: {
                'button': {
                    padding: 8,
                    paddingLeft: 24,
                    textAlign: 'left',
                    border: 'none',
                    background: 'none',
                    color: "#eee",
                    fontSize: 20,
                    cursor: 'pointer',
                    width: '100%',
                    selectors: {
                        ':hover': {
                            background: '#777'
                        }
                    }
                }
            }
        }
    })
}

const FramePresentor = ({session, signOut, children} : {session: Session, signOut: Function, children: Children}) => {
    const [styles] = useState(getStyles())
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <div className={styles.frame} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                <div>
                    Photobook
                </div>
                {session.online && (
                    <div className={styles.menu}>
                        {session.username}
                        {showMenu && (
                            <div className={styles.menuContents}>
                                <button onClick={() => signOut()}>Sign out</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div onMouseEnter={() => setShowMenu(false)}>
                {children}
            </div>
        </div>
    )
}

const FrameController = ({session, signOut, children} : {session: Session, signOut: Function, children: Children}) => {

    return <FramePresentor session={session} signOut={() => signOut(session.id)}>{children}</FramePresentor>
}

const mts = (state: any) => ({
    session: state.session
})

const mtd = (dispatch: Function) => ({
    signOut: (id: number) => dispatch(sendAction(Actions.REQUEST_SIGNOUT, {id}))
})

export default connect<any, any>(mts, mtd)((props: any) => <FrameController {...props} />)