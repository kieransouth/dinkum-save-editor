using Spicy.Dinkum.Editor.Abstractions.Models;

namespace Spicy.Dinkum.Editor.Abstractions;

public interface ISaveFileService
{
    object? ReadBinaryFile(string slotDirectory, string fileName);

    void WriteBinaryFile(string slotDirectory, string fileName, string data);
    
    IEnumerable<ISaveFileSummaryModel?>? GetSlots();
}