import React, {useEffect, useState} from "react";
import {PlayerInv, playerInvSchema} from "../../../models/saves/playerInv";
import saveService from "../../../services/saveService";
import {KuiNumberInput} from "../../kui/KuiNumberInput";
import {EditorFieldsProps} from "../../../models/editor";
import {KuiNotice} from "../../kui/KuiNotice";
import {KuiButton} from "../../kui/KuiButton";
import {KuiTextInput} from "../../kui/KuiTextInput";
import {InventoryItem} from "../../../models/inventory";
import inventoryService from "../../../services/inventoryService";

export const PlayerEditorFields: React.FC<EditorFieldsProps<PlayerInv>> = ({slot, data, fileName}) => {
    const [error, setError] = useState<Error>();
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>();

    const [playerName, setPlayerName] = useState<string>(data.playerName);
    const [islandName, setIslandName] = useState<string>(data.islandName);
    const [money, setMoney] = useState<number>(data.money);
    const [bankBalance, setBankBalance] = useState<number>(data.bankBalance);
    const [stamina, setStamina] = useState<number>(data.stamina);
    const [health, setHealth] = useState<number>(data.health);

    useEffect(() => {
        inventoryService.getItems().then(setInventoryItems);
    }, []);

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

    const createInventoryRow = (inventoryItems: InventoryItem[], itemIds: Array<number | undefined>) => {
        return itemIds.map(itemId => itemId !== -1 ?
            (
                <div className={'bg-dinkumBeige rounded-xl w-24 p-1.5 flex flex-col gap-1'}>
                    <img
                        src={`/sprites/${inventoryItems.find(item => item.ItemId === itemId)?.SpriteName || ''}.png`}
                        className={'bg-dinkumOrange rounded-xl'}
                    />
                    <div className={'w-full bg-emerald-500 h-2 rounded-full p-1'}/>
                </div>
            )
            :
            (
                <div className={'bg-dinkumBeige rounded-xl w-24 p-1.5 flex flex-col gap-1'}>
                    <div className={'bg-dinkumGray rounded-xl w-full h-full'}/>
                    <div className={'w-full h-2 p-1'}/>
                </div>
            )
        )
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
            {inventoryItems && data.itemsInInvSlots &&
                <div className={'flex flex-row bg-primary p-6 rounded-md justify-center'}>
                    <div className={'flex flex-col gap-2'}>
                        <div className={'flex flex-row justify-center gap-2'}>
                            {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(11, 22))}
                        </div>
                        <div className={'flex flex-row justify-center gap-2'}>
                            {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(22, 33))}
                        </div>
                        <div className={'flex flex-row justify-center gap-2'}>
                            {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(33, 44))}
                        </div>
                        <div className={'flex flex-row justify-center gap-2 mt-10'}>
                            {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(0, 11))}
                        </div>
                    </div>
                </div>

            }
            {error && <KuiNotice type={'error'}>Validation error: {error.message}</KuiNotice>}
            <KuiButton fw sub text={'Save Changes'}/>
        </form>
    )
}