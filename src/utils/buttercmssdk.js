import Butter from 'buttercms';

export let butterCMS;

try {
  const butterCmsPreview = !(import.meta.env.VITE_BUTTER_CMS_PREVIEW === "false" || import.meta.env.VITE_BUTTER_CMS_PREVIEW === "0");
  
  butterCMS = Butter(import.meta.env.VITE_BUTTER_CMS_API_KEY, butterCmsPreview);
  
  // Patch the post.retrieve method to ensure proper slug format
  const originalRetrieve = butterCMS.post.retrieve;
  butterCMS.post.retrieve = async function(slug, ...args) {
    // Ensure slug doesn't have trailing slash for API call
    let cleanSlug = slug;
    if (cleanSlug && typeof cleanSlug === 'string' && cleanSlug.endsWith('/')) {
      cleanSlug = cleanSlug.slice(0, -1);
    }
    
    return await originalRetrieve.call(this, cleanSlug, ...args);
  };
} catch (error) {
  console.error(error);
}

