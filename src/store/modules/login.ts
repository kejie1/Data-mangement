/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-09 15:31:50
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-09 17:58:21
 * @Description:
 */
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getUserInfoAPI } from "@/apis";
import { setToken } from "@/utils";
interface UserInfoItf {
  id: number;
  name: string;
  roleInfo: RoleInfo[];
  menuInfo: MenuInfo[];
}

interface MenuInfo {
  id: string;
  name: string;
  path: string;
  children?: Child[];
}

interface Child {
  id: string;
  name: string;
  path: string;
}

interface RoleInfo {
  name: string;
  id: number;
}
const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: {} as UserInfoItf,
  },
  reducers: {
    setUserInfo(state, action) {
      // const user = action.payload[0];
      // state.userInfo = user.userInfo;
      // setToken(user.accessToken);
      state.userInfo = {
        id: 290,
        name: "黄川东",
        roleInfo: [
          {
            name: "superAdmin",
            id: 1,
          },
        ],
        menuInfo: [
          {
            id: "1",
            name: "原始数据",
            path: "/original",
            children: [
              {
                id: "2",
                name: "高速数据查询",
                path: "/dataQuery",
              },
              {
                id: "103",
                name: "泊车数据查询",
                path: "/parkingDataQuery",
              },
              {
                id: "104",
                name: "路试问题与轨迹",
                path: "/problemDistribution",
              },
            ],
          },
          {
            id: "3",
            name: "SIL",
            path: "/sil",
            children: [
              {
                id: "5",
                name: "数据预处理",
                path: "/retrieve",
              },
              {
                id: "6",
                name: "数据集合",
                path: "/testSet",
              },
              {
                id: "7",
                name: "数据回灌结果",
                path: "/recharge",
              },
            ],
          },
          {
            id: "8",
            name: "场景分类模型",
            path: "/sceneType",
            children: [
              {
                id: "9",
                name: "视频切片",
                path: "/videoSlice",
              },
              {
                id: "10",
                name: "场景分类结果",
                path: "/result",
              },
            ],
          },
          {
            id: "99",
            name: "用户管理",
            path: "/users",
          },
          {
            id: "100",
            name: "权限管理",
            path: "/auth",
          },
          {
            id: "101",
            name: "感知",
            path: "/perception",
            children: [
              {
                id: "102",
                name: "7v数据预处理",
                path: "/preprocessing",
              },
            ],
          },
        ],
      };
      setToken(
        "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwZTE1YzBiOS01NjdmLTQ3MzItYmI3Zi0wMTY2MzQ0NGQ3N2QiLCJzdWIiOiJ7XCJ1c2VySW5mb1wiOjI5MCxcImFjY2Vzc1Rva2VuXCI6XCJQQVQtNDQ5NTk1LW9OYlBUZXRINnFieDNPMXZLSjl3Q1NnTkE1TnFtb3ptQUdhaVVicXRiaUFlaHVvenk5XCJ9IiwiaXNzIjoiYWRtaW4iLCJpYXQiOjE3MDQ3OTI1MTIsImV4cCI6MTcwNDc5NjExMn0.G0W6VsdTnbxobpFUGHDreb0b4-tRi4URG9E9CKupIjw"
      );
    },
  },
});

const { setUserInfo } = loginSlice.actions;

const fetchUserInfo = (data) => {
  return async (dispatch: Dispatch) => {
    const res = await getUserInfoAPI(data);
    dispatch(setUserInfo(res.data));
  };
};

const loginReducer = loginSlice.reducer;
export default loginReducer;
export { fetchUserInfo };
