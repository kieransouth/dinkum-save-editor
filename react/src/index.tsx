import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {setChonkyDefaults} from 'chonky';
import {ChonkyIconFA} from 'chonky-icon-fontawesome';
import {Settings} from "./components/sections/settings/Settings";
import {PlayerInfoEditor} from "./components/sections/editors/PlayerInfoEditor";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

setChonkyDefaults({iconComponent: ChonkyIconFA});

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App/>}>
                    <Route path={'settings'} element={<Settings/>}/>
                    <Route path={'editors'}>
                        <Route path={'player-info'} element={<PlayerInfoEditor/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
