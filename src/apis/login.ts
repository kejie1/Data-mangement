/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:36:15
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-09 15:38:38
 * @Description:
 */
import { request } from "@/utils";

const getUserInfoAPI = (data) =>
  request({
    url: "/HHUser/sso/getUserInfo?code=ST-449061-ByojnyxYM1m70Fu4lfIR",
    method: "GET",
    data,
  });

export { getUserInfoAPI };
