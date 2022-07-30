using Chromely.Core.Network;
using Spicy.Dinkum.Editor.Abstractions;
using Spicy.Dinkum.Editor.Abstractions.Models;
using Spicy.Dinkum.Editor.Attributes;

namespace Spicy.Dinkum.Editor.Controllers;

[Controller("slot")]
public class SlotController : ChromelyController
{
    private readonly ISaveFileService _saveFileService;

    public SlotController(ISaveFileService saveFileService)
    {
        _saveFileService = saveFileService;
    }

    [Route("list")]
    public IEnumerable<ISaveFileSummaryModel?>? ListSlots() => _saveFileService.GetSlots();
}