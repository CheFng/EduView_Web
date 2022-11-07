import request from '@/utils/request'
export function getAssets(data) {
  return request({
    url: '/asset/list/findAllAssets',
    method: 'get',
    data
  })
}
