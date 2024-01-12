/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-12 15:56:45
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 16:10:18
 * @Description:
 */
import { message } from "antd";

// 复制
export function copyText(value: Array<string> | string) {
  // 创建元素用于复制
  var aux = document.createElement("textarea");
  aux.value = typeof value == "string" ? value : value.join("\n");
  // 将元素插入页面进行调用
  document.body.appendChild(aux);

  // 复制内容
  aux.select();

  // 将内容复制到剪贴板
  document.execCommand("copy");

  // 删除创建元素
  document.body.removeChild(aux);

  message.success("复制成功");
}
