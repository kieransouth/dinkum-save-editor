using Chromely.Core.Network;
using Spicy.Dinkum.Editor.Abstractions;
using Spicy.Dinkum.Editor.Attributes;
using Spicy.Dinkum.Editor.Implementations.Models;

namespace Spicy.Dinkum.Editor.Controllers;

[Controller("settings")]
internal class SettingsController : ChromelyController
{
    private readonly ISettingsService _settingsService;
    private readonly SettingsModel _defaultSettings;

    public SettingsController(ISettingsService settingsService)
    {
        _settingsService = settingsService;

        _defaultSettings = new SettingsModel
        {
            savesDirectory = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)
                    .Replace(
                        Path.Combine("AppData", "Local"),
                        Path.Combine("AppData", "LocalLow")
                    ),
                "James Bendon",
                "Dinkum"
            )
        };
    }

    [Route("load")]
    public SettingsModel GetSettings()
    {
        var settings = _settingsService.ReadSettings<SettingsModel>();

        if (settings is not null)
        {
            return settings;
        }

        _settingsService.WriteSettings(_defaultSettings);
        return _defaultSettings;
    }

    [Route("save")]
    public void SetSettings(SettingsModel settings)
    {
        _settingsService.WriteSettings(settings);
    }
}