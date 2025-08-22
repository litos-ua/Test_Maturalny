export const getRoleString = (roleNumber: number): string => {
  switch(roleNumber) {
    case 0: return 'Guest';
    case 1: return 'Student';
    case 2: return 'Teacher';
    case 3: return 'Admin';
    default: return 'Guest';
  }
};