import React, {useState} from "react";
import {EditorFieldsProps} from "../../../models/editor";
import {LicenceAndPermitPoint, licenceAndPermitPointSchema} from "../../../models/saves/licenceAndPermitPoint";
import saveService from "../../../services/saveService";
import {KuiNumberInput} from "../../kui/KuiNumberInput";
import {KuiNotice} from "../../kui/KuiNotice";
import {KuiButton} from "../../kui/KuiButton";

export const LicenceAndPermitPointEditorFields: React.FC<EditorFieldsProps<LicenceAndPermitPoint>> = ({
                                                                                                          slot,
                                                                                                          data,
                                                                                                          fileName
                                                                                                      }) => {
    const [error, setError] = useState<Error>();

    const [permitPoints, setPermitPoints] = useState<number>(data.permitPoints);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(undefined);

        let validated = licenceAndPermitPointSchema
            .validate({
                ...data,
                permitPoints
            })
            .then(validatedData => saveService.saveData<LicenceAndPermitPoint>(slot.slotName, fileName, validatedData))
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