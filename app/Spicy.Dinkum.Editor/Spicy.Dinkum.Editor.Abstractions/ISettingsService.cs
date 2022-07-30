namespace Spicy.Dinkum.Editor.Abstractions;

public interface ISettingsService
{
    T? ReadSettings<T>();

    void WriteSettings<T>(T settings);
}