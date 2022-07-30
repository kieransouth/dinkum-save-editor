using Chromely;
using Chromely.Browser;
using Microsoft.Extensions.DependencyInjection;
using Spicy.Dinkum.Editor.Abstractions;
using Spicy.Dinkum.Editor.Implementations;

namespace Spicy.Dinkum.Editor;

internal class App : ChromelyBasicApp
{
    private readonly ProcessType _processType;

    internal App(ProcessType processType)
    {
        _processType = processType;
    }

    public override void ConfigureServices(IServiceCollection services)
    {
        base.ConfigureServices(services);

        services.AddSingleton<ISettingsService, JsonSettingsService>();
        services.AddSingleton<ISaveFileService, BinaryFormatterSaveFileService>();

        RegisterChromelyControllerAssembly(services, typeof(App).Assembly);
    }
}