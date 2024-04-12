import axios from "axios";
import { RegistrationFormInput } from "./app/(auth)/register/page";

export const userRegitrationFromApiCall = async (
  fromData: RegistrationFormInput,
) => {
  try {
    const response = await axios.post(
      `http://localhost:7000/api/user/register`,
      fromData,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
