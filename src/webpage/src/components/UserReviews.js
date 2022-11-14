import React from "react";
import { Form, Input, Table, Tag, Space, Pagination } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";


function UserReviews(props) {


  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [recordValues, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [userID, setUserID] = useState('af3');
  const [datasource, setDatasource] = useState([]);


  const changePage = async (CurrentPage)=>{
    setCurrentPage(CurrentPage)
    pagination.current = {currentPage}
    let test={...pagination}
    setPagination(test)
  }
  const [pagination, setPagination] = useState({onChange:changePage});

  // console.log({userID}.userID);
  useEffect( () => {
    async function getRecords() {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/review/" + {userID}.userID + "/" + pageNumber)
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
      console.log('res.data');
      console.log(res.data);
      setDatasource(res.data);
    }
    getRecords();

    return;
  }, [{userID}.userID]);


  const columns = [
    {
      title: 'Course Number',
      dataIndex: 'OfferingName',
      key: 'OfferingName',
      // render: (text) => <a>{text}</a>,
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
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Helpfulness',
      dataIndex: 'helpfulness',
      key: 'helpfulness',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: 'ID',
      dataIndex: 'classID',
      key: 'classID',
    },
  ];

  return (
    <div>
    <div class="userreviews">
    <p class='userreviewstitle'>My Reviews</p>
    {/* <Form onSubmit={onSubmit}> */}
    <Table className="userreviewstable"
      // pagination={{...pagination,onChange:changePage}}
      dataSource={datasource}
      columns={columns.filter(col => col.title !== 'ID')}
      rowKey = "classID"
    />

    </div>
    </div>
  );
}


export default UserReviews;
