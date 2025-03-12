import request from "@/axios"

export function createAccountApi(data) {
  return request.post('/account/create', data)
}

export function getAccountListApi(data) {
  return request.post('/account/page', data)
}

export function updateAccountApi(data) {
  return request.post('/account/update', data)
}