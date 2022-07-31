import React, {useState} from "react";
import {PlayerInv, playerInvSchema} from "../../../models/saves/playerInv";
import saveService from "../../../services/saveService";
import {KuiTextInput} from "../../kui/KuiTextInput";
import {KuiNumberInput} from "../../kui/KuiNumberInput";
import {KuiNotice} from "../../kui/KuiNotice";
import {KuiButton} from "../../kui/KuiButton";
import {Slot} from "../../../models/slot";
import {LicenceAndPermitPoint, licenceAndPermitPointSchema} from "../../../models/saves/licenceAndPermitPoint";

type Props = { slot: Slot, data: LicenceAndPermitPoint };

export const LicenceAndPermitPointEditorFields: React.FC<Props> = ({slot, data}) => {
    const [error, setError] = useState<Error>();

    const [permitPoints, setPermitPoints] = useState<number>(data.permitPoints);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(undefined);

        console.log({...data, permitPoints});

        let validated = licenceAndPermitPointSchema
            .validate({
                ...data,
                permitPoints
            })
            .then(validatedData => saveService.saveData<LicenceAndPermitPoint>(slot.slotName, 'licences', validatedData))
            .catch(setError);
    }

    return (
        <form
            className={'bg-dinkumBeige p-6 rounded-md flex flex-col gap-6'}
            onSubmit={submit}
        >

            <div className={'flex flex-row gap-6'}>
                <KuiNumberInput label={'Permit points'} name={'permitPoints'} value={permitPoints}
                                change={setPermitPoints}/>
            </div>

            {error && <KuiNotice type={'error'}>Validation error: {error.message}</KuiNotice>}
            <KuiButton fw sub text={'Save Changes'}/>
        </form>
    )
}