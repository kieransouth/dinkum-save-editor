import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {KuiButton} from "./components/kui/KuiButton";

const App = () => {
    const nav = useNavigate();

    return (
        <div className="font-dinkum bg-primary w-full flex flex-row min-h-screen flex-grow">
            <div className={'flex flex-col p-6 bg-accent w-1/6 fixed h-full'}>
                <div className={'flex flex-col gap-12 items-center h-full'}>
                    <div className={'flex flex-col gap-2 max-w-xs items-center'}>
                        <img src={'/dinkum-logo.png'} alt={'Dinkum logo'}/>
                        <p className={'text-right text-primary font-bold text-2xl'}>Save Editor</p>
                    </div>
                    <div className={'flex flex-col w-full h-full justify-between'}>
                        <div className={'w-full flex flex-col gap-4'}>
                            <div
                                className={'text-primary text-2xl font-semibold flex flex-row justify-between items-center gap-4'}>
                                <div className={'border-2 border-primary w-full rounded-md'}></div>
                                <p>Editors</p>
                                <div className={'border-2 border-primary w-full rounded-md'}></div>
                            </div>
                            <KuiButton text={'Edit Player Info'} type={'default'} icon={solid('wrench')}
                                       click={() => nav('editors/player-info')}/>
                            <KuiButton text={'Edit Licences'} type={'default'} icon={solid('wrench')}
                                       click={() => nav('editors/licences')}/>
                            <KuiButton text={'Edit Date'} type={'default'} icon={solid('wrench')}
                                       click={() => nav('editors/date')}/>
                        </div>
                        <div className={'w-full flex flex-col gap-6'}>
                            <KuiButton fw text={'Settings'} icon={solid('cogs')} click={() => nav('settings')}/>
                            <p className={'text-center text-primary'}>Made with <span
                                className={'animate-pulse'}>💖</span> by Spicy#0012</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'w-1/6'}/>
            <div className={'flex flex-col w-5/6'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
