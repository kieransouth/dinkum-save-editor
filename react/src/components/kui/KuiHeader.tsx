import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type Props = {
    main?: string,
    sub?: string,
    icon?: IconProp,
    children?: any
}

export const KuiHeader: React.FC<Props> = ({main, sub, icon, children}) => (
    <div className={'bg-secondary text-brown p-6 flex flex-row items-center gap-4'}>
        {icon && <FontAwesomeIcon icon={icon} size={'2x'}/>}
        <div>
            {main && <p className={'text-2xl'}>{main}</p>}
            {sub && <p className={'text-lg'}>{sub}</p>}
            {children}
        </div>
    </div>
)