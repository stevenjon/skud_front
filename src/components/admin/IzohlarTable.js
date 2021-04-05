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

const EditableTable = ({loading, users, fetchIzohlar, izoh}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      izoh: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
    
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      let formData = new FormData();
      formData.append('data', JSON.stringify(row))
      let res = await axios({
        method: 'post',
        url: `${BaseUrl}izohedit/${key}`,
        data: formData
      });
      if(res.status == 200) {
        fetchIzohlar()
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
        url: `${BaseUrl}izohdelete/${record.id}`,
      });
      if(res.status == 200) {
        fetchIzohlar()
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
      title: 'F.I.O',
      dataIndex: 'user_id',
      width: '20%',
      render: (text)=> users.filter(user=> user.id == text)[0].fio
    },
    {
      title: 'Izoh turi',
      dataIndex: 'izoh_turi',
      width: '15%',
      render:(text)=> {
          if(text == 1) {
            return "Келмагани учун"
          }else if(text == 2) {
            return "Кеч қолганлиги учун"
          }else {
            return "Эрта кетгани учун"
          }
      }
    },
    {
      title: 'Sana',
      dataIndex: 'time',
      width: '15%',
    },
    
    {
      title: 'Izoh',
      dataIndex: 'izoh',
      width: '35%',
      editable: true,
    },
    {
      title: 'Amal',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Saqlash
            </a>
           
              <a onClick={cancel}>Bekor qilish</a>
            
          </span>
        ) : (
            <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
        dataSource={izoh}
        columns={mergedColumns}
        searchableProps={{ fuzzySearch: true, inputProps: {
          placeholder: "Қидириш",
          prefix: <SearchOutlined />,
        }, }} 
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />    
    </Form>
  );
};
export default EditableTable