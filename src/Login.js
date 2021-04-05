import React, { useState } from 'react'
import 'antd/dist/antd.css'
import './Login.css'
import Logo from './Photos/bitiruvchilLogo.svg'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {getLogin} from './actions/userActions'
function Login({ getLogin, loading}) {
  const onFinish = (values) => {
    getLogin(values)
  }
  return (
    <section id="background-login">
      <div id="login-div">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: 'Iltmos, Loginni kiriting!',
              },
            ]}
          >
            <Input
              style={{backgroundColor:"#F2F6FE"}}
              className="input-login"
              prefix={<UserOutlined className="site-form-item-icon" style={{color:"blue"}}/>}
              placeholder="Login"
            />
          </Form.Item>
          <Form.Item
            name="parol"
            rules={[
              {
                required: true,
                message: 'Iltmos, Parolni kiriting!',
              },
            ]}
          >
            <Input
              style={{backgroundColor:"#F2F6FE"}}
              className="input-login"
              prefix={<LockOutlined className="site-form-item-icon" style={{color:"blue"}}/>}
              type="password"
              placeholder="Parol"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" id="login-button"  loading={loading}>
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
const mapStateToProps = state => {
  return {
    loading: state.labbay.authLoading
  }
}
export default connect(mapStateToProps, {getLogin})(Login)
