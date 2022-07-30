namespace Spicy.Dinkum.Editor.Models.File;

public class FileListModel
{
    public IEnumerable<FileModel> files { get; set; }

    public IEnumerable<FileModel> directory { get; set; }
}