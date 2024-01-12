/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:38:52
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 14:08:46
 * @Description:
 */
import { request } from "@/utils";
import { getUserInfoAPI } from "./login";
import {
  getSliceListAPI,
  getEventListAPI,
  getSliceDetailAPI,
  getEventDetailAPI,
  getErrorTypeAPI,
  getSliceObsKeyAPI,
  getDataCleanErrorCountAPI,
} from "./rawData";
const getLabels = () =>
  request({
    url: "/common/labels",
    method: "GET",
  });

export {
  getUserInfoAPI,
  getLabels,
  getSliceListAPI,
  getEventListAPI,
  getSliceDetailAPI,
  getEventDetailAPI,
  getErrorTypeAPI,
  getSliceObsKeyAPI,
  getDataCleanErrorCountAPI,
};
