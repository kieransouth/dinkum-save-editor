import {InventoryItem} from "../../../models/inventory";
import React from "react";

type Props = {
    inventoryItems: InventoryItem[],
    itemId?: number
}

export const InventoryItemDisplay: React.FC<Props> = ({inventoryItems, itemId}) => {
    let item = inventoryItems.find(item => item.ItemId === itemId);

    return item ? (
        <div className={'bg-dinkumBeige rounded-xl w-24 p-1.5 flex flex-col gap-1 cursor-pointer'}>
            <img
                src={`/sprites/${item.SpriteName}.png`}
                alt={item.ItemName}
                title={item.ItemName}
                className={'bg-dinkumOrange rounded-xl'}
            />
            <div className={'w-full bg-emerald-500 h-2 rounded-full p-1'}/>
        </div>
    ) : (
        <div className={'bg-dinkumBeige rounded-xl w-24 p-1.5 flex flex-col gap-1'}>
            <div className={'bg-dinkumGray rounded-xl h-20 w-full h-full'}/>
            <div className={'w-full h-2 p-1'}/>
        </div>
    );
}
    