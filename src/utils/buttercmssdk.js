import Butter from 'buttercms';

export let butterCMS;

try {
  butterCMS = Butter(process.env.REACT_APP_BUTTER_CMS_API_KEY, !process.env.REACT_APP_BUTTER_CMS_PREVIEW);
} catch (error) {
  console.error(error)
}


