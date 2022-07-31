import {Slot} from "./slot";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type EditorFieldsProps<T> = { slot: Slot, data: T, fileName: string };

export type EditorProps = {
    fileName: string,
    title: string,
    subTitle: string,
    icon: IconProp,
    route: string
};

export type EditorPropsMap = { [key: string]: EditorProps };