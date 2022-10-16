import "./index.css";
import "./components/Searchbar";
import "./components/WriteReview";
import SearchBar from "./components/Searchbar";
import WriteReview from "./components/WriteReview";
import CourseSummary from "./components/CourseSummary";
import ReadReview from "./components/ReadReviews";
import axios from "axios";
import { message, Table, Card, Row, Col, Icon} from "antd";
import React, { useState } from "react";

function CourseSearch() {

  const [datasource,setDatasource]=useState([])
  const [keys,expandedKeys]=useState([])
  const [activeTabKey, setActiveTabKey] = useState('ClassPrompt');
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const [recordValue, setRecord] = useState([]);

  const [classInfo, setClassInfo]=useState([])


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
      key: 'ClassPrompt',
      tab: 'Class Summary',
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
    ClassPrompt: <CourseSummary record = {classInfo}/>,
    AddAReview: <WriteReview record = {recordValue}/>,
    ViewAllReviews:<ReadReview record = {classInfo}/>
  };

  
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
  setClassInfo(record);
  setExpandedRowKeys(keys);
  setActiveTabKey('ClassPrompt')
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

        onTabChange={key => {
          onTab2Change(key);
          setRecord(record.SSS_SectionsID);
          setClassInfo(record);
          
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
