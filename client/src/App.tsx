import React from 'react';
import './App.css';
import ProviderWrapper from './components/ProviderWrapper';
import { getStore } from './redux/store';

import Main from './pages/main.page'

export default () => (
    <ProviderWrapper store={getStore()}>
        <Main />
    </ProviderWrapper>
)