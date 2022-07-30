using System.Text.Json;
using Spicy.Dinkum.Editor.Abstractions;

namespace Spicy.Dinkum.Editor.Implementations;

public class JsonSettingsService : ISettingsService
{
    private const string SettingsFile = "settings.json";

    public T? ReadSettings<T>()
    {
        if (!File.Exists(SettingsFile))
        {
            return default;
        }

        var json = File.ReadAllText(SettingsFile);
        return JsonSerializer.Deserialize<T>(json);
    }

    public void WriteSettings<T>(T settings)
    {
        File.WriteAllText(SettingsFile, string.Empty);
        using var fileStream = File.OpenWrite(SettingsFile);
        JsonSerializer.Serialize(fileStream, settings);
        fileStream.Close();
    }
}