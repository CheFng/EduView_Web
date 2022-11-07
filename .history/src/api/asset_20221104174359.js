import request from '@/utils/request'
export function getAssets() {
  return request({
    url: 'http://localhost:9527/dev-api/asset/findAllAssets',
    method: 'get'
  })
}
