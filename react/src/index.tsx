import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {setChonkyDefaults} from 'chonky';
import {ChonkyIconFA} from 'chonky-icon-fontawesome';
import {Settings} from "./components/sections/settings/Settings";
import {PlayerInfoEditor} from "./components/sections/editors/PlayerInfoEditor";
import {LicenceAndPermitPointEditor} from "./components/sections/editors/LicenceAndPermitPointEditor";
import {DateEditor} from "./components/sections/editors/DateEditor";

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
                        <Route path={'licences'} element={<LicenceAndPermitPointEditor/>}/>
                        <Route path={'date'} element={<DateEditor/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
