import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FileArray, FullFileBrowser} from "chonky";
import {useCallback, useEffect, useMemo, useState} from "react";
import fileService from "../../../services/fileService";
import {KuiHeader} from "../../kui/KuiHeader";
import {KuiTextInput} from "../../kui/KuiTextInput";
import {KuiButton} from "../../kui/KuiButton";
import settingsService from "../../../services/settingsService";
import {KuiNotice} from "../../kui/KuiNotice";

export const Settings = () => {
    const [data, setData] = useState<{ files: FileArray, directory: FileArray }>();
    const [directory, setDirectory] = useState<string>('/');

    useEffect(() => {
        settingsService
            .loadSettings()
            .then(settings => {
                if (settings.savesDirectory) {
                    setDirectory(settings.savesDirectory);
                }
            })
    }, []);

    useEffect(() => {
        fileService
            .getFiles(directory)
            .then(setData);
    }, [directory]);

    const save = useCallback(() => {
        settingsService
            .saveSettings({savesDirectory: directory});
    }, [directory]);

    const hasSlotDirectories = useMemo(() => {
        if (!data) {
            return false;
        }

        return data.files.filter(f => f?.name?.startsWith('Slot') || false).length > 0;
    }, [data]);

    return (
        <>
            <KuiHeader icon={solid('cogs')} main={'Settings'} sub={'You can edit the application settings here'}/>
            <div className={'p-6 h-full flex flex-col gap-6'}>
                {hasSlotDirectories &&
                    <KuiNotice type={'info'}>
                        <p className={'text-xl'}>This looks like the correct folder!</p>
                    </KuiNotice>
                }
                <div className={'flex flex-row items-end justify-center gap-6'}>
                    <KuiTextInput label={'Save data folder'} name={'dataFolder'}
                                  value={directory === '/' ? '' : directory} readonly/>
                    <KuiButton text={'Save'} click={save} icon={solid('save')}/>
                </div>
                {data &&
                    <FullFileBrowser
                        files={data.files}
                        disableDragAndDrop
                        disableDragAndDropProvider
                        clearSelectionOnOutsideClick
                        darkMode
                        disableDefaultFileActions
                        disableSelection
                        instanceId={'settings'}
                        folderChain={data.directory}
                        onFileAction={data => {
                            if (data.id === 'open_files') {
                                setDirectory(data.payload.targetFile!.id);
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}