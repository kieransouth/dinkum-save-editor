import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {setChonkyDefaults} from 'chonky';
import {ChonkyIconFA} from 'chonky-icon-fontawesome';
import {Settings} from "./components/sections/settings/Settings";
import {PlayerEditorFields} from "./components/sections/editors/PlayerInfoEditorFields";
import {LicenceAndPermitPointEditorFields} from "./components/sections/editors/LicenceAndPermitPointEditorFields";
import {DateFields} from "./components/sections/editors/DateFields";
import {Editor} from "./components/sections/editors/Editor";
import editorService from "./services/editorService";
import {PlayerInv} from "./models/saves/playerInv";
import {LicenceAndPermitPoint} from "./models/saves/licenceAndPermitPoint";
import {DateSave} from "./models/saves/date";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

setChonkyDefaults({iconComponent: ChonkyIconFA});

const editors = editorService.getEditors();

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App/>}>
                    <Route path={'settings'} element={<Settings/>}/>
                    <Route path={'editors'}>
                        <Route path={'playerInfo'}
                               element={
                                   <Editor<PlayerInv>
                                       {...editors['playerInfo']}
                                       fields={(slot, data, fileName) =>
                                           <PlayerEditorFields
                                               slot={slot}
                                               data={data}
                                               fileName={fileName}
                                           />
                                       }
                                   />
                               }
                        />

                        <Route path={'licences'}
                               element={
                                   <Editor<LicenceAndPermitPoint>
                                       {...editors['licences']}
                                       fields={(slot, data, fileName) =>
                                           <LicenceAndPermitPointEditorFields
                                               slot={slot}
                                               data={data}
                                               fileName={fileName}
                                           />
                                       }
                                   />
                               }
                        />

                        <Route path={'date'}
                               element={
                                   <Editor<DateSave>
                                       {...editors['date']}
                                       fields={(slot, data, fileName) =>
                                           <DateFields
                                               slot={slot}
                                               data={data}
                                               fileName={fileName}
                                           />
                                       }
                                   />
                               }
                        />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
;
