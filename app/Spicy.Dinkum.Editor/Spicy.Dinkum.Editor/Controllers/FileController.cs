using Chromely.Core.Network;
using Spicy.Dinkum.Editor.Attributes;
using Spicy.Dinkum.Editor.Models.File;

namespace Spicy.Dinkum.Editor.Controllers;

[Controller("file")]
internal class FileController : ChromelyController
{
    public FileController()
    {
    }

    [Route("get")]
    public FileListModel? Get(string? directory)
    {
        switch (directory)
        {
            case null:
                return null;

            case "/":
                return new FileListModel
                {
                    files = Directory
                        .GetLogicalDrives()
                        .Select(drive => MapToModel(drive, drive.Trim('\\'), false))
                };
        }

        var directories = Directory.GetDirectories(directory);
        var files = Directory.GetFiles(directory);

        var directoryEntries = directories.Select(dir => MapToModel(dir, new DirectoryInfo(dir).Name, false));
        var fileEntries = files.Select(file => MapToModel(file, new FileInfo(file).Name, true));

        var breadcrumbs = Split(new DirectoryInfo(directory))
            .Select(dir => MapToModel(dir.FullName, dir.Name.Trim('\\'), false))
            .ToList();

        breadcrumbs.Insert(0, new FileModel { id = "/", name = "/" });

        return new FileListModel
        {
            files = directoryEntries.Concat(fileEntries),
            directory = breadcrumbs
        };
    }

    private static FileModel MapToModel(string id, string name, bool file)
    {
        return new FileModel
        {
            id = id,
            name = name,
            isDir = !file,
            color = file ? "#d4be7d" : "#fec400",
            draggable = false,
            droppable = false,
            dndOpenable = false
        };
    }

    private static IEnumerable<DirectoryInfo> Split(DirectoryInfo path)
    {
        if (path == null)
        {
            throw new ArgumentNullException(nameof(path));
        }

        var ret = new List<DirectoryInfo>();
        if (path.Parent != null)
        {
            ret.AddRange(Split(path.Parent));
        }

        ret.Add(path);
        return ret;
    }
}