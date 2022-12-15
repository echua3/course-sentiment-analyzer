import React from "react";
import "../style.less";
import { Form, Input, Table, Pagination, Typography, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { style } from "@mui/system";


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
  const inputNode = <Input.TextArea autoSize={true} />;
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
              message: `Please Input ${title}!`,
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


function UserReviews({actualID}) {


  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [datasource, setDatasource] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [params, setParams] = useState({
    comment: '',
    userID: actualID
  });

  const isEditing = (record) => record.reviewID === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      newreview: '',
      ...record,
    });
    setEditingKey(record.reviewID);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...datasource];
      const index = newData.findIndex((item) => key === item.reviewID);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDatasource(newData);
      setEditingKey('');

      params.newreview = row.comment
      let test={...params}
      setParams(test)

      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/update/" + item.reviewID, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify(params),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      if(!response.ok) {
        console.log('!response.ok')
      } else {
        console.log(response)
      }



    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const changePage = async (CurrentPage)=>{
    setCurrentPage(CurrentPage)
    pagination.current = {currentPage}
    let test={...pagination}
    setPagination(test)
  }
  const [pagination, setPagination] = useState({onChange:changePage});

  useEffect( () => {
    async function getRecords() {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/review/" + actualID+ "/" + pageNumber)
      if(!response.ok) {
        console.log('here')
        console.log("Error:" + response.statusText);
        return;
      }
      const res = await response.json();

      setDatasource('')
      pagination.total = res.data.numberTotal
      pagination.current = {currentPage}
      let test={...pagination}
      setPagination(test)
      setDatasource(res.data);
    }
    getRecords();

    return;
  }, [window.userID]);


  const columns = [
    {
      title: 'Course Number',
      dataIndex: 'OfferingName',
      key: 'OfferingName',
      width: '10%',
    },
    {
      title: 'Course Title',
      dataIndex: 'Title',
      key: 'Title',
      width: '20%',
    },
    {
      title: 'Instructors',
      dataIndex: 'Instructors',
      key: 'Instructors',
      width: '10%',
    },
    {
      title: 'Review',
      dataIndex: 'comment',
      width: '40%',
      key: 'comment',
      editable: true,
      render: text => {
        return <span dangerouslySetInnerHTML={{__html: text}}></span>
      }
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      width: '7%',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      width: '5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.reviewID)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          {/* <Typography.Link onClick={() => edit(record)}> */}

            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete',
      key: 'delete',
      width: '5%',
      render: (_, record) => (
          <a onClick={(e) => { onDelete(record, e); }}>Delete</a>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'classID',
      key: 'classID',
      width: '10%',
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

  const deleteRequest = async (param) => {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/review/delete/" + actualID + "/" + param, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    if(!response.ok) {
      console.log('!response.ok')
    } else {
      console.log(response)
    }
  }

  const onDelete = async (record, e) => {
    e.preventDefault();
    const deleteid = record.reviewID;
    const param = deleteid;
    await deleteRequest(param);
    const data = datasource.filter(item => item.reviewID !== record.reviewID);
    setDatasource(data);
  }

  return (
    <div>
    <div class="userreviews">
    <p class='userreviewstitle'>My Reviews</p>
    {/* <Form onSubmit={onSubmit}> */}
    <Form form={form} component={false}>
    <Table
      className={style.table}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
      rowClassName="editable-row"
      dataSource={datasource}
      columns={mergedColumns.filter(col => col.title !== 'ID')}
      rowKey = "reviewID"
      scroll={{ x: true }}
    />
    </Form>
    </div>
    </div>
  );
}

export default UserReviews;
