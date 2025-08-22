using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestMaturalnyApp.Domain.Entities.DTOs.Update
{
    public class UpdateDisciplineDto
    {
        public int id { get; set; }
        public string Name { get; set; } = null!;
    }
}
