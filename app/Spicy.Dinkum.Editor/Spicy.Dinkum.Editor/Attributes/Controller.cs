#region

using Chromely.Core.Network;

#endregion

namespace Spicy.Dinkum.Editor.Attributes;

internal class ControllerAttribute : ChromelyControllerAttribute
{
    internal ControllerAttribute(string path)
    {
        RoutePath = path;
    }
}