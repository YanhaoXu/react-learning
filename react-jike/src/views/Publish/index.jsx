import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Button,
  Input,
  Breadcrumb,
  Card,
  Form,
  Space,
  Select,
  message,
  Upload,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 引入样式文件

import {
  createArticleAPI,
  getArticleByIdAPI,
  updateArticleAPI,
} from "@/apis/article";
import "./index.scss";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

export default function Publish() {
  // 获取频道列表
  const { channelList } = useChannel();

  // 发布文章
  const onFinish = async (formValue) => {
    console.log("formValue", formValue);

    // 校验封面类型imageType是否和实际的图片列表imageList数量一致
    if (imageType !== imageList.length) {
      return message.warning("封面类型类型和数量不一致");
    }

    // 1. 按照解控文档的格式处理收集到的表单数据
    const { channel_id, content, title } = formValue;
    const data = {
      title,
      content,
      cover: {
        // 封面模式
        type: imageType,
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id,
    };
    // 2. 调用接口提交
    if (articleId) {
      await updateArticleAPI({ ...data, id: articleId });
    } else {
      await createArticleAPI(data);
    }

    message.success("文章发布成功");
  };

  // 上传图片回调
  const cacheImageList = useRef([]);
  const [imageList, setImageList] = useState([]);

  const onUploadChange = (info) => {
    console.log("info.fileList", info.fileList);
    setImageList(info.fileList);
    cacheImageList.current = info.fileList;
  };

  // 控制图片封面类型 type
  const [imageType, setImageType] = useState(1);
  const onTypeChange = (e) => {
    const type = e.target.value;
    console.log("图片 type", type);
    setImageType(type);
    if (type === 1) {
      // 单图 截取第一张图片
      const _imageList = cacheImageList.current[0]
        ? [cacheImageList.current[0]]
        : [];
      setImageList(_imageList);
    } else if (type === 3) {
      // 三图 显示所有图片
      setImageList(cacheImageList.current);
    }
  };

  // 回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  // 获取表单实例
  const [form] = Form.useForm();
  useEffect(() => {
    // 通过id获取数据
    const getArticleDetail = async () => {
      const res = await getArticleByIdAPI(articleId);
      console.log("articleId", articleId);
      const data = res.data;
      const { cover } = res.data;
      console.log("data", data);
      console.log("cover.type", cover.type);
      // 1. 回填表单数据
      form.setFieldsValue({
        ...data,
        type: cover.type,
      });

      // 2. 回填封面图片
      // 封面类型
      setImageType(cover.type);
      // 显示图片 {url:url}
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    };
    // 2. 调用实例方法 完成回填
    // 只有有id才调用此函数回填
    if (articleId) {
      getArticleDetail();
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageList > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}></div> <PlusOutlined />
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
