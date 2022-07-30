import axios from "axios";
import {Settings} from "../models/settings";
import alertService from "./alertService";

const settingsService = {
    loadSettings: function (): Promise<Settings> {
        return axios
            .post('http://chromely.com/settings/load')
            .then(response => response.data)
            .catch(() => alertService.err());
    },
    saveSettings: function (settings: Settings): Promise<void> {
        return axios
            .post('http://chromely.com/settings/save', {settings})
            .then(() => alertService.yay())
            .catch(() => alertService.err());

    }
}

export default settingsService;