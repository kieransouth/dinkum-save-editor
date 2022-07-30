import {EditorBase} from "./EditorBase";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {PlayerEditorFields} from "./PlayerEditorFields";
import {PlayerInv} from "../../../models/saves/playerInv";

export const PlayerInfoEditor = () => {
    return (
        <EditorBase<PlayerInv>
            title={'Edit Player Info'}
            fileName={'playerInfo'}
            subTitle={'Here you can edit the contents of your playerInfo.dat file'}
            icon={solid('wrench')}
        >
            {(slot, data) => <PlayerEditorFields slot={slot} data={data}/>}
        </EditorBase>
    )
}