import { Layout, Menu, Popconfirm } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;
const items = [
  { label: "首页", key: "/", icon: <HomeOutlined /> },
  { label: "文章管理", key: "/article", icon: <DiffOutlined /> },
  { label: "创建文章", key: "/publish", icon: <EditOutlined /> },
];

export default function GeekLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const selectedKey = location.pathname;

  // 切换菜单
  const menuClick = (item) => {
    navigate(item.key);
  };

  // 取得用户信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const userName = useSelector((state) => state.user.userInfo.name);

  // 退出登录
  const logout = () => {
    navigate("/login");
    dispatch(clearUserInfo());
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出?"
              okText="退出"
              cancelText="取消"
              onConfirm={logout}
            >
              <LogoutOutlined />
              退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={menuClick}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}
