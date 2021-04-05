import React, { useState } from 'react'
import { Drawer, Button, Menu } from 'antd'
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  HomeFilled,
  ProjectFilled,
  WalletFilled,
  UserOutlined,
  MenuUnfoldOutlined,
  WalletOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import { Link, Redirect, Route } from 'react-router-dom'
import SideIcon from './icons/SideIcon.svg'
import {connect} from 'react-redux'
const { SubMenu } = Menu
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const Slider = ({shahs}) => {
  const [visible, setVisible] = useState(false)
  const [openKeys, setOpenKeys] = React.useState(['sub1'])
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <div className="button-div">
        <Button
          type="primary"
          onClick={showDrawer}
          className="DButton"
          style={{ display: 'none' }}
        >
          <MenuUnfoldOutlined style={{ fontSize: 25, padding: 0 }} />
        </Button>
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="sideBar none2">
          <div className="sideBar_head">
            <h1>
              <img src={SideIcon} alt="side_icon"></img>
            </h1>
            <div style={{ marginLeft: '20px' }}>
              <h3>Admin panel</h3>
            </div>
          </div>
          <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys="1"
            style={{display:"flex", flexDirection:"column"}}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            <Menu.Item

              onClick={onClose}
              key="1"
              icon={<HomeFilled />}
              selectable={true}
            >
              <Link to="/">Foydalanuvchilar</Link>  
            </Menu.Item>
            <Menu.Item
              onClick={onClose}
              key="2"
              icon={<HomeFilled />}
              selectable={true}
            >
              <Link to="/izohlar">Izohlar</Link>  
            </Menu.Item>
          
          </Menu>
        </div>
      </Drawer>
    </>
  )
}
const mapStateToProps = state => {
  return {
    shahs: state.labbay.shahs
  }
}
export default connect(mapStateToProps,{})(Slider)
