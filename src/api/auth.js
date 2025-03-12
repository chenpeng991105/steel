import request from "@/axios"

export function loginApi(data) {
  return request.post('/auth/login', data)
}

export function checkPasswordApi(data) {
  return request.post('/auth/check/password', data)
}

export function updatePasswordApi(data) {
  return request.post('/auth/reset/password', data)
}

export function logoutApi(data) {
  return request.post('/auth/logout', data)
}

export function registerApi(data) {
  return request.post('/auth/register', data)
}