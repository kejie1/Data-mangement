/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:36:15
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-11 09:55:03
 * @Description:
 */
import { request } from "@/utils";

const getUserInfoAPI = (params) =>
  request({
    url: "/HHUser/sso/getUserInfo",
    method: "GET",
    params,
  });

export { getUserInfoAPI };
