import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('pdf', file);
    return axios.post(`${API_URL}/upload`, formData);
};

export const assignMarks = (sheetId, questionNumber, mark) => {
    return axios.post(`${API_URL}/assign-marks`, { sheetId, questionNumber, mark });
};

export const fetchMarks = (sheetId) => {
    return axios.get(`${API_URL}/marks/${sheetId}`);
};
