import {EditorBase} from "./EditorBase";
import {PlayerInv} from "../../../models/saves/playerInv";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {PlayerEditorFields} from "./PlayerEditorFields";

export const LicenceAndPermitPointEditor = () => {
    return (
        <EditorBase<PlayerInv>
            title={'Edit Licences'}
            fileName={'licences'}
            subTitle={'Here you can edit the contents of your licences.dat file'}
            icon={solid('wrench')}
        >
            {(slot, data) => <PlayerEditorFields slot={slot} data={data}/>}
        </EditorBase>
    )
}