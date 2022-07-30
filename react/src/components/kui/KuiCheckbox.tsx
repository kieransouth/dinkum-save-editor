import React from "react";

type Props = {
    name: string,
    value: boolean,
    click: () => void,
    children: any
}

export const KuiCheckbox: React.FC<Props> = ({name, value, click, children}) => (
    <div className="flex lg:items-center items-start">
        <div className='flex-grow-0 mr-3 mt-1 lg:mt-0'>
            <input
                type="checkbox"
                onClick={() => click()}
                checked={value}
                value=''
                name={name}
                id={name}
                className="w-4 h-4"
            />
        </div>
        <label htmlFor={name}>
            {children}
        </label>
    </div>
)

