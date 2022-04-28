import {dataSet} from './static/sampleData.js'

const sleep = (ms) => {
    return new Promise(resolve => {setTimeout(resolve, ms);})
  }

  const getUserVideos = async() => {
    await sleep(3000)
    return dataSet

}

export {getUserVideos}