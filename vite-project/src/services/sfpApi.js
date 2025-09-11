const API_URL = 'http://localhost:3000/api';

//Finish OK
//http://192.168.18.32:3000/api
export const getAllSfps = async () => {
  try {
    const response = await fetch(`${API_URL}/allTransceivers`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching SFPs:', error);
    throw error;
  }
};

export const addSfpT = async (sfpData) => {
  try {
    const response = await fetch(`${API_URL}/addTransceivers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sfpData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add SFP');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding SFP:', error);
    throw error;
  }
};

export const editSfpt = async (id, sfpData) => {
  try {
    const response = await fetch(`${API_URL}/editTransceiver/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sfpData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to edit SFP');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing SFP:', error);
    throw error;
  }
};

export const deleteSfpt = async (id) => {
  try {
    const response = await fetch(`${API_URL}/deleteTransceiver/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete SFP');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting SFP:', error);
    throw error;
  }
};