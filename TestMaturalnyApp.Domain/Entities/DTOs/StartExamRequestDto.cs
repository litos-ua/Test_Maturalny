using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestMaturalnyApp.Domain.Entities.DTOs
{
    public class StartExamRequestDto
    {
        public int DisciplineId { get; set; }
        public int TotalCount { get; set; }
        public int UserId { get; set; } // Технический — сравниваем с _currentUserService.UserId
        public string? Description { get; set; }
        public int? TimeLimitSeconds { get; set; }
    }

}
