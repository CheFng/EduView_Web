import request from '@/utils/request'
export function getAssets() {
  return request({
    url: '/dev-api/asset/list/findAllAssets',
    method: 'get'
  })
}
