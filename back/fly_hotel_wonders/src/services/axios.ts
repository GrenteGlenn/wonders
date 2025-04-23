import axios from 'axios';
const url = process.env.USER_SERVICE_URL;
const verifyUser = async (token: string): Promise<boolean> => {
  try {
    if (!url) {
      console.error('USER_SERVICE_URL is not defined');
      return false;
    }
    const res = await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
    return Boolean(res.data);
  } catch (error: unknown) {
    console.error(error);
    return false;
  }
};

export default verifyUser;
