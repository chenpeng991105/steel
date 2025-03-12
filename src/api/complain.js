import request from "@/axios"

export function createComplainApi(data) {
  return request.post('/complain/create', data)
}

export function getComplainListApi(data) {
  return request.post('/complain/page', data)
}