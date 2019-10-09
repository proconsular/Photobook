import React, { useState } from 'react'
import { connect } from 'react-redux'
import { mergeStyleSets } from '@uifabric/merge-styles'
import { sendSecureAction, Actions } from '../redux/constants/actions'
import { Session } from '../redux/constants/types'

const getStyles = () => {
    return mergeStyleSets({
        panel: {
            background: '#bbb',
            padding: 24,
            border: '2px solid #999',
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: 4,
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            
            selectors: {
                'input:not([type="files"]), textarea': {
                    marginBottom: 8,
                    fontSize: 24,
                    boxSizing: 'border-box',
                    // padding: 8,
                    border: 'none',
                    fontFamily: 'times',
                    background: 'none',
                    borderBottom: '1px solid #333'
                },
                'button': {
                    fontSize: 24,
                    border: 'none',
                    padding: 8,
                }
            }
        }
    })
}

const PhotoFormPresentor = ({session, submit}: {session: Session, submit: Function}) => {
    const [styles] = useState(getStyles())
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [files, setFiles] = useState()

    return (
        <div className={styles.panel}>
            <form className={styles.form} onSubmit={e => {
                e.preventDefault()
                if (name.length > 3) {
                    submit(name, description, session.id, files[0])
                    setName("")
                    setDescription("")
                    setFiles([])
                }
            }}>
                <input type='text' value={name} placeholder='Name' onChange={e => setName(e.target.value)} />
                <textarea value={description} placeholder='Description' onChange={e => setDescription(e.target.value)} ></textarea>

                <input type='file' onChange={e => setFiles(e.target.files)} />

                <button>Post</button>
            </form>
        </div>
    )
}

const PhotoFormController = ({session, sendPost} : {session: Session, sendPost: Function}) => {

    return <PhotoFormPresentor session={session} submit={sendPost} />
}

const mts = (state: any) => ({
    session: state.session
})

const mtd = (dispatch: Function) => ({
    sendPost: (name: string, description: string, owner: number, file: Blob) => dispatch(sendSecureAction(Actions.SEND_POST, {name, description, owner, file}))
})

export default connect<any, any>(mts, mtd)((props: any) => <PhotoFormController {...props} />)