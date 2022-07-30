import {Slot} from "../models/slot";
import React from "react";
import moment from "moment";

type Props = {
    slot: Slot,
    click: () => void
}

export const SlotChoice: React.FC<Props> = ({slot, click}) => {
    return (
        <div
            className={'w-full border-dinkumGray border-b-8 border-r-8 rounded-xl text-tertiary cursor-pointer'}
            onClick={click}
        >
            <div
                className={'w-full flex flex-row justify-between rounded-md border-8 p-6 border-dinkumBeige hover:border-secondary'}>
                <div className={'flex flex-col gap-2'}>
                    <p className={'text-4xl font-bold'}>{slot.playerName}</p>
                    <p className={'text-2xl'}>{slot.islandName}</p>
                </div>
                <div className={'flex flex-col gap-2 text-right'}>
                    <p className={'text-lg'}>Saved {moment(slot.savedTime).fromNow()}</p>
                    <div className={'flex flex-row items-center gap-2 justify-end'}>
                        <img src={'/dinks.png'} alt={'Dinks'} className={'w-8'}/>
                        <p className={'text-2xl font-bold '}>{slot.money.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}