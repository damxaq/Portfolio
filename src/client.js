import sanityClient from "@sanity/client";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const DATASET = process.env.REACT_APP_DATASET;

export default sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
});
