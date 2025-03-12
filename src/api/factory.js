import request from "@/axios"

export function getFactoryListApi(data) {
  return request.post('/factory/page', data)
}

export function createFactoryApi(data) {
  return request.post('/factory/create', data)
}

export function deleteFactoryApi(id) {
  return request.get(`/factory/delete/${id}`)
}

export function getFactoryDetailApi(id) {
  return request.get(`/factory/detail/${id}`)
}

export function updateFactoryDetailApi(data) {
  return request.post('/factory/update', data)
}