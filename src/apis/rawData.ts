/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 13:20:47
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 17:48:24
 * @Description:
 */
import { request } from "@/utils";

export const getSliceListAPI = (data) => {
  return request({
    url: "/v1/ori/recording-segments",
    method: "POST",
    data,
  });
};
export const getEventListAPI = (data) => {
  return request({
    url: "/v1/ori/eventsList",
    method: "POST",
    data,
  });
};
