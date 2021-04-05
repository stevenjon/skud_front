import React, { useState } from 'react';
import { Input, InputNumber, Popconfirm, Form, Typography, message } from 'antd';
import axios from 'axios';
import {Table} from "ant-table-extensions"
import BaseUrl from '../../BaseUrl';
import { Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Iltimos to'ldiring!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({loading, users, fetchUsers, edit}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;


  const save = async (key) => {
    try {
      const row = await form.validateFields();
      let formData = new FormData();
      formData.append('data', JSON.stringify(row))
      let res = await axios({
        method: 'post',
        url: `${BaseUrl}useredit/${key}`,
        data: formData
      });
      if(res.status == 200) {
        fetchUsers()
        setEditingKey('');
      }else {
        message.error("Saqlanmadi")
      }
        
     
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }

    
  };

  const deleteR = async (record) => {
    try {
   
   
      let res = await axios({
        method: 'post',
        url: `${BaseUrl}userdelete/${record.id}`,
      });
      if(res.status == 200) {
        fetchUsers()
        setEditingKey('');
      }else {
        message.error("O'chirildi")
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }

    
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '15%',
    },
    {
        title: 'Foydalanuvchi turi',
        dataIndex: 'bolim',
        render: (text) => {
            if(text == 1) {
                return "Аппарат ҳодимлари"
            }else if(text == 2) {
              return "Ёрдамчи персонал"
            }else {
              return "belgilanmagan"
            }
        },
        width:"25%"
    },
    {
      title: 'F.I.O',
      dataIndex: 'fio',
      width: '20%',
    },
    {
      title: 'Lavozim',
      dataIndex: 'lavozim',
      width: '10%',
    },
    {
        title: 'Rasm',
        dataIndex: 'rasm',
        width: '15%',
        render: (text)=> {
            return  <Avatar size={64} src={BaseUrl+text} icon={<UserOutlined />} />
        }
      },
    {
      title: 'Amal',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return  (
            <>
          <Typography.Link onClick={() => edit(record)}>
            O'zgartirish
          </Typography.Link>
          &nbsp;
          <Popconfirm title="Ochirilsinmi ?" onConfirm={()=> deleteR(record)}>
                <a style={{color:"red"}} disabled={editingKey !== ''}>
                     O'chirish
                </a>
            </Popconfirm>
        </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        loading={loading}
        dataSource={users}
        columns={mergedColumns}
        searchableProps={{ fuzzySearch: true, inputProps: {
          placeholder: "Қидириш",
          prefix: <SearchOutlined />,
        }, }} 
        rowClassName="editable-row"
      />    
    </Form>
  );
};
export default EditableTable