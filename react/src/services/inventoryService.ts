import {InventoryItem} from "../models/inventory";
import axios from "axios";
import alertService from "./alertService";

const inventoryService = {
    getItems: function (): Promise<InventoryItem[]> {
        return axios
            .get('/sprites/manifest.json')
            .then(response => response.data)
            .catch(error => alertService.err());

    }
}

export default inventoryService;