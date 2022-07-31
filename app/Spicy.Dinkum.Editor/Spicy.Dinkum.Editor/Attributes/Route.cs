#region

using Chromely.Core.Network;

#endregion

namespace Spicy.Dinkum.Editor.Attributes;

internal class RouteAttribute : ChromelyRouteAttribute
{
    internal RouteAttribute(string path)
    {
        Path = path;
    }
}