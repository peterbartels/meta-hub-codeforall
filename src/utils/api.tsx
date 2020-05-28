/* Api methods to call AWS functions */
import axios from "axios";

const ax = axios.create({
  baseURL: "/.netlify/functions/api/",
  responseType: "json"
});

const createUser = async (data: any) => {
  try {
    const response = await ax.post('/users', data);
  } catch (e) {
    console.log(`Posting user data failed: ${e}`);
  }
}

const getAllUsers = async () => {
  try {
    return (await ax.get('/users')).data;
  } catch (e) {
    console.log(`Getting user data failed: ${e}`);
  }
}

const getUser = async (email: string) => {
  try {
    const response = await ax.get('/account/me', { params: { email } });
    return response.data
  } catch (e) {
    console.log(`Getting user data failed: ${e}`);
  }
}

const updateUser = async (data: any, email?: string) => {
  try {
    const response = await ax.put('/users', data, { params: { email } });
  } catch (e) {
    console.log(`Posting user data failed: ${e}`);
  }
}

const deleteUser = async (email?: string) => {
  try {
    return await ax.delete('/users', { params: { email } });
  } catch (e) {
    console.log(`Deleting user data failed: ${e}`);
  }
}

export default {
  getUser,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
}
