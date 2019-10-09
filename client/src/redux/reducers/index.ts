import { combineReducers } from 'redux';

import session from './session'
import feed from './feed'

export default combineReducers({
    session,
    feed,
})