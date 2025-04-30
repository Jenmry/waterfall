import http from "@/utils/request"

//获取首页的统计数据
export function getHomeData() {
    return http({
        method: "get",
        url: "/api/home/getData"
    })
}
