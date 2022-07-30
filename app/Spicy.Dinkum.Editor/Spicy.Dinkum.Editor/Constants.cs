namespace Spicy.Dinkum.Editor;

internal static class Constants
{
#if DEBUG
    private const bool Debug = true;
#else
    private const bool Debug = false;
#endif

    internal const bool DebuggingMode = Debug;
    internal const string AppName = "Dinkum Save Editor";
    internal const string StartUrl = Debug ? "http://localhost:3000" : "local://build/index.html";
}