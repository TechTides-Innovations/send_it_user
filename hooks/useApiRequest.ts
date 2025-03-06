/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useContext } from "react";
import AuthContext from "../context/AuthContext";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiResponse<T> {
  data: T | null;
  status: number | null;
  error: string | null;
  loading: boolean;
  execute: (
    url: string,
    method?: HttpMethod,
    body?: any,
    config?: RequestInit,
    authorized?: boolean
  ) => Promise<{ data: T | null; status: number | null; error: string | null }>;
}

export const useApiRequest = <T = any>(): ApiResponse<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  const execute = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body: any = null,
      config: RequestInit = {},
      authorized?: boolean
    ) => {
      setLoading(true);

      try {
        // Check if the body is FormData
        const isFormData = body instanceof FormData;

        // Build the headers: if it's FormData, let the browser set the "Content-Type" header (with boundary)
        const headers = {
          ...(authorized && { Authorization: `Bearer ${auth?.token}` }),
          ...(config.headers || {}),
          ...(!isFormData && { "Content-Type": "application/json" }),
        };

        const fetchOptions: RequestInit = {
          method,
          ...config,
          headers,
          body: body ? (isFormData ? body : JSON.stringify(body)) : null,
        };

        const response = await fetch(url, fetchOptions);
        const responseData = await response.json();
        const status = response.status;

        if (!response.ok) {
          throw new Error(responseData || "An error occurred");
        }

        return {
          data: responseData,
          status,
          error: null,
        };
      } catch (err: unknown) {
        console.log(err);
        return {
          data: null,
          status: null,
          error: err instanceof Error ? err.message : "Unknown error occurred",
        };
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  return { data: null, status: null, error: null, loading, execute };
};
