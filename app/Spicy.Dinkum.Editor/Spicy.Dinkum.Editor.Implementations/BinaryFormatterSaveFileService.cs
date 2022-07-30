using System.Runtime.Serialization.Formatters.Binary;
using Newtonsoft.Json;
using Spicy.Dinkum.Editor.Abstractions;
using Spicy.Dinkum.Editor.Abstractions.Models;
using Spicy.Dinkum.Editor.Implementations.Models;

namespace Spicy.Dinkum.Editor.Implementations;

public class BinaryFormatterSaveFileService : ISaveFileService
{
    private readonly ISettingsService _settingsService;
    private readonly IDictionary<string, Type> _fileNameTypeMap;

    public BinaryFormatterSaveFileService(ISettingsService settingsService)
    {
        _settingsService = settingsService;
        _fileNameTypeMap = new Dictionary<string, Type>
        {
            ["playerInfo.dat"] = typeof(PlayerInv),
            ["animalDetails.dat"] = AccessInternalType("FencedOffAnimalSave"),
            ["animalHouseSave.dat"] = AccessInternalType("AnimalHouseSave"),
            ["bboard.dat"] = AccessInternalType("BulletinBoardSave"),
            ["carry.dat"] = AccessInternalType("CarrySave"),
            ["changers.dat"] = AccessInternalType("ChangerSave"),
            ["date.dat"] = AccessInternalType("DateSave"),
            ["deeds.dat"] = AccessInternalType("DeedSave"),
            ["drops.dat"] = AccessInternalType("DropSaves"),
            ["farmAnimalSave.dat"] = AccessInternalType("FarmAnimalSave"),
            ["houseSave.dat"] = AccessInternalType("HouseSave"),
            ["levels.dat"] = AccessInternalType("LevelSave"),
            ["licences.dat"] = AccessInternalType("LicenceAndPermitPointSave"),
            ["mail.dat"] = AccessInternalType("MailSave"),
            ["mapIcons.dat"] = AccessInternalType("MapIconSave"),
            ["museumSave.dat"] = AccessInternalType("MuseumSave"),
            ["npc.dat"] = AccessInternalType("NPCsave"),
            ["onTop.dat"] = AccessInternalType("ItemOnTopSave"),
            ["pedia.dat"] = AccessInternalType("PediaSave"),
            ["photoDetails.dat"] = AccessInternalType("PhotoSave"),
            ["quests.dat"] = AccessInternalType("QuestSave"),
            ["townSave.dat"] = AccessInternalType("TownManagerSave"),
            ["townStatus.dat"] = AccessInternalType("TownStatusSave"),
            ["unlocked.dat"] = AccessInternalType("RecipesUnlockedSave"),
            ["vehicleInfo.dat"] = AccessInternalType("VehicleSave"),
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

    private ISaveFileSummaryModel? GetSummary(string slotDirectory)
    {
        var deserialised = ReadBinaryFile(slotDirectory, "playerInfo.dat");

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

    public object? ReadBinaryFile(string slotDirectory, string fileName)
    {
        var filePath = Path.Combine(slotDirectory, fileName);

        if (!File.Exists(filePath) || !_fileNameTypeMap.ContainsKey(fileName))
        {
            return null;
        }

        var binaryFormatter = new BinaryFormatter
        {
            Binder = new BinaryFormatterBinder(_fileNameTypeMap[fileName])
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
        var filePath = Path.Combine(slotDirectory, fileName);

        if (!File.Exists(filePath) || !_fileNameTypeMap.ContainsKey(fileName))
        {
            return;
        }

        var binaryFormatter = new BinaryFormatter
        {
            Binder = new BinaryFormatterBinder(_fileNameTypeMap[fileName])
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

    private Type AccessInternalType(string typeName)
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