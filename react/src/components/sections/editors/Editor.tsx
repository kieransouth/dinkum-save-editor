import {IconProp} from "@fortawesome/fontawesome-svg-core";
import React from "react";
import {EditorBase} from "./EditorBase";
import {Slot} from "../../../models/slot";

interface Props<T> {
    fileName: string,
    title: string,
    subTitle: string,
    icon: IconProp,
    fields: (slot: Slot, data: T, fileName: string) => React.ReactNode
}

export const Editor = <T extends unknown>({fields, ...rest}: Props<T>) => {
    return (
        <EditorBase<T> {...rest}>{fields}</EditorBase>
    )
}