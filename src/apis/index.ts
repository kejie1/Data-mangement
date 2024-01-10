/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:38:52
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-10 17:49:05
 * @Description:
 */
import { request } from "@/utils";
import { getUserInfoAPI } from "./login";
import { getSliceListAPI, getEventListAPI } from "./rawData";
const getLabels = () =>
  request({
    url: "/common/labels",
    method: "GET",
  });

export { getUserInfoAPI, getLabels, getSliceListAPI, getEventListAPI };
