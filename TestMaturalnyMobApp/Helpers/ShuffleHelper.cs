namespace TestMaturalnyMobApp.Helpers;

public static class ShuffleHelper
{
    private static readonly Random _random = new Random();

    public static List<T> Shuffle<T>(this List<T> list)
    {
        if (list == null || list.Count <= 1)
            return list;

        var shuffled = new List<T>(list);
        for (int i = shuffled.Count - 1; i > 0; i--)
        {
            int j = _random.Next(i + 1);
            (shuffled[i], shuffled[j]) = (shuffled[j], shuffled[i]);
        }
        return shuffled;
    }
}
