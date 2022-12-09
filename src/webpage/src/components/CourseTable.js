import WriteReview from "./WriteReview";
import CourseSummary from "./CourseSummary";
import ReadReview from "./ReadReviews";
import ChartAnalysis from "./ChartAnalysis"
import { useState, useEffect } from "react";
import { Table, Card } from "antd";
import useWindowDimensions from "./hooks/useWindowDimensions";

const CourseTable = (props) => {
    const [activeTabKey, setActiveTabKey] = useState('ClassPrompt');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [recordValue, setRecord] = useState([]);
    const [classInfo, setClassInfo]=useState([]);
    const [actualID, setActualID] = useState("");
    const { width } = useWindowDimensions();

    const [datasource, setDatasource] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
        if(!responseValue.ok) {
              console.log("Error:" + responseValue.statusText);
              window.userID = "";
              return;
        }
        const records2 = await responseValue.json();
        setActualID(records2.data.userId);
        window.userID = actualID;

        async function getRecords() {
          const responseValues2 = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + records2.data.userId, { credentials: 'include'})
          if(!responseValues2.ok) {
            console.log("Error:" + responseValues2.statusText);
            return;
          }
          // console.log(responseValues2)
          await responseValues2.json().then((res) => {
            setDatasource(res.data[0]);
          });

        }

        getRecords();


      }
      fetchData().catch(console.error);



    })

    const columns=[
        {
          title: 'School Name',
          dataIndex: 'SchoolName',
          key: 'SchoolName',
        },
        {
          title: 'Department',
          dataIndex: 'Department',
          key: 'Department',
        },
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
          title: 'Credits',
          dataIndex: 'Credits',
          key: 'Credits',
        },
        {
          title: 'Instructors',
          dataIndex: 'InstructorsFullName',
          key: 'InstructorsFullName',
        },
        {
          title: 'ID',
          dataIndex: 'SSS_SectionsID',
          key: 'SSS_SectionsID',
          hidden: true
        }
      ]

      // media responsiveness
      var tabListSkeleton;
      var tabSize = 'middle';
      if (width > 768) {
        tabListSkeleton = [
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
          {
            key: 'ChartAnalysis',
            tab: 'Course Analysis',
          }
        ];
        tabSize = 'large'
      } else if (width > 580) {
        tabListSkeleton = [
          {
            key: 'ClassPrompt',
            tab: 'Summary',
          },
          {
            key: 'AddAReview',
            tab: 'Add Review',
          },
          {
            key: 'ViewAllReviews',
            tab: 'All Reviews',
          },
          {
            key: 'ChartAnalysis',
            tab: 'Course Analysis',
          }
        ];
        tabSize = 'medium'
      } else {
        tabListSkeleton = [
          {
            key: 'ClassPrompt',
            tab: 'Class',
          },
          {
            key: 'AddAReview',
            tab: 'Add',
          },
          {
            key: 'ViewAllReviews',
            tab: 'Reviews',
          },
          {
            key: 'ChartAnalysis',
            tab: 'Analysis',
          }
        ];
        tabSize = 'small'
      }


    const contentList = {
        ClassPrompt: <CourseSummary record = {classInfo}/>,
        AddAReview: <WriteReview record = {recordValue} actualID = {actualID} datasource = {datasource}/>,
        ViewAllReviews: <ReadReview record = {classInfo}/>,
        ChartAnalysis: <ChartAnalysis record = {classInfo}/>

    };


    const onTab2Change = (key) => {
        setActiveTabKey(key);
    };

    const onTableRowExpand = (expanded, record) => {
        const keys = [];
        if(expanded){
            keys.push(record.SSS_SectionsID);
            // I have set my record.id as row key. Check the documentation for more details.
        }


        setRecord(record.SSS_SectionsID);
        setClassInfo(record);
        setExpandedRowKeys(keys);
        setActiveTabKey('ClassPrompt')
    }

    return (
      <div className="coursetable">
        <Table
            pagination={props.pagination}
            dataSource={props.data}
            columns={columns.filter(col => col.title !== 'ID')}
            rowKey = "SSS_SectionsID"
            expandable={{

            expandedRowRender: record =>
              <Card
                style={{ width: '100%' }}
                tabList={tabListSkeleton}
                tabProps={{size: {tabSize}}}
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
            expandRowByClick={true}
        />

    </div>
  )
}

export default CourseTable;
