export const handleApiError = (error: any) => {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(error.response.data.message || "Server error");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the request");
    }
  };
  