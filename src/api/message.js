import request from "@/axios"

export function getMessageListApi(data) {
  return request.post('/message/page', data)
}

export function createMessageApi(data) {
  return request.post('/message/create', data)
}

export function createMessageTypeApi(data) {
  return request.post('/message_type/create', data)
}

export function getMessageTypeListApi(data) {
  return request.get('/message_type/list', data)
}

export function getMessageConfigApi(data) {
  return request.get('/config/get/top/scroll', data)
}