import request from '@/utils/request'
export function fetchList(query) {
  return request({
    url: 'http://localhost:8081/web/asset/list',
    method: 'get',
    params: query
  })
}
export function fetchListAll() {
  return request({
    url: 'http://localhost:8081/web/asset/listAll',
    method: 'get'
  })
}
export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createAsset(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateAsset(data) {
  return request({
    url: 'http://localhost:8081/web/asset/update',
    method: 'post',
    data
  })
}

