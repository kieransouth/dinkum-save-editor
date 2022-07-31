import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {EditorPropsMap} from "../models/editor";

const editors: EditorPropsMap = {
    'playerInfo': {
        route: 'playerInfo',
        fileName: 'playerInfo',
        title: 'Player Info',
        icon: solid('user'),
        subTitle: 'Edit general information about your save file'
    },
    'licences': {
        route: 'licences',
        fileName: 'licences',
        title: 'Licences',
        icon: solid('id-card'),
        subTitle: 'Edit your licences and how many permit points you have'
    },
    'date': {
        route: 'date',
        fileName: 'date',
        title: 'Date and Mine Seeds',
        icon: solid('calendar'),
        subTitle: 'Edit the in-game date and the seed values that generate the mines'
    }
}

const editorService = {
    getEditors: function (): EditorPropsMap {
        return editors;
    }
}

export default editorService;