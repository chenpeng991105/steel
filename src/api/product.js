import request from "@/axios"

export function createProductTypeApi(data) {
  return request.post('/product_type/create', data)
}

export function getProductTypeListApi() {
  return request.get('/product_type/list')
}

export function deleteProductTypeApi(id) {
  return request.get(`/product_type/delete/${id}`)
}

export function updateProductTypeApi(data) {
  return request.post('/product_type/update', data)
}

export function createProductApi(data) {
  return request.post('/product/create', data)
}

export function getProductListApi(data) {
  return request.post('/product/page', data)
}

export function getProductStaticsApi() {
  return request.get('/record/product/statics')
}