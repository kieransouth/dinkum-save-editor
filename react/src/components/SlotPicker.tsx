import React, {useEffect, useState} from "react";
import {Slot} from "../models/slot";
import slotService from "../services/slotService";
import moment from "moment";
import {KuiSelect} from "./kui/KuiSelect";
import {SlotChoice} from "./SlotChoice";
import {KuiSpinner} from "./kui/KuiSpinner";
import {KuiNotice} from "./kui/KuiNotice";
import {KuiButton} from "./kui/KuiButton";

type Props = {
    slotPicked: (slot: Slot | undefined) => void,
}

export const SlotPicker: React.FC<Props> = ({slotPicked}) => {
    const [slots, setSlots] = useState<Slot[]>();
    const [slot, setSlot] = useState<Slot>();

    useEffect(() => {
        slotService
            .getSlots()
            .then(setSlots);
    }, []);

    useEffect(() => {
        if (!slots || slots.length === 0) {
            return;
        }

        setSlot(slots[0]);
    }, [slots]);

    useEffect(() => slotPicked(slot), [slot]);

    if (!slots) {
        return <KuiSpinner/>
    }

    if (slots.length === 0) {
        return (
            <KuiNotice type={'error'}>Sorry - no slots found. Please check your settings.</KuiNotice>
        )
    }

    if (!slot) {
        return (
            <div className={'bg-dinkumBeige p-6 gap-6 flex flex-col rounded-md'}>
                <p className={'text-tertiary text-4xl'}>Select a save</p>
                {slots.map((slot, key) => (<SlotChoice key={key} slot={slot} click={() => setSlot(slot)}/>))}
            </div>
        )
    }

    return (
        <div className={'bg-dinkumBeige p-6 gap-6 flex flex-col rounded-md'}>
            <div className={'flex flex-row items-center gap-6'}>
                <p className={'text-tertiary text-4xl'}>Selected slot</p>
                <KuiButton text={'Change'} click={() => setSlot(undefined)}/>
            </div>
            <SlotChoice slot={slot} click={() => void (0)}/>
        </div>
    )
}