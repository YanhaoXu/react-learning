import { Card, Form, Input, Button } from "antd";
import "./index.scss";
import logo from "@/assets/logo.png";
export default function Login() {
  const onFinish = (formValues) => {
    console.log("formValues", formValues);
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="moblie"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式不正确" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="name"
            validateTrigger={["onBlur"]}
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
