import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";

type Props = {
    text: string,
    route: string
}

export const KuiNotification: React.FC<Props> = ({text, route}) => {
    const nav = useNavigate();
    return (
        <div
            className={'flex flex-row items-center bg-tertiary px-2 py-1 rounded-md gap-2 hover:bg-amber-300 cursor-pointer'}
            onClick={() => nav(route)}
        >
            <FontAwesomeIcon icon={regular('bell')} size={'lg'} className={'text-black'} title={text}/>
            <p className={'text-sm sm:block hidden'}>{text}</p>
        </div>
    )
}