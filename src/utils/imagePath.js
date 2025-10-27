// Utility function to get correct image paths for GitHub Pages
export const getImagePath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return path with base directory for GitHub Pages
  return `/e-commerse-market/${cleanPath}`;
};

// For assets that should be relative
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return relative path for GitHub Pages
  return `./${cleanPath}`;
};
