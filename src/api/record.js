import request from "@/axios"

export function getSimpleRecordListApi() {
  return request.get('/record/simple')
}

export function getRecordListApi(data) {
  return request.post('/record/list', data)
}