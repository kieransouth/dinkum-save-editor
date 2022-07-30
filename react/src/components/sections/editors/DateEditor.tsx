import {EditorBase} from "./EditorBase";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {DateSave} from "../../../models/saves/date";
import {DateFields} from "./DateFields";

export const DateEditor = () => {
    return (
        <EditorBase<DateSave>
            title={'Edit Date'}
            fileName={'date'}
            subTitle={'Here you can edit the contents of your date.dat file'}
            icon={solid('wrench')}
        >
            {(slot, data) => <DateFields slot={slot} data={data}/>}
        </EditorBase>
    )
}