import React, {useState} from "react";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

type Props = {
    type: 'info' | 'error' | 'warning',
    children: any
}

export const KuiNotice: React.FC<Props> = ({type, children}) => {
    const [closed, setClosed] = useState<boolean>(false);
    const classes = classNames('text-md pl-4 py-4 pr-16 relative rounded-md w-full', {
        'bg-red-300 text-red-900 border-red-900 border-2': type === 'error',
        'bg-amber-300 text-amber-900 border-amber-900 border-2': type === 'warning',
        'bg-blue-300 text-blue-900 border-blue-900 border-2': type === 'info'
    });

    if (closed) {
        return null;
    }

    return (
        <div className={classes}>
            {children}
            <div className={'absolute flex right-0 top-0 justify-center flex-col min-h-full p-4'}>
                <FontAwesomeIcon
                    icon={solid('xmark')}
                    size={'lg'}
                    className={'cursor-pointer'}
                    title={'Dismiss'}
                    onClick={() => setClosed(true)}
                />
            </div>
        </div>
    )
}