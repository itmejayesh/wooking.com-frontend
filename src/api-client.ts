import axios from "axios";
import { RegistrationFormInput } from "./app/(auth)/register/page";
import { SignInFormInput } from "./app/(auth)/sign-in/page";
import { PropertyFromData } from "./components/PropertyForm";

export const userSignInFormApiCall = async (formData: SignInFormInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/user/login`,
      formData,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    if (response) return response;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Server responded with error:", error.response.data);
      throw new Error("Server responded with an error");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server:", error.request);
      throw new Error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the request");
    }
  }
};

export const userRegitrationFromApiCall = async (
  fromData: RegistrationFormInput,
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/user/register`,
      fromData,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    console.log(response);
    return response;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/user/validate-token`,
      {
        withCredentials: true,
      },
    );

    // Check if the response contains data indicating a valid token
    if (response) {
      return response;
    } else {
      throw new Error("Token is not valid");
    }
  } catch (error: any) {
    // Handle any errors that occur during the request
    throw new Error("Failed to validate token: " + error.message);
  }
};

export const singOut = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/api/user/logout`,
    "",
    {
      withCredentials: true,
      method: "POST",
    },
  );

  if (response.status !== 200) {
    throw new Error("Error during sign out"); // Handle non-200 responses
  }
  return response;
};

export const addProperty = async (formData: PropertyFromData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/propertylisting`,
    formData,
    {
      withCredentials: true,
      method: "POST",
    },
  );

  if (response.status !== 201) {
    throw new Error("Error during property listing");
  }

  return response;
};
