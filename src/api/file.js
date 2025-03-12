import request from "@/axios"

export function uploadFileApi(data) {
  return request.post('/api/file/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function getPictureListApi() {
  return request.get('/web/picture/list')
}

export function saveImageInfoApi(data) {
  return request.post('/web/picture/save', data)
}

export function getImageInfoApi(data) {
  return request.get('/web/picture/get', data)
}