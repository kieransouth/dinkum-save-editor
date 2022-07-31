#region

using System.Runtime.Serialization.Formatters.Binary;
using Newtonsoft.Json;
using Spicy.Dinkum.Editor.Abstractions;
using Spicy.Dinkum.Editor.Abstractions.Models;
using Spicy.Dinkum.Editor.Implementations.Models;

#endregion

namespace Spicy.Dinkum.Editor.Implementations;

public class BinaryFormatterSaveFileService : ISaveFileService
{
    private readonly IDictionary<string, Type> _fileNameTypeMap;
    private readonly ISettingsService _settingsService;

    public BinaryFormatterSaveFileService(ISettingsService settingsService)
    {
        _settingsService = settingsService;
        _fileNameTypeMap = new Dictionary<string, Type>
        {
            ["playerInfo"] = typeof(PlayerInv),
            ["animalDetails"] = CreateAccessor("FencedOffAnimalSave"),
            ["animalHouseSave"] = CreateAccessor("AnimalHouseSave"),
            ["bboard"] = CreateAccessor("BulletinBoardSave"),
            ["carry"] = CreateAccessor("CarrySave"),
            ["changers"] = CreateAccessor("ChangerSave"),
            ["date"] = CreateAccessor("DateSave"),
            ["deeds"] = CreateAccessor("DeedSave"),
            ["drops"] = CreateAccessor("DropSaves"),
            ["farmAnimalSave"] = CreateAccessor("FarmAnimalSave"),
            ["houseSave"] = CreateAccessor("HouseSave"),
            ["levels"] = CreateAccessor("LevelSave"),
            ["licences"] = CreateAccessor("LicenceAndPermitPointSave"),
            ["mail"] = CreateAccessor("MailSave"),
            ["mapIcons"] = CreateAccessor("MapIconSave"),
            ["museumSave"] = CreateAccessor("MuseumSave"),
            ["npc"] = CreateAccessor("NPCsave"),
            ["onTop"] = CreateAccessor("ItemOnTopSave"),
            ["pedia"] = CreateAccessor("PediaSave"),
            ["photoDetails"] = CreateAccessor("PhotoSave"),
            ["quests"] = CreateAccessor("QuestSave"),
            ["townSave"] = CreateAccessor("TownManagerSave"),
            ["townStatus"] = CreateAccessor("TownStatusSave"),
            ["unlocked"] = CreateAccessor("RecipesUnlockedSave"),
            ["vehicleInfo"] = CreateAccessor("VehicleSave")
        };
    }

    public IEnumerable<ISaveFileSummaryModel?>? GetSlots()
    {
        var settings = _settingsService.ReadSettings<SettingsModel>();

        if (settings is null)
        {
            return null;
        }

        return Directory
            .GetDirectories(settings.savesDirectory, "Slot*")
            .Select(GetSummary);
    }

    public object? ReadBinaryFile(string slotDirectory, string fileName)
    {
        var filePath = Path.Combine(slotDirectory, $"{fileName}.dat");

        if (!File.Exists(filePath) || !_fileNameTypeMap.ContainsKey(fileName))
        {
            return null;
        }

        var binaryFormatter = new BinaryFormatter
        {
            Binder = new BinaryFormatterBinder()
        };

        try
        {
            using var fileStream = File.OpenRead(filePath);

#pragma warning disable SYSLIB0011
            var result = binaryFormatter.Deserialize(fileStream);
#pragma warning restore SYSLIB0011

            fileStream.Close();

            return result;
        }
        catch (Exception exception)
        {
            return null;
        }
    }

    public void WriteBinaryFile(string slotDirectory, string fileName, string data)
    {
        var filePath = Path.Combine(slotDirectory, $"{fileName}.dat");

        if (!File.Exists(filePath) || !_fileNameTypeMap.ContainsKey(fileName))
        {
            return;
        }

        var binaryFormatter = new BinaryFormatter
        {
            Binder = new BinaryFormatterBinder()
        };

        try
        {
            var deserialised = JsonConvert.DeserializeObject(data, _fileNameTypeMap[fileName]);

            if (deserialised is null)
            {
                return;
            }

            var timeStamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            File.Move(filePath, $"{filePath}.backup.{timeStamp}");

            using var fileStream = File.OpenWrite(filePath);
#pragma warning disable SYSLIB0011
            binaryFormatter.Serialize(fileStream, deserialised);
#pragma warning restore SYSLIB0011
            fileStream.Close();
        }
        catch (Exception exception)
        {
            // ignored
        }
    }

    private ISaveFileSummaryModel? GetSummary(string slotDirectory)
    {
        var deserialised = ReadBinaryFile(slotDirectory, "playerInfo");

        if (deserialised is not PlayerInv playerInv)
        {
            return null;
        }

        return new SaveFileSummaryModel
        {
            slotName = new DirectoryInfo(slotDirectory).Name,
            islandName = playerInv.islandName,
            playerName = playerInv.playerName,
            money = playerInv.money,
            savedTime = DateTimeOffset.FromUnixTimeSeconds(playerInv.savedTime)
        };
    }

    private Type CreateAccessor(string typeName)
    {
        var knownType = typeof(PlayerInv);
        var internalType = knownType.Assembly.GetType(typeName);

        if (internalType is null)
        {
            throw new Exception($"Cannot get type '{typeName}' from assembly.");
        }

        return internalType;
    }
}