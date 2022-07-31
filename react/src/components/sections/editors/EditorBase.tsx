import React, {useEffect, useState} from "react";
import {KuiHeader} from "../../kui/KuiHeader";
import {Slot} from "../../../models/slot";
import {SlotPicker} from "../../SlotPicker";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import saveService from "../../../services/saveService";

interface Props<T> {
    title: string,
    subTitle: string,
    fileName: string,
    icon: IconProp,
    children: (slot: Slot, data: T, fileName: string) => React.ReactNode
}

export const EditorBase = <T extends unknown>({title, subTitle, fileName, icon, children}: Props<T>) => {
    const [slot, setSlot] = useState<Slot>();
    const [data, setData] = useState<T>();

    useEffect(() => {
        setData(undefined);

        if (!slot) {
            return;
        }

        saveService
            .getData<T>(slot.slotName, fileName)
            .then(setData);
    }, [slot, fileName]);

    return (
        <>
            <KuiHeader main={title} sub={subTitle} icon={icon}/>
            <div className={'flex flex-col gap-6 p-6'}>
                <SlotPicker slotPicked={setSlot}/>
                {(slot && data) && children(slot, data, fileName)}
            </div>
        </>
    )
}

type RenderChildrenProps = {
    children: any
}

const RenderChildren: React.FC<RenderChildrenProps> = ({children}) => {
    return children;
}