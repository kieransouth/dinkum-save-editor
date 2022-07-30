import React from "react";
import classNames from "classnames";
import {KuiTooltip} from "./KuiTooltip";

type Props = {
    label: string,
    name: string,
    value: string | undefined,
    placeholder?: string,
    change?: (newValue: string) => void,
    border?: 'primary' | 'accent',
    layout?: 'row' | 'col',
    required?: boolean,
    readonly?: boolean,
    tooltipTitle?: string,
    tooltipContent?: any
}

export const KuiDateInput: React.FC<Props> = ({
                                                  label,
                                                  name,
                                                  placeholder,
                                                  value,
                                                  change,
                                                  border,
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
            className={classNames('text-lg', {'text-white': border === 'accent', 'text-black': border === 'primary'})}
        >
            {label}:
            {required && <span className={'text-red-500 ml-1'}>*</span>}
            {tooltipTitle && <KuiTooltip title={tooltipTitle} content={tooltipContent}/>}
        </label>
        <input
            type={'datetime-local'}
            id={name}
            name={name}
            placeholder={readonly ? undefined : placeholder}
            value={value}
            readOnly={readonly}
            disabled={readonly}
            onChange={event => change ? change(event.target.value) : void (0)}
            className={classNames('p-2 text-black border-2 rounded-md', {
                'border-tertiary': (border ?? 'primary') === 'accent',
                'border-primary': (border ?? 'primary') === 'primary',
                'w-2/3': (layout ?? 'col') === 'row',
                'bg-tertiary text-black cursor-not-allowed pointer-events-none': readonly,
                'bg-white ': !readonly
            })}
        />
    </div>
)