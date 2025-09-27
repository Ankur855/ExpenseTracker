import axios from 'axios';

const API_URL =
  'https://expense-tracker-backend-k61z.onrender.com/api/expenses';
const authToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDUyOWQzNTNlYjEwMjllY2I4YjMxNiIsImlhdCI6MTc1ODgwMDM3NSwiZXhwIjoxNzU5NDA1MTc1fQ.yEVipi7qre3n1_UVfJ5ZJgbH9gGE1C3_IdqzQxXsrk0';

// GET
export const getExpenses = async () => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {'Content-Type': 'application/json', Authorization: authToken},
    };

    const response = await axios.request(config);
    return response.data.data; // return only array
  } catch (error: any) {
    console.error(
      'Error fetching expenses:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// POST
export const addExpense = async (expense: {
  description: string;
  amount: number;
  date: string;
  category: string;
}) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {'Content-Type': 'application/json', Authorization: authToken},
      data: JSON.stringify(expense),
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error adding expense:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// PUT
export const updateExpense = async ({
  id,
  ...rest
}: {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}) => {
  try {
    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API_URL}/${id}`,
      headers: {'Content-Type': 'application/json', Authorization: authToken},
      data: JSON.stringify(rest),
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating expense:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// DELETE
export const deleteExpense = async (id: string) => {
  try {
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_URL}/${id}`,
      headers: {'Content-Type': 'application/json', Authorization: authToken},
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting expense:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};
