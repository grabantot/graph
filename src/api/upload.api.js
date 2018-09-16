import axios from 'axios'
import { apiUrl } from './api-url'

export async function uploadFile(file) {
  const formData = new FormData()
  formData.append('foo', 'bar')
  formData.append('file', file)
  const config = {
    onUploadProgress: function(progressEvent) {
      console.log('uploading', progressEvent.loaded, progressEvent.total)
    }
  }
  const url = apiUrl + '/upload'
  const res = await axios.post(url, formData, config)
  return res.data
}

export async function downloadFile(filepath) {
  console.log('download', filepath)
  const url = apiUrl + '/download?filepath=' + encodeURIComponent(filepath)
  const res = await axios.get(url)
  console.log('downloaded:', res)
}

export function makeDownloadLink(filepath) {
  const url = apiUrl + '/download?filepath=' + encodeURIComponent(filepath)
  return url
}