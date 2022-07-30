using Chromely.Core.Network;
using Newtonsoft.Json;
using Spicy.Dinkum.Editor.Abstractions;
using Spicy.Dinkum.Editor.Attributes;
using Spicy.Dinkum.Editor.Implementations.Models;

namespace Spicy.Dinkum.Editor.Controllers;

[Controller("saves")]
internal class SavesController : ChromelyController
{
    private readonly ISettingsService _settingsService;
    private readonly ISaveFileService _saveFileService;

    public SavesController(ISettingsService settingsService, ISaveFileService saveFileService)
    {
        _settingsService = settingsService;
        _saveFileService = saveFileService;
    }

    [Route("load")]
    public object? LoadSaveData(string slotName, string fileName)
    {
        var settings = _settingsService.ReadSettings<SettingsModel>();

        if (settings is null)
        {
            return null;
        }

        var slotDirectory = Path.Combine(settings.savesDirectory, slotName);
        var returned = _saveFileService.ReadBinaryFile(slotDirectory, fileName);

        return JsonConvert.SerializeObject(returned);
    }

    [Route("save")]
    public void SaveSaveData(string slotName, string fileName, string data)
    {
        var settings = _settingsService.ReadSettings<SettingsModel>();

        if (settings is null)
        {
            return;
        }

        var slotDirectory = Path.Combine(settings.savesDirectory, slotName);
        _saveFileService.WriteBinaryFile(slotDirectory, fileName, data);
    }
}