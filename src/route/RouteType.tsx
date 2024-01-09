export interface RouteType {
    index?: boolean // 是否为主页
    path?: string;  // 对应路由
    key?: string;    // key值
    element?: React.ReactNode | JSX.Element | null;   // 对应的页面
    // 根据情况使用
    title?: string,
    icon?: React.ReactNode;     // icon图标,如为 url路径 则为string类型
    hidden?: boolean;           // 可用于显示与否,根据情况使用
    children?: RouteType[];     // 子路由数组
}