import React from 'react'

import PhotoForm from '../components/Photo.form'
import FeedComp from '../components/Feed.comp'

export const FeedPage = () => {

    return (
        <div>
            <div>
                <PhotoForm />
            </div>
            <div>
                <FeedComp />
            </div>
        </div>
    )
}