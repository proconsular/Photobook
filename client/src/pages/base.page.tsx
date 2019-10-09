import React, { useState } from 'react'

import { mergeStyleSets } from '@uifabric/merge-styles'

type Children = JSX.Element[] | JSX.Element

const getStyles = () => {
    return mergeStyleSets({
        base: {
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 12,
            fontSize: 28,
            color: '#222',
        }
    })
}

export const Base = ({children} : {children: Children}) => {
    const [styles] = useState(getStyles())

    return (
        <div className={styles.base}>
            {children}
        </div>
    )
}