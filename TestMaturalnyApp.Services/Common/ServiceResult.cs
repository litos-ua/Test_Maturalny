using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestMaturalnyApp.Services.Common
{
    public class ServiceResult
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }

        public static ServiceResult Ok() => new ServiceResult { Success = true };
        public static ServiceResult Fail(string errorMessage) => new ServiceResult { Success = false, ErrorMessage = errorMessage };
    }

    public class ServiceResult<T> : ServiceResult
    {
        public T? Data { get; set; }

        public static ServiceResult<T> Ok(T data) =>
            new ServiceResult<T> { Success = true, Data = data };

        public new static ServiceResult<T> Fail(string errorMessage) =>
            new ServiceResult<T> { Success = false, ErrorMessage = errorMessage };
    }
}
