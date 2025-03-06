import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { useSegments, useRouter } from "expo-router";
import { AuthContextType, UserType } from "../types/types.global";
import { merge } from "lodash";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthStatus = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("authToken");
  } catch (error) {
    console.error("Failed to fetch auth status:", error);
    return null;
  }
};

const getUserData = async (): Promise<UserType | null> => {
  try {
    const user = await SecureStore.getItemAsync("userData");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync("authToken", token);
  } catch (error) {
    console.error("Failed to save auth token:", error);
  }
};

const saveUserData = async (user: UserType): Promise<void> => {
  try {
    await SecureStore.setItemAsync("userData", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

const clearAuthData = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userData");
    await SecureStore.deleteItemAsync("categoryData");
  } catch (error) {
    console.error("Failed to clear auth data:", error);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const rootSegment = useSegments()[0];

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const savedToken = await getAuthStatus();
        const savedUser = await getUserData();
        setToken(savedToken);
        setUser(savedUser);

        const authStatus = !!savedToken;
        setIsAuthenticated(authStatus);
        if (!authStatus && rootSegment !== "(initial)") {
          router.replace("/(initial)");
        } else if (authStatus && rootSegment !== "(main)") {
          router.replace("/home");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [rootSegment, isAuthenticated]);

  const login = async (token: string) => {
    await saveAuthToken(token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const updateUser = async (user: UserType) => {
    await saveUserData(user);
    setUser(user);
  };

  const updateUserPartially = async (updatedFields: Partial<UserType>) => {
    if (!user) {
      console.error("User object is null or undefined.");
      return;
    }

    const updatedUser = merge({}, user, updatedFields);

    try {
      await saveUserData(updatedUser);
      setUser(updatedUser);
      console.log("User successfully updated in SecureStore and state.");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const logout = async () => {
    await clearAuthData();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        isLoading,
        user,
        login,
        logout,
        setUser: updateUser,
        updateUserPartially,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
