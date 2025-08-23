import type { UserRole } from "../types";
import { avatars } from "../constants";


export const getAvatarByRole = (roleValue: number | UserRole) => {
  // Если пришла строка (тип UserRole)
  if (typeof roleValue === 'string') {
    const avatarsRole = {
      Guest: avatars.Guest,
      Student: avatars.Student,
      Teacher: avatars.Teacher,
      Admin: avatars.Admin
    };
    return avatarsRole[roleValue] || avatars.Teacher;
  }
  
  // Если пришло число
  const roleMap = {
    0: avatars.Guest,
    1: avatars.Student,
    2: '/assets/avatars/teacher.jpg', //avatars.Teacher,
    3: avatars.Admin
  };
  console.log(`Role: ${roleValue}, RoleMap ${roleMap[roleValue as keyof typeof roleMap]}`)
  return roleMap[roleValue as keyof typeof roleMap] || avatars.Teacher;
};