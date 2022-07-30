import axios from "axios";
import alertService from "./alertService";

const saveService = {
    getData: function <T>(slotName: string, fileName: string): Promise<T> {
        return axios
            .post('http://chromely.com/saves/load', {slotName, fileName})
            .then(response => response.data)
            .catch(error => alertService.err());
    },
    saveData: function <T>(slotName: string, fileName: string, data: T): Promise<void> {
        return axios
            .post('http://chromely.com/saves/save', {slotName, fileName, data: JSON.stringify(data)})
            .then(() => alertService.yay())
            .catch(() => alertService.err())
    }
}

export default saveService;