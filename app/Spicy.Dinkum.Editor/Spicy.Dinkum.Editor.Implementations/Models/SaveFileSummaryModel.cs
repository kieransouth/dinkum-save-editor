using Spicy.Dinkum.Editor.Abstractions.Models;

namespace Spicy.Dinkum.Editor.Implementations.Models;

public class SaveFileSummaryModel : ISaveFileSummaryModel
{
    public string? slotName { get; set; }
    
    public string islandName { get; set; } = null!;

    public string playerName { get; set; } = null!;

    public int money { get; set; }

    public DateTimeOffset savedTime { get; set; }
}