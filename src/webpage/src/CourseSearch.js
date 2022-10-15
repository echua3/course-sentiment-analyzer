import "./index.css";
import "./components/Searchbar";
import "./components/WriteReview";
import SearchBar from "./components/Searchbar";
import WriteReview from "./components/WriteReview"

import axios from "axios";
import { message, Table, Card, Row, Col } from "antd";
import React, { useState } from "react";

function CourseSearch() {

  const [datasource,setDatasource]=useState([])
  const [keys,expandedKeys]=useState([])

  const columns=[
    {
      title: 'School Name',
      dataIndex: 'SchoolName',
      key: 'SchoolName',
    },
    {
      title: 'Offering Name',
      dataIndex: 'OfferingName',
      key: 'OfferingName',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Credits',
      dataIndex: 'Credits',
      key: 'Credits',
    },
    {
      title: 'Instructors',
      dataIndex: 'Instructors',
      key: 'Instructors',
    }, {
      title: 'ID',
      dataIndex: 'SSS_SectionsID',
      key: 'SSS_SectionsID',
      hidden: true
    }
  ]

  const tabListSkeleton = [
    {
      key: 'Rating',
      tab: 'Rating',
    },
    {
      key: 'ReviewSpotlight',
      tab: 'Review Spotlight',
    },
    {
      key: 'AddAReview',
      tab: 'Add A Review',
    },
    {
      key: 'ViewAllReviews',
      tab: 'View All Reviews',
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    Rating: <p>Add Rating Feature Here</p>,
    ReviewSpotlight: <p>Add Review Spotlight Feature Here</p>,
    AddAReview: <WriteReview> record = [recordValue] </WriteReview>,
    ViewAllReviews: <p>Add View All Review Feature Here</p>,
  };

  const [activeTabKey, setActiveTabKey] = useState('app');
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const [recordValue, setRecord] = useState([]);

  const onTab2Change = (key) => {
    setActiveTabKey(key);
  };

  function onSubmit(values){
    const { CourseTitle, CourseNumber, Credits, Department } = values;
    //
    const opt = {
      method: "GET",
      params:{CourseTitle,CourseNumber, Credits, Department},
      url: `/api/classes?key=9N7pYLkUVHSf8xzgFWMK5Cv7jnmQAzFo`,
    };
    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setDatasource(res.data)
          // message.success("Login succeed! ");
        }
      })
      .catch((err) => {
        console.log("failed: ", err.message);
      });
}

const onTableRowExpand = (expanded, record) => {
  const keys = [];
  if(expanded){
      keys.push(record.SSS_SectionsID); // I have set my record.id as row key. Check the documentation for more details.
  }

  setRecord(record.SSS_SectionsID);
  setExpandedRowKeys(keys);
}

  return (
    <div className="App">
      <SearchBar  onFinish={onSubmit}/>
      <Table
      dataSource={datasource}
      columns={columns.filter(col => col.title !== 'ID')}
      rowKey = "SSS_SectionsID"
      expandable={{
        expandedRowRender: record => <Card
        style={{ width: '100%' }}
        tabList={tabListSkeleton}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<a href="#">More</a>}
        onTabChange={key => {
          onTab2Change(key);
          setRecord(record.SSS_SectionsID);
        }}
      >
        {contentList[activeTabKey]}
      </Card>,
        rowExpandable: record => record.OfferingName + record.SchoolName + record.Title + record.Instructors !== 'Not Expandable',
      }}
      expandedRowKeys={expandedRowKeys}
      onExpand={onTableRowExpand}

      />
    </div>
  );
}
export default CourseSearch;
