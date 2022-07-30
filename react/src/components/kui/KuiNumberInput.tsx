import React from "react";
import classNames from "classnames";
import {KuiTooltip} from "./KuiTooltip";

type Props = {
    label: string,
    name: string,
    value: number | undefined,
    placeholder?: string,
    change?: (newValue: number) => void,
    layout?: 'row' | 'col',
    required?: boolean,
    password?: boolean,
    readonly?: boolean,
    tooltipTitle?: string,
    tooltipContent?: any
}

export const KuiNumberInput: React.FC<Props> = ({
                                                    label,
                                                    name,
                                                    password,
                                                    placeholder,
                                                    value,
                                                    change,
                                                    required,
                                                    layout,
                                                    readonly,
                                                    tooltipTitle,
                                                    tooltipContent
                                                }) => (
    <div className={classNames('flex gap-1 w-full', {
        'flex-row items-center justify-between': (layout ?? 'col') === 'row',
        'flex-col': (layout ?? 'col') === 'col'
    })}>
        <label
            htmlFor={name}
            className={classNames('text-lg text-tertiary')}
        >
            {label}:
            {required && <span className={'text-red-500 ml-1'}>*</span>}
            {tooltipTitle && <KuiTooltip title={tooltipTitle} content={tooltipContent}/>}
        </label>
        <input
            type={'number'}
            id={name}
            name={name}
            placeholder={readonly ? undefined : placeholder}
            value={value}
            readOnly={readonly}
            disabled={readonly}
            onChange={event => change ? change(parseInt(event.target.value)) : void (0)}
            className={classNames('p-2 border-2 border-tertiary rounded-md', {
                'w-2/3': (layout ?? 'col') === 'row',
                'bg-tertiary text-primary cursor-not-allowed pointer-events-none': readonly,
                'bg-primary text-tertiary': !readonly
            })}
        />
    </div>
)