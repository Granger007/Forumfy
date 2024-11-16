export const fetchTrending = async () => {
  try {
    // Send the API request
    const response = await fetch('/api/trending');

    // Check if the response is okay (status code 2xx)
    if (!response.ok) {
      throw new Error('Failed to fetch trending data');
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return []; // Return an empty array if there is an error
  }
};
