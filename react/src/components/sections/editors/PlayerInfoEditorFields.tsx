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
import {InventoryItemDisplay} from "./InventoryItemDisplay";

export const PlayerEditorFields: React.FC<EditorFieldsProps<PlayerInv>> = ({slot, data, fileName}) => {
    const [error, setError] = useState<Error>();
    const [itemSearch, setItemSearch] = useState<string>();
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
        return itemIds.map((itemId, key) =>
            <InventoryItemDisplay
                key={key}
                inventoryItems={inventoryItems}
                itemId={itemId}
            />
        );
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
            <div className={'flex flex-row'}>
                {inventoryItems && data.itemsInInvSlots &&
                    <div className={'flex flex-row bg-primary p-6 rounded-md gap-16 w-full'}>
                        <div className={'flex flex-col gap-16'}>
                            <div className={'flex flex-col gap-2'}>
                                <div className={'flex flex-row justify-center gap-24'}>
                                    <InventoryItemDisplay inventoryItems={inventoryItems} itemId={data.head}/>
                                    <div className={'flex flex-row gap-2'}>
                                        {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(11, 22))}
                                    </div>
                                </div>
                                <div className={'flex flex-row justify-center gap-24'}>
                                    <InventoryItemDisplay inventoryItems={inventoryItems} itemId={data.face}/>
                                    <div className={'flex flex-row gap-2'}>
                                        {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(22, 33))}
                                    </div>
                                </div>
                                <div className={'flex flex-row justify-center gap-24'}>
                                    <InventoryItemDisplay inventoryItems={inventoryItems} itemId={data.body}/>
                                    <div className={'flex flex-row gap-2'}>
                                        {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(33, 44))}
                                    </div>
                                </div>
                                <InventoryItemDisplay inventoryItems={inventoryItems} itemId={data.pants}/>
                                <div className={'flex flex-row justify-center gap-24'}>
                                    <InventoryItemDisplay inventoryItems={inventoryItems} itemId={data.shoes}/>
                                    <div className={'flex flex-row gap-2'}>
                                        {createInventoryRow(inventoryItems, data.itemsInInvSlots.slice(0, 11))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'relative w-full'}>
                            <div className={'absolute top-0 right-0 flex flex-col h-full w-full gap-2'}>
                                <KuiTextInput label={'Search for an item'} name={'search'} placeholder={'boomerang'}
                                              value={itemSearch} change={setItemSearch}/>
                                <div className={'overflow-y-scroll rounded-md h-full bg-tertiary'}>
                                    {inventoryItems
                                        .filter(item => itemSearch ? item.ItemName.toUpperCase().indexOf(itemSearch.toUpperCase()) !== -1 : true)
                                        .map((item, key) => (
                                            <div
                                                className={'flex flex-row items-center justify-between text-primary hover:bg-secondary cursor-pointer hover:text-tertiary'}
                                                key={key}>
                                                <div className={'flex flex-row items-center'}>
                                                    <img
                                                        className={'w-20 p-2'}
                                                        src={`/sprites/${item.SpriteName}.png`}
                                                        alt={item.ItemName}
                                                        title={item.ItemName}
                                                    />
                                                    <p className={'text-xl'}>{item.ItemName}</p>
                                                </div>
                                                <p className={'p-6'}>{item.ItemId}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>


            {error && <KuiNotice type={'error'}>Validation error: {error.message}</KuiNotice>}
            <KuiButton fw sub text={'Save Changes'}/>
        </form>
    )
}