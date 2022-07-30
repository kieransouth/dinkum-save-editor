import {InferType, number, object} from "yup";

export const dateSchema = object({
    day: number().required(),
    week: number().required(),
    month: number().required(),
    year: number().required(),
    hour: number().required(),
    todaysMineSeed: number().required(),
    tomorrowsMineSeed: number().required()
})

export interface DateSave extends InferType<typeof dateSchema> {
}