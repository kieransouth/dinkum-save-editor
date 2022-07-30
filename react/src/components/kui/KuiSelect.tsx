import React, {useState} from "react";
import {KuiTooltip} from "./KuiTooltip";

type Props = {
    name: string,
    label: string,
    placeholder?: string,
    change: (newValue: any) => void,
    value: any | undefined,
    required?: boolean,
    tooltipTitle?: string,
    tooltipContent?: any,
    children: any
}

export const KuiSelect: React.FC<Props> = ({
                                               name,
                                               label,
                                               required,
                                               placeholder,
                                               change,
                                               value,
                                               tooltipTitle,
                                               tooltipContent,
                                               children
                                           }) => {


    return (
        <div className={'flex flex-col gap-1 w-full'}>
            <label
                htmlFor={name}
                className={'text-lg'}
            >
                {label}:
                {required && <span className={'text-red-500 ml-1'}>*</span>}
                {tooltipTitle && <KuiTooltip title={tooltipTitle} content={tooltipContent}/>}
            </label>
            <select
                id={name}
                name={name}
                placeholder={placeholder}
                className={'h-11 px-2 text-black bg-white border-2 border-primary w-full lg:w-full rounded-md'}
                onChange={event => change(event.target.value)}
                value={value}
            >
                {children}
            </select>
        </div>
    )
}