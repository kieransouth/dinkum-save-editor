#region

using System.Runtime.Serialization;

#endregion

namespace Spicy.Dinkum.Editor.Implementations.Models;

public class BinaryFormatterBinder : SerializationBinder
{
    public override Type? BindToType(string assemblyName, string typeName)
    {
        return typeof(PlayerInv).Assembly.GetType(typeName);
    }
}