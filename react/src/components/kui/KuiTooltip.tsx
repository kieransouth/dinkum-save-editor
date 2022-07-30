import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {KuiButton} from "./KuiButton";

type Props = {
    title: string,
    content: any
}

export const KuiTooltip: React.FC<Props> = ({title, content}) => {
    const [xy, setXy] = useState<{ x: number, y: number } | undefined>();

    return (
        <>
            <FontAwesomeIcon
                icon={solid('circle-question')}
                className={'ml-2 cursor-pointer'}
                title={'Click me!'}
                onClick={event => setXy({x: event.pageX, y: event.pageY})}
            />
            {xy &&
                <div className={'absolute shadow rounded-md w-96'} style={{left: xy.x, top: xy.y}}>
                    <div
                        className={'bg-tertiary w-full text-center text-base text-black rounded-t-md py-1'}>{title}</div>
                    <div
                        className={'bg-primary w-full text-white text-xs p-2 rounded-b-md flex flex-col gap-4'}>
                        {content}
                        <div className={'flex flex-row justify-end'}>
                            <KuiButton tt text={'Okay'} type={'magic'} click={() => setXy(undefined)}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}