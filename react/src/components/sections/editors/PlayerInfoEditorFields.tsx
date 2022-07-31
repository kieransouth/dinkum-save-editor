import React, {useState} from "react";
import {PlayerInv, playerInvSchema} from "../../../models/saves/playerInv";
import saveService from "../../../services/saveService";
import {KuiNumberInput} from "../../kui/KuiNumberInput";
import {EditorFieldsProps} from "../../../models/editor";
import {KuiNotice} from "../../kui/KuiNotice";
import {KuiButton} from "../../kui/KuiButton";
import {KuiTextInput} from "../../kui/KuiTextInput";

export const PlayerEditorFields: React.FC<EditorFieldsProps<PlayerInv>> = ({slot, data, fileName}) => {
    const [error, setError] = useState<Error>();

    const [playerName, setPlayerName] = useState<string>(data.playerName);
    const [islandName, setIslandName] = useState<string>(data.islandName);
    const [money, setMoney] = useState<number>(data.money);
    const [bankBalance, setBankBalance] = useState<number>(data.bankBalance);
    const [stamina, setStamina] = useState<number>(data.stamina);
    const [health, setHealth] = useState<number>(data.health);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(undefined);

        let validated = playerInvSchema
            .validate({
                ...data,
                playerName,
                islandName,
                money,
                bankBalance,
                stamina,
                health
            })
            .then(validatedData => saveService.saveData<PlayerInv>(slot.slotName, fileName, validatedData))
            .catch(setError);
    }

    return (
        <form
            className={'bg-dinkumBeige p-6 rounded-md flex flex-col gap-6'}
            onSubmit={submit}
        >
            <div className={'flex flex-row gap-6'}>
                <KuiTextInput label={'Player name'} name={'playerName'} value={playerName}
                              change={setPlayerName}/>
                <KuiTextInput label={'Island name'} name={'islandName'} value={islandName}
                              change={setIslandName}/>
            </div>
            <div className={'flex flex-row gap-6'}>
                <KuiNumberInput label={'Dinks'} name={'money'} value={money} change={setMoney}/>
                <KuiNumberInput label={'Bank balance'} name={'bankBalance'} value={bankBalance}
                                change={setBankBalance}/>
            </div>
            <div className={'flex flex-row gap-6'}>
                <KuiNumberInput label={'Stamina'} name={'stamina'} value={stamina} change={setStamina}/>
                <KuiNumberInput label={'Health'} name={'health'} value={health} change={setHealth}/>
            </div>
            {error && <KuiNotice type={'error'}>Validation error: {error.message}</KuiNotice>}
            <KuiButton fw sub text={'Save Changes'}/>
        </form>
    )
}