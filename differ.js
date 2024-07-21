import fetch from 'node-fetch';

async function fetchWithRetry(url, options = {}, retries = 3, delay = 100) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
                console.log(`Retrying attempt ${i + 2}...`);
            } else {
                throw error;
            }
        }
    }
}

export async function fetchParallelWithRetry(jsonData, retries = 3, delay = 100) {
    const { templates: { left, right } } = jsonData;

    const fetchData = async (template) => {
        const { url, method, headers } = template;
        const options = {
            method,
            headers
        };
        return fetchWithRetry(url, options, retries, delay);
    };

    try {
        const [leftResponse, rightResponse] = await Promise.all([
            fetchData(left),
            fetchData(right)
        ]);

        return { leftResponse, rightResponse };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}