import Axios from "axios";

export const getApi = async (url: string) => {
  try {
    const response = await Axios.get(url);
    return response?.data;
  } catch (error: any) {
    return error.response?.data;
  }
};
