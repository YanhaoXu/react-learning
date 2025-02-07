import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Radio,
  Select,
  DatePicker,
  Button,
  Table,
  Tag,
  Space,
  Form,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import img404 from "@/assets/error.png";
// 引入汉化包 时间选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN";
import { delArticleAPI, fetchArticleListAPI } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";
import { Popconfirm } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Article() {
  // 获取频道列表
  const { channelList } = useChannel();
  const navigate = useNavigate();
  // 定义状态枚举
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };
  // 准备数据列表
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      rander: (data) => status[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDeleteArticle(data)}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 筛选功能
  // 1. 准备参数
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  // 文章列表数据管理
  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(0);
  const fetchArticleList = async (reqData = {}) => {
    const res = await fetchArticleListAPI(reqData);
    setArticleList(res.data.results);
    setCount(res.data.total_count);
  };

  // 获取文章列表
  useEffect(() => {
    fetchArticleList();
  }, [reqData]);

  // 2. 获取筛选数据
  const onFinish = async (formValue) => {
    console.log("formValue", formValue);
    // 3. 把表单收集到数据放到参数中(不可改变的方式)
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formValue.date[1].format("YYYY-MM-DD"),
    });
    // 4. 重新拉去文章列表 + 渲染table逻辑重复的  - 复用
    // reqData依赖项发生变化, 重复执行副作用函数
  };

  // 分页
  const pageChange = (page) => {
    console.log("page", page);
    setReqData({
      ...reqData,
      page,
    });
  };

  // 删除
  const onDeleteArticle = async (data) => {
    console.log("删除data", data);
    await delArticleAPI(data.id);
    setReqData({
      ...reqData,
    });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: <Link to="/">首页</Link>,
              },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBotton: 20 }}
      >
        <Form
          initialValues={{ status: "", channel_id: null }}
          onFinish={onFinish}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={1}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示 */}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果:`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList}
          pagination={{
            current: reqData.page,
            pageSize: reqData.per_page,
            total: articleList.total_count,
            onChange: pageChange,
          }}
        ></Table>
      </Card>
    </div>
  );
}
