import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { tokenService } from "../services/tokenService";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { userOptionService } from "../services/userOptionService"; // <--- сервис для опций пользователя
import type { AuthUser } from "../types/auth";
import type { UserDto, UpdateUserDto } from "../types";
import type { UserOptionDto, UpdateUserOptionDto } from "../types";
import { type UserRole } from "../types";

interface AuthContextType {
  authUser: AuthUser | null;
  userData: UserDto | null;
  userOption: UserOptionDto | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: {  
    id: number;
      username: string;
      email: string;
      fullname?: string | null;
      address?: string | null;
      phoneNumber?: string | null;
      role: UserRole;
      emailVerified: boolean;
      isLocked: boolean;
  } | null;
  refreshUser: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  updateUserData: (data: UpdateUserDto) => Promise<UserDto>;
  fetchUserOption: () => Promise<void>;
  updateUserOption: (data: UpdateUserOptionDto) => Promise<UserOptionDto>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [userData, setUserData] = useState<UserDto | null>(null);
  const [userOption, setUserOption] = useState<UserOptionDto | null>(null);
  const isAuthenticated = !!authUser;

  // Первичная инициализация при загрузке
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = tokenService.getAccessToken();
        if (accessToken) {
          await authService.refresh();
          const user = await userService.getCurrentUser();
          setUserData(user);
          setAuthUser({
            id: user.id,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
          });
          await fetchUserOption(user.id);
        }
      } catch (err) {
        console.error("Failed to initialize user:", err);
        logout();
      }
    };
    initialize();
  }, []);

  // // Использует refresh токен для восстановления
  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const accessToken = tokenService.getAccessToken();
  //       const refreshToken = tokenService.getRefreshToken();
        
  //       // Если нет ни одного токена — выходим
  //       if (!accessToken && !refreshToken) {
  //         return;
  //       }
        
  //       // Если есть refresh token — пробуем обновить access token (на случай, если он истёк)
  //       if (refreshToken) {
  //         try {
  //           const refreshed = await authService.refresh();
  //           if (refreshed?.accessToken) {
  //             tokenService.setAccessToken(refreshed.accessToken);
  //             if (refreshed.refreshToken) {
  //               tokenService.setRefreshToken(refreshed.refreshToken);
  //             }
  //           }
  //         } catch (refreshError) {
  //           console.error('Token refresh failed:', refreshError);
  //           // Если refresh не сработал — очищаем токены и выходим
  //           tokenService.clearTokens();
  //           return;
  //         }
  //       }
        
  //       // Получаем данные пользователя (теперь токен точно валидный)
  //       const user = await userService.getCurrentUser();
  //       setUserData(user);
  //       setAuthUser({
  //         id: user.id,
  //         email: user.email,
  //         role: user.role,
  //         emailVerified: user.emailVerified,
  //       });
  //       await fetchUserOption(user.id);
        
  //     } catch (err) {
  //       console.error("Failed to initialize user:", err);
  //       tokenService.clearTokens();
  //       logout();
  //     }
  //   };
    
  //   initialize();
  // }, []);

  const login = async (email: string, passwordHash: string) => {
    const loggedUser = await authService.login({ email, passwordHash });
    setAuthUser(loggedUser);
    await fetchUserData();
  };

  const logout = () => {
    authService.logout();
    setAuthUser(null);
    setUserData(null);
    setUserOption(null);
  };

  const refreshUser = async () => {
    const accessToken = tokenService.getAccessToken();
    if (accessToken) {
      try {
        const refreshed = await authService.refresh();
        setAuthUser(refreshed.user);
        await fetchUserData();
      } catch (err) {
        console.error("Refresh token error:", err);
        logout();
      }
    }
  };

  const fetchUserData = async () => {
    if (authUser?.id) {
      try {
        const data = await userService.getUserById(authUser.id);
        setUserData(data);
        await fetchUserOption(authUser.id); // <-- подгружаем опции после загрузки userData
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  };

  const updateUserData = async (data: UpdateUserDto): Promise<UserDto> => {
    if (!authUser?.id) throw new Error("User not authenticated");

    const updated = await userService.updateUser(authUser.id, data);
    setUserData(updated);

    if (data.email !== authUser.email) {
      setAuthUser({ ...authUser, email: data.email });
    }

    return updated;
  };

  // Закомментировал выделенные строки кода с вызовом утилиты из сервиса. При первом старте вызывают запрос с ошибками 404
  const fetchUserOption = async (userId?: number) => {
    try {
      const id = userId ?? authUser?.id;
      if (!id) throw new Error("User ID not provided for options fetch");

      // const option = await userOptionService.getUserOptionByUserId(id);
      // setUserOption(option);
    } catch (error) {
      console.error("Failed to fetch user option:", error);
    }
  };

  const updateUserOption = async (data: UpdateUserOptionDto): Promise<UserOptionDto> => {
    if (!userOption?.id) throw new Error("User option not loaded");

    const updated = await userOptionService.updateUserOption(data.id, data);
    setUserOption(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        userData,
        userOption,
        isAuthenticated,
        login,
        logout,
        user,
        refreshUser,
        fetchUserData,
        updateUserData,
        fetchUserOption,
        updateUserOption,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
