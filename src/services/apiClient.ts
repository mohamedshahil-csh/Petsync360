export interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

const API_BASE_URL = "https://v3.televet-api.a2zhealth.in/";
const API_KEY = "bXaljR3Sd1Jy4oG0QGOiLRwIEpCzR13r";

async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;
  const token = localStorage.getItem("token");

  console.log("tokentoken", token);

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  console.log("configconfig", config);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;

        if (errorMessage === "Expired token") {
          window.location.href = "/login";
          return Promise.reject(new Error(errorMessage));
        }
      } catch {
        // If error response is not JSON, fallback to default message
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return {} as T; // No content
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Unexpected error occurred");
  }
}

export default apiClient;
