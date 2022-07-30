import React from "react";
import classNames from "classnames";
import {KuiTooltip} from "./KuiTooltip";

type Props = {
    label: string,
    name: string,
    border?: 'primary' | 'accent',
    layout?: 'row' | 'col',
    required?: boolean,
    tooltipTitle?: string,
    tooltipContent?: any,
    accept?: string,
    change: (file: File | null) => void
}

export const KuiFileInput: React.FC<Props> = ({
                                                  label,
                                                  name,
                                                  border,
                                                  required,
                                                  layout,
                                                  tooltipTitle,
                                                  tooltipContent,
                                                  accept,
                                                  change
                                              }) => (
    <div
        onDrop={event => change(event.dataTransfer.files?.item(0))}
        onDragOver={event => event.preventDefault()}
        onDragEnter={event => event.preventDefault()}
        className={classNames('flex gap-1 w-full', {
            'flex-row items-center justify-between': (layout ?? 'col') === 'row',
            'flex-col': (layout ?? 'col') === 'col'
        })}
    >
        <label
            htmlFor={name}
            className={classNames('text-lg', {
                'text-tertiary': border === 'accent',
                'text-primary': border === 'primary'
            })}
        >
            {label}:
            {required && <span className={'text-red-500 ml-1'}>*</span>}
            {tooltipTitle && <KuiTooltip title={tooltipTitle} content={tooltipContent}/>}
        </label>
        <input
            type={'file'}
            accept={accept}
            id={name}
            name={name}
            onChange={event => change(event.target.files?.item(0) || null)}
            className={classNames('p-2 text-tertiary border-2 rounded-md', {
                'border-tertiary': (border ?? 'primary') === 'accent',
                'border-primary': (border ?? 'primary') === 'primary',
                'w-2/3': (layout ?? 'col') === 'row'
            })}
        />
    </div>
)
