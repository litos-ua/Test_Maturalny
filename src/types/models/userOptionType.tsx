export interface UserOptionDto {
  id: number;
  userId: number;
  theme: string;
  language: string;
  questionPreferencesJson?: string;
  adminMessage?: string;
  averageScore: number;
}


export interface CreateUserOptionDto {
  userId: number;
  theme: string;
  language: string;
  questionPreferencesJson?: string;
  adminMessage?: string;
  averageScore: number;
}

export interface UpdateUserOptionDto {
  id: number;
  userId: number;
  theme: string;
  language: string;
  questionPreferencesJson?: string;
  adminMessage?: string;
  averageScore: number;
}

        
        
        
         