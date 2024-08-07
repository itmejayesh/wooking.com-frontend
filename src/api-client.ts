import axios from "axios";
import { handleApiError } from "./utils/handleApiError";
import { PropertyFormData, PropertyType, RegistrationFormInput, SignInFormInput } from "./constants/types";

export const userSignInFormApiCall = async (formData: SignInFormInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const userRegistrationFormApiCall = async (formData: RegistrationFormInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};


export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/validate-token`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};



export const signOut = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error("Error during sign out");
    }
    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};


// Update addProperty to accept FormData
export const addProperty = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/propertylisting`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Error during property listing");
    }

    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};



export const fetchMyProperties = async (): Promise<PropertyType[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/propertylisting`, {
      withCredentials: true,
      method: 'GET',
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching properties, status code: ${response.status}`);
    }

    return response.data as PropertyType[];
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

