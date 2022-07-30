import {FileArray, FileData} from "chonky";
import axios from "axios";
import {FileResponse} from "../models/file";
import alertService from "./alertService";

const fileService = {
    getFiles: function (directory: string): Promise<FileResponse> {
        return axios
            .post('http://chromely.com/file/get', {directory})
            .then(response => response.data)
            .catch(error => alertService.err());
    }
}

export default fileService;