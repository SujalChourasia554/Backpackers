// API utility functions for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Fetch destinations by category
 * @param {string} category - Category name (Beach, Mountains & Outdoors, Culture & Heritage)
 * @param {number} limit - Maximum number of results to return (default: 50)
 * @returns {Promise<Array>} Array of destinations
 */
export async function fetchDestinationsByCategory(category, limit = 50) {
  try {
    // Map frontend category names to backend category names
    const categoryMap = {
      'beaches': 'Beach',
      'mountains': 'Mountains & Outdoors',
      'cultural': 'Culture & Heritage'
    };

    const backendCategory = categoryMap[category] || category;
    const response = await fetch(`${API_BASE_URL}/api/v1/destination/category/${encodeURIComponent(backendCategory)}/get`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch destinations: ${response.statusText}`);
    }

    const data = await response.json();
    // Limit the results to improve performance
    const results = data.response || [];
    return results.slice(0, limit);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

/**
 * Fetch all destinations with optional filters
 * @param {Object} filters - Optional filters { state, category, limit }
 * @returns {Promise<Array>} Array of destinations
 */
export async function fetchAllDestinations(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    if (filters.state) queryParams.append('state', filters.state);
    if (filters.category) queryParams.append('category', filters.category);

    const url = `${API_BASE_URL}/api/v1/destination/all/get${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch destinations: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.response || [];
    
    // Limit results if specified (default to 100 for explore page)
    const limit = filters.limit || 100;
    return results.slice(0, limit);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

/**
 * Fetch destination by ID
 * @param {string} destinationId - Destination MongoDB ID
 * @returns {Promise<Object>} Destination object with related items
 */
export async function fetchDestinationById(destinationId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/destination/${destinationId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch destination: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || null;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

/**
 * Fetch packages for a destination
 * @param {string} destinationId - Destination MongoDB ID
 * @param {Object} filters - Optional filters { minBudget, maxBudget, sortBy }
 * @returns {Promise<Array>} Array of packages
 */
export async function fetchPackagesByDestination(destinationId, filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    if (filters.minBudget) queryParams.append('minBudget', filters.minBudget);
    if (filters.maxBudget) queryParams.append('maxBudget', filters.maxBudget);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

    const url = `${API_BASE_URL}/api/v1/packages/destination/${destinationId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch packages: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

/**
 * Fetch package by ID
 * @param {string} packageId - Package MongoDB ID
 * @returns {Promise<Object>} Package object with related items
 */
export async function fetchPackageById(packageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/packages/${packageId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch package: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || null;
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}

/**
 * Find destination by name (fuzzy search)
 * @param {string} name - Destination name
 * @param {string} category - Optional category filter
 * @returns {Promise<Object|null>} Destination object or null
 */
export async function findDestinationByName(name, category = null) {
  try {
    const filters = category ? { category } : {};
    const destinations = await fetchAllDestinations(filters);
    
    // Try exact match first
    let destination = destinations.find(d => 
      d.name.toLowerCase() === name.toLowerCase()
    );
    
    // Try partial match if exact match not found
    if (!destination) {
      destination = destinations.find(d => 
        d.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(d.name.toLowerCase())
      );
    }
    
    return destination || null;
  } catch (error) {
    console.error('Error finding destination:', error);
    return null;
  }
}

