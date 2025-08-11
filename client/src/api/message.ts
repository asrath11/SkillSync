import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getMessages = async (senderId: string, receiverId: string) => {
  const response = await axios.get(
    `${API_URL}/message/${senderId}/${receiverId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
