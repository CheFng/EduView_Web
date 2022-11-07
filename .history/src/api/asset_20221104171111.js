import request from '@/utils/request'
export function getAssets() {
  return request({
    url: '/asset/list/findAllAssets',
    method: 'get'
  })
}
