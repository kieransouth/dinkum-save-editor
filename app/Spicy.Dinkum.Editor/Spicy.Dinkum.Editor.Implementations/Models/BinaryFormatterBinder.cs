using System.Runtime.Serialization;

namespace Spicy.Dinkum.Editor.Implementations.Models;

public class BinaryFormatterBinder : SerializationBinder
{
    private readonly Type _type;

    public BinaryFormatterBinder(Type type)
    {
        _type = type;
    }

    public override Type? BindToType(string assemblyName, string typeName) => _type;
}