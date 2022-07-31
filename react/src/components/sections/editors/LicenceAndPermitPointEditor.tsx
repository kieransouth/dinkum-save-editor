import {EditorBase} from "./EditorBase";
import {PlayerInv} from "../../../models/saves/playerInv";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {PlayerEditorFields} from "./PlayerEditorFields";
import {LicenceAndPermitPointEditorFields} from "./LicenceAndPermitPointEditorFields";
import {LicenceAndPermitPoint} from "../../../models/saves/licenceAndPermitPoint";

export const LicenceAndPermitPointEditor = () => {
    return (
        <EditorBase<LicenceAndPermitPoint>
            title={'Edit Licences'}
            fileName={'licences'}
            subTitle={'Here you can edit the contents of your licences.dat file'}
            icon={solid('wrench')}
        >
            {(slot, data) => <LicenceAndPermitPointEditorFields slot={slot} data={data}/>}
        </EditorBase>
    )
}