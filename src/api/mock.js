import Mock from "mockjs"
import homeApi from "./mockServerData/home"

//定义mock请求拦截
//首页获取数据模拟
Mock.mock("http://localhost:8080/api/home/getData", "get", homeApi.getHomeData)
