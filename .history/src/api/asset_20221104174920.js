import request from '@/utils/request'
export function getAssets() {
  return request({
    url: '/asset/findAllAssets',
    method: 'get'
  })
}
