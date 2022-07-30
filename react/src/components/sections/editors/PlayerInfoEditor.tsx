import {EditorBase} from "./EditorBase";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {PlayerEditorFields} from "./PlayerEditorFields";
import {PlayerInvSave} from "../../../models/saves/playerInv";

export const PlayerInfoEditor = () => {
    return (
        <EditorBase<PlayerInvSave>
            title={'Edit Player Info'}
            fileName={'playerInfo.dat'}
            subTitle={'Here you can edit the contents of your playerInfo.dat file'}
            icon={solid('wrench')}
        >
            {(slot, data) => <PlayerEditorFields slot={slot} data={data}/>}
        </EditorBase>
    )
}