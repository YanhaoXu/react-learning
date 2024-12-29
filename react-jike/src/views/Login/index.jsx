import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, message } from "antd";
import { fetchLogin } from "@/store/modules/user";
import "./index.scss";
import logo from "@/assets/logo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (formValues) => {
    console.log("formValues", formValues);

    // 触发异步action fetchLogin
    await dispatch(fetchLogin(formValues));
    // 1. 跳转到首页
    navigate("/");
    // 2. 提示用户登录成功
    message.success("登陆成功");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="mobile"
            validateTrigger={["onBlur"]}
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式不正确" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
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
