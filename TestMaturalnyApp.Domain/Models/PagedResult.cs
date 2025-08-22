
namespace TestMaturalnyApp.Domain.Models
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int TotalCount { get; set; }     // всего элементов в базе
        public int PageNumber { get; set; }     // номер текущей страницы
        public int PageSize { get; set; }       // размер страницы
    }

}
