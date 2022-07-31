#region

using Chromely.Browser;
using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.NativeHosts;

#endregion

namespace Spicy.Dinkum.Editor;

internal static class Program
{
    internal static void Main(string[] args)
    {
        ThreadApt.STA();

        var configuration = DefaultConfiguration.CreateForRuntimePlatform();

        configuration.DebuggingMode = Constants.DebuggingMode;
        configuration.AppName = Constants.AppName;
        configuration.StartUrl = Constants.StartUrl;
        configuration.WindowOptions.Title = Constants.AppName;

        var app = new App(ClientAppUtils.GetProcessType(args));

        AppBuilder
            .Create(args)
            .UseConfig<DefaultConfiguration>(configuration)
            .UseApp<App>(app)
            .Build()
            .Run();
    }
}