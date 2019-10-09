import React, { useState } from 'react'

import { mergeStyleSets } from '@uifabric/merge-styles'
import { Photo, Session } from '../redux/constants/types'
import { sendSecureAction, Actions } from '../redux/constants/actions'
import { connect } from 'react-redux'

const getStyles = () => {
    return mergeStyleSets({
        post: {
            background: '#ddd',
            color: '#333',
            padding: 0,
            paddingTop: 2,
            borderRadius: 4,
            border: '1px solid #bbb',
            selectors: {
                'div': {
                    marginBottom: 2,
                    selectors: {
                        ':last-child': {
                            marginBottom: 0,
                        }
                    }
                }
            }
        },
        name: {
            fontSize: 14,
            paddingLeft: 8,
            textAlign: 'center',
        },
        description: {
            fontSize: 14,
            marginTop: 4,
            paddingLeft: 12,
            paddingRight: 12,
            paddingBottom: 2,
            marginLeft: 'auto',
            marginRight: 'auto',
            selectors: {
                'textarea': {
                    width: '100%',
                    border: 'none',
                    boxSizing: 'border-box',
                    padding: 4,
                    maxWidth: '100%',
                    minWidth: '100%',
                    minHeight: 30,
                    fontSize: 14,
                }
            }
        },
        frame: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderTop: '1px solid #bbb',
            borderBottom: '1px solid #bbb',
            boxSizing: 'border-box',
        },
        picture: {
            width: '100%',
            display: 'block',
        },
        title: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            selectors: {
                'input': {
                    border: 'none',
                    background: 'none',
                    borderBottom: '1px solid #333',
                    boxSizing: 'border-box',
                    fontSize: 14,
                    width: '400px',
                }
            }
        },
        options: {
            paddingRight: 4,
            display: 'flex',
            selectors: {
                'button': {
                    userFocus: 'none',
                    userSelect: 'none',
                    border: 'none',
                    background: '#333',
                    color: '#fff',
                    borderRadius: 4,
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    cursor: 'pointer',
                    marginRight: 6,
                    selectors: {
                        ':last-child': {
                            marginRight: 0,
                        },
                        ':hover': {
                            background: '#3ee',
                        },
                        ':last-child:hover': {
                            background: '#e33',
                        },
                        'i': {
                            fontSize: 18,
                            padding: 0,
                            margin: 0,
                        }
                    }
                }
            }
        }
    })
}

interface PostProps {
    photo: Photo
    session: Session
    edit: Function
    remove: Function
}

const Post = (props: PostProps) => {
    const [styles] = useState(getStyles())
    const [edit, setEdit] = useState(false)

    const [name, setName] = useState(props.photo.name)
    const [description, setDescription] = useState(props.photo.description)

    const username = (props.photo.user && props.photo.user.username) || ""
    return (
        <div className={styles.post}>
            <div className={styles.title}>
                <div className={styles.name}>
                    {username ? `${username} - ` : ''}{edit ? (
                        <input type='text' value={name} onChange={e => setName(e.target.value)} />
                    ):(
                        props.photo.name
                    )}
                </div>
                {props.photo.user && props.session.id === props.photo.user.id && (
                    <div className={styles.options}>
                        <button onClick={() => {
                            if (edit) {
                                props.edit(props.photo.id, name, description)
                            }
                            setEdit(!edit)
                        }}>
                            <i className="material-icons">create</i>
                        </button>
                        <button onClick={() => {
                            if (window.confirm("Are you sure?")) {
                                props.remove(props.photo.id)
                            }
                        }}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.frame}>
                <img className={styles.picture} src={`/api/photos/${props.photo.id}?type=view`} />
            </div>
            <div className={styles.description}>
                {edit ? (
                    <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                ):(
                    props.photo.description
                )}
            </div>
            
        </div>
    )
}

const PostController = (props: PostProps) => {

    return <Post {...props} />
}

const mts = (state: any) => ({
    session: state.session
})

const mtd = (dispatch: Function) => ({
    edit: (id: number, name: string, description: string) => dispatch(sendSecureAction(Actions.REQUEST_POST_EDIT, {id, name, description})),
    remove: (id: number) => dispatch(sendSecureAction(Actions.REQUEST_POST_DELETE, {id})),
})

export default connect<any, any>(mts, mtd)((props: any) => <PostController {...props} />)