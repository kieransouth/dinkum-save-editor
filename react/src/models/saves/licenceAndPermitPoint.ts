import {array, boolean, InferType, number, object, string} from "yup";

export const licenceSchema = object({
    type: number().required(),
    maxLevel: number().required(),
    currentLevel: number().required(),
    levelCostMultiplier: number().required(),
    levelCost: number().required(),
    isUnlocked: boolean().required(),
    unlockedWithLevel: boolean().required(),
    unlockedBySkill: number().required(),
    unlockedEveryLevel: number().required(),
    hasBeenSeenBefore: boolean().required(),
    sortingNumber: number().required()
})

export const milestoneSchema = object({
    myTaskType: number().required(),
    pointsPerLevel: array().of(number()),
    rewardPerLevel: number().required(),
    points: number().required(),
    currentLevel: number().required(),
    milestonePreffix: string().required(),
    milestoneSuffix: string().required()
});

export const licenceAndPermitPointSchema = object({
    permitPoints: number().required(),
    licenceSave: array().of(licenceSchema),
    milestoneSave: array().of(milestoneSchema)
})


export interface LicenceAndPermitPoint extends InferType<typeof licenceAndPermitPointSchema> {
}