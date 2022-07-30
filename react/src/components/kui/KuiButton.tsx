import React from "react";
import {KuiSpinner} from "./KuiSpinner";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type Props = {
    text: string,
    click?: () => void,
    type?: 'default' | 'warning' | 'danger' | 'go-for-it' | 'magic' | 'cancel' | 'link',
    loading?: boolean,
    loadingText?: string,
    disabled?: boolean,
    fw?: boolean,
    ctx?: boolean,
    sub?: boolean,
    tt?: boolean,
    icon?: IconProp
}

export const KuiButton: React.FC<Props> = ({
                                               type,
                                               loading,
                                               loadingText,
                                               text,
                                               disabled,
                                               click,
                                               ctx,
                                               fw,
                                               sub,
                                               tt,
                                               icon
                                           }) => {
    type = type ?? 'default';

    const classes = classNames('rounded-md',
        {'text-primary underline': type === 'link'},
        {'bg-tertiary text-primary hover:bg-secondary hover:text-tertiary': type === 'default'},
        {'bg-tertiary hover:bg-amber-300 text-black': type === 'magic'},
        {'bg-red-300 text-red-900 hover:bg-red-500 hover:text-white': type === 'danger'},
        {'bg-amber-300 text-amber-900 hover:bg-amber-500 hover:text-white': type === 'warning'},
        {'bg-emerald-300 text-emerald-900 hover:bg-emerald-500 hover:text-white': type === 'go-for-it'},
        {'bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white': type === 'cancel'},
        {'p-2 text-xl': type !== 'link' && !ctx && !tt},
        {'opacity-50 pointer-events-none': disabled},
        {'w-full': fw},
        {'p-1': ctx},
        {'px-2 text-sm': tt}
    );

    return (
        <button
            className={classes}
            onClick={sub ? void (0) : click}
            type={sub ? 'submit' : 'button'}
            disabled={disabled || loading}
        >
            <div className={'flex flex-row gap-2 items-center justify-center'}>
                {icon && <FontAwesomeIcon icon={icon}/>}
                {loading &&
                    <>
                        <KuiSpinner/>
                        {loadingText}
                    </>
                }
                {!loading && <>{text}</>}
            </div>
        </button>
    )
}