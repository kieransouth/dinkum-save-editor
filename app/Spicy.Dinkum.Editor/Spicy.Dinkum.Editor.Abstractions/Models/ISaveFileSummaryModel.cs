namespace Spicy.Dinkum.Editor.Abstractions.Models;

public interface ISaveFileSummaryModel
{
    string? slotName { get; }

    string islandName { get; }

    string playerName { get; }

    int money { get; }

    DateTimeOffset savedTime { get; }
}