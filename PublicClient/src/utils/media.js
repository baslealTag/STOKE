/**
 * Get the full media URL for a file
 * @param {string} folder - The folder name (e.g., "MissingApplicantClaims", "UserPictures")
 * @param {string} fileName - The file name
 * @returns {string|null} - The full URL or null if fileName is not provided
 */
export const getMediaUrl = (fileName, folder) => {
  if (!fileName) return null;

  const baseUrl = import.meta.env.VITE_APP_BACKEND_IMAGES;
  return `${baseUrl}/${folder}/${fileName}`;
};
