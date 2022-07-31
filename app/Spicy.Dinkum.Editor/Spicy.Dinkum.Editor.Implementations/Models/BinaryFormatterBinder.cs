using System.Runtime.Serialization;

namespace Spicy.Dinkum.Editor.Implementations.Models;

public class BinaryFormatterBinder : SerializationBinder
{
    public BinaryFormatterBinder()
    {
    }

    public override Type? BindToType(string assemblyName, string typeName)
    {
        return typeof(PlayerInv).Assembly.GetType(typeName);
    }
}