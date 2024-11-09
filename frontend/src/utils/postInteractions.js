// src/utils/postInteractions.js

// Utility function to handle POST requests
const postRequest = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            return { success: true, message: 'Action completed successfully!' };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Action failed.' };
        }
    } catch (error) {
        return { success: false, message: error.message || 'Network error.' };
    }
};

// Event listener for saving posts
const addSavePostListeners = () => {
    document.querySelectorAll('.save-icon').forEach(icon => {
        icon.addEventListener('click', async function() {
            const postId = this.dataset.postId; // Assuming each save icon has a data-post-id attribute
            const result = await postRequest('/savePost', { postId });
            alert(result.message);
        });
    });
};

// Event listener for reposting
const addRepostListeners = () => {
    document.querySelectorAll('.repost-icon').forEach(icon => {
        icon.addEventListener('click', async function() {
            const postId = this.dataset.postId;
            const result = await postRequest('/repost', { postId });
            alert(result.message);
        });
    });
};

// Initialize all interactions
const initializePostInteractions = () => {
    addSavePostListeners();
    addRepostListeners();
};

// Export function to initialize interactions
export default initializePostInteractions;
