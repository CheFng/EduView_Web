import request from '@/utils/request'
export function getAssets() {
  return request({
    url: 'http://localhost:8081/asset/findAllAssets',
    method: 'get'
  })
}

export function getAssetByPage(data) {
  return request({
    url: 'http://localhost:8081/asset/findPage',
    method: 'post',
    data
  })
}

