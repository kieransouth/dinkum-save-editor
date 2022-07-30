import axios from "axios";
import {Slot} from "../models/slot";
import alertService from "./alertService";

const slotService = {
    getSlots: function (): Promise<Slot[]> {
        return axios
            .post('http://chromely.com/slot/list')
            .then(response => response.data)
            .catch(() => alertService.err())
    }
}

export default slotService;