/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-08 13:20:47
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 15:18:39
 * @Description:
 */
import { request } from "@/utils";

export const getErrorTypeAPI = () =>
  request({
    url: "/v1/ori/getDataCleanErrorTypes",
    method: "GET",
  });
export const getSliceListAPI = (data, pagination) =>
  request({
    url: "/v1/ori/recording-segments",
    method: "POST",
    data: { postData: data, ...pagination },
  });
export const getEventListAPI = (data, pagination) =>
  request({
    url: "/v1/ori/eventsList",
    method: "POST",
    data: { postData: data, ...pagination },
  });

export const getSliceDetailAPI = (data) =>
  request({
    url: `v1/ori/recording-segments/${data}`,
    method: "GET",
  });
export const getEventDetailAPI = (data) =>
  request({
    url: "/v1/ori/eventsDetail",
    method: "POST",
    data: { postData: data },
  });
export const getDataCleanErrorCountAPI = (data) =>
  request({
    url: "/v1/ori/getDataCleanErrorCount",
    method: "POST",
    data: { postData: data },
  });
export const getSliceObsKeyAPI = (params) =>
  request({
    url: `/v1/ori/segmentObsKey/${params}`,
    method: "GET",
  });
