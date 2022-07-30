import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export const KuiSpinner = () => (
    <FontAwesomeIcon 
        icon={solid('circle-notch')} 
        className={'animate-spin'}
        size={'lg'}
    />
)