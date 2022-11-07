import request from '@/utils/request'
export function getAssets() {
  return request({
    url: '/api/asset/findAllAssets',
    method: 'get'
  })
}
