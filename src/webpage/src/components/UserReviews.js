import React from "react";
import { Form, Input, Table, Pagination, Typography, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

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


function UserReviews(props) {


  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [recordValues, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [userID, setUserID] = useState(window.userID);
  const [datasource, setDatasource] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [params, setParams] = useState({
    comment: '',
    userID: window.userID
  });

  const isEditing = (record) => record.reviewID === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      newreview: '',
      ...record,
    });
    setEditingKey(record.reviewID);
    // setEditingKey(record.key);

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
      // console.log('row.comment')
      // console.log(row.comment)
      // console.log('index')
      // console.log(index)
      // console.log('newdata')
      // console.log(newData)
      // console.log('item.reviewID')
      // console.log(item.reviewID)

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
        // const records = await response.json();
        // console.log(records);
        // const basicMessage = records.error.message.split(/:(.*)/s)
        // const allErrors = basicMessage[1].split(",")
        // console.log(allErrors)
        // allErrors.forEach(runErrorMessaging);
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
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/review/" + window.userID + "/" + pageNumber)
      if(!response.ok) {
        const message = "An error occured"
        console.log('here')
        console.log("Error:" + response.statusText);
        return;
      }
      const res = await response.json();
      // console.log(records.data);

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
    },
    {
      title: 'Course Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Instructors',
      dataIndex: 'Instructors',
      key: 'Instructors',
    },
    {
      title: 'Review',
      dataIndex: 'comment',
      key: 'comment',
      editable: true,
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty'
    },
    // {
    //   title: 'Score',
    //   dataIndex: 'score',
    //   key: 'score',
    // },
    // {
    //   title: 'Helpfulness',
    //   dataIndex: 'helpfulness',
    //   key: 'helpfulness',
    // },
    {
      title: 'Edit',
      dataIndex: 'edit',
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
      render: (_, record) => (
          <a onClick={(e) => { onDelete(record, e); }}>Delete</a>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'classID',
      key: 'classID',
    },
  ];

  // setEditingKey('')
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
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/review/delete/" + window.userID + "/" + param, {
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
      // setProfile(true)
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
    <Table className="userreviewstable"
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
      // pagination={{
      //   onChange: cancel,
      // }}
    />
    </Form>
    </div>
    </div>
  );
}


export default UserReviews;
