// // utils/csvReader.js
// csvReader.js
import Papa from 'papaparse';
import axios from 'axios';

export const loadCSVData = async () => {
  try {
    const response = await axios.get('/qa.csv'); // Adjust the path if the CSV is nested in a subdirectory
    const parsedData = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true,
    });
    return parsedData.data;
  } catch (error) {
    console.error('Error loading CSV file:', error);
    return [];
  }
};


