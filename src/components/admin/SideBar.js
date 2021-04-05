import React from 'react'
import { Menu } from 'antd'
import {
  BarChartOutlined,
  HomeFilled,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { NavLink, withRouter } from 'react-router-dom'
import SideIcon from './icons/SideIcon.svg'
import { connect } from 'react-redux'

const { SubMenu } = Menu

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const SideBar = ({location, shahs}) => {
  const [openKeys, setOpenKeys] = React.useState(['sub1'])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <div className="sideBar none">
      <div className="sideBar_head">
        <h1>
          <img src={SideIcon} alt="side_icon"></img>
        </h1>
        <div style={{ marginLeft: '20px' }}>
          <span>Admin panel</span>
        </div>
      </div>
      <Menu
        mode="inline"
        theme="light"
        style={{display:"flex", flexDirection:"column"}}
        defaultSelectedKeys="1"
        openKeys={openKeys}
        selectedKeys={[location.pathname]}>
        <Menu.Item key="/" icon={<HomeFilled />} selectable={true}>
          <NavLink to="/">Foydalanuvchilar</NavLink>
        </Menu.Item>
        <Menu.Item key="/izohlar" icon={<HomeFilled />} selectable={true}>
          <NavLink to="/izohlar">Izohlar</NavLink>
        </Menu.Item>
        
      </Menu>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    shahs: state.labbay.shahs
  }
}
export default connect(mapStateToProps, {})(withRouter(SideBar))
