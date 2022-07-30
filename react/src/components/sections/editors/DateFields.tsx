import React, {useState} from "react";
import {PlayerInv, playerInvSchema} from "../../../models/saves/playerInv";
import saveService from "../../../services/saveService";
import {KuiTextInput} from "../../kui/KuiTextInput";
import {KuiNumberInput} from "../../kui/KuiNumberInput";
import {KuiNotice} from "../../kui/KuiNotice";
import {KuiButton} from "../../kui/KuiButton";
import {Slot} from "../../../models/slot";
import {LicenceAndPermitPoint, licenceAndPermitPointSchema} from "../../../models/saves/licenceAndPermitPoint";
import {DateSave, dateSchema} from "../../../models/saves/date";

type Props = { slot: Slot, data: DateSave };

export const DateFields: React.FC<Props> = ({slot, data}) => {
    const [error, setError] = useState<Error>();

    const [day, setDay] = useState<number>(data.day);
    const [hour, setHour] = useState<number>(data.hour);
    const [month, setMonth] = useState<number>(data.month);
    const [week, setWeek] = useState<number>(data.week);
    const [year, setYear] = useState<number>(data.week);
    const [todayMineSeed, setTodayMineSeed] = useState<number>(data.todaysMineSeed);
    const [tomorrowMineSeed, setTomorrowMineSeed] = useState<number>(data.tomorrowsMineSeed);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(undefined);

        let validated = dateSchema
            .validate({
                ...data,
                day,
                hour,
                month,
                week,
                year,
                todayMineSeed,
                tomorrowMineSeed
            })
            .then(validatedData => saveService.saveData<DateSave>(slot.slotName, 'date', validatedData))
            .catch(setError);
    }

    return (
        <form
            className={'bg-dinkumBeige p-6 rounded-md flex flex-col gap-6'}
            onSubmit={submit}
        >

            <div className={'flex flex-row gap-6'}>
                <KuiNumberInput label={'Hour'} name={'hour'} value={hour}
                                change={setHour}/>
                <KuiNumberInput label={'Day'} name={'day'} value={day}
                                change={setDay}/>
                <KuiNumberInput label={'Week'} name={'week'} value={week}
                                change={setWeek}/>
                <KuiNumberInput label={'Month'} name={'month'} value={month}
                                change={setMonth}/>
                <KuiNumberInput label={'Year'} name={'year'} value={year}
                                change={setYear}/>
            </div>

            <div className={'flex flex-row gap-6'}>
                <KuiNumberInput label={"Today's mine seed"} name={'todayMineSeed'} value={todayMineSeed}
                                change={setTodayMineSeed}/>
                <KuiNumberInput label={"Tomorrow's mine seed"} name={'tomorrowMineSeed'} value={tomorrowMineSeed}
                                change={setTomorrowMineSeed}/>
            </div>

            {error && <KuiNotice type={'error'}>Validation error: {error.message}</KuiNotice>}
            <KuiButton fw sub text={'Save Changes'}/>
        </form>
    )
}