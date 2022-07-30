namespace Spicy.Dinkum.Editor.Models.File;

public class FileModel
{
    public string id { get; set; }

    public string name { get; set; }

    public bool isDir { get; set; }

    public bool draggable { get; set; }

    public bool droppable { get; set; }

    public bool dndOpenable { get; set; }

    public string color { get; set; }
}