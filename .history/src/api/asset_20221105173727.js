import request from '@/utils/request'
export function getAssets() {
  return request({
    url: 'http://localhost:8081/asset/findAllAssets',
    method: 'get'
  })
}

export function getAssetByPage(query) {
  return request({
    url: 'http://localhost:8081/asset/findPage',
    method: 'get',
    params: query
  })
}

