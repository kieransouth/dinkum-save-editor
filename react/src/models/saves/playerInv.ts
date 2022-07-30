import {array, boolean, InferType, number, object, string} from "yup";

export const playerInvSchema = object({
    playerName: string().required(),
    islandName: string().required(),
    money: number().required(),
    hair: number().required(),
    hairColour: number().required(),
    eyeStyle: number().required(),
    eyeColour: number().required(),
    nose: number().required(),
    mouth: number().required(),
    face: number().required(),
    head: number().required(),
    body: number().required(),
    pants: number().required(),
    shoes: number().required(),
    skinTone: number().required(),
    itemsInInvSlots: array().of(number()).length(44),
    stacksInSlots: array().of(number()).length(44),
    bankBalance: number().required(),
    stamina: number().required(),
    staminaMax: number().required(),
    health: number().required(),
    healthMax: number().required(),
    catalogue: array().of(boolean()),
    savedTime: number().required()
})

export interface PlayerInv extends InferType<typeof playerInvSchema> {
}