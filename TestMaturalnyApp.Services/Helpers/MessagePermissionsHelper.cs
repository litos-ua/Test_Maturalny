using TestMaturalnyApp.Domain.Entities.Enums;

namespace TestMaturalnyApp.Services.Helpers
{
    public static class MessagePermissionsHelper
    {
        public static bool CanSend(UserRole senderRole, UserRole receiverRole)
        {
            return senderRole switch
            {
                UserRole.Admin => true, // Admin может писать всем
                UserRole.Teacher => true, // Teacher может писать всем
                UserRole.Student => receiverRole is UserRole.Teacher or UserRole.Admin,
                UserRole.Guest => receiverRole == UserRole.Admin,
                _ => false
            };
        }
    }

}
