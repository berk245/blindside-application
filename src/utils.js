import { dataSet } from "./static/sampleData.js";

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getUserVideos = async () => {
  await sleep(2000);
  return dataSet;
};

const getVideoId = (url) => {
  try {
    let splitted = url.split("/");
    let result = splitted[splitted.length - 1];
    return result;
  } catch {
    return false;
  }
};

const getVideoInfo = async (id) => {
  await sleep(1000);
  return dataSet[0];
};

const getRelatedVideoInfo = async(id) => {
    await sleep(2000)
    return dataSet.slice(0,15)
  }

export { getUserVideos, getVideoId, getVideoInfo, getRelatedVideoInfo };
