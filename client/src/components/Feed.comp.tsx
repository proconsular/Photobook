import React, { useEffect, useState } from 'react'
import { Photo, Session } from '../redux/constants/types'
import Post from './Post.comp'
import { sendAction, Actions, sendSecureAction } from '../redux/constants/actions'
import { connect } from 'react-redux'
import { mergeStyleSets } from '@uifabric/merge-styles'

const getStyles = () => {
    return mergeStyleSets({
        feed: {
            marginTop: 24,
            selectors: {
                'div': {
                    marginBottom: 24,
                }
            }
        }
    })
}

interface PresentorProps {
    session: Session,
    posts: Photo[]
}

const FeedPresentor = ({session, posts}: PresentorProps) => {
    const [styles] = useState(getStyles())

    return (
        <div className={styles.feed}>
            {posts && posts.sort((a, b) => {
                if (a.id < b.id)
                    return 1
                if (a.id > b.id)
                    return -1
                return 0
            }).map(post => {
                return <Post key={post.id} {...{photo: post}} />
            })}
        </div>
    )
}

interface ConProps {
    session: Session
    posts: {[index: number]: Photo}
    getPosts: Function
}

const FeedController = ({session, posts, getPosts}: ConProps) => {
    
    useEffect(() => {
        getPosts(0, 10)
    }, [])

    return <FeedPresentor session={session} posts={Object.values(posts)} />
}

const mts = (state: any) => ({
    session: state.session,
    posts: state.feed,
})

const mtd = (dispatch: Function) => ({
    getPosts: (offset: number, count: number) => dispatch(sendSecureAction(Actions.REQUEST_POSTS, {offset, count}))
})

export default connect<any, any>(mts, mtd)((props: any) => <FeedController {...props} />)