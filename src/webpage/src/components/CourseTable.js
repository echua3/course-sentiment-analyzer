import WriteReview from "./WriteReview";
import CourseSummary from "./CourseSummary";
import ReadReview from "./ReadReviews";
import { useState } from "react";
import { Table, Card } from "antd";
import { OmitProps } from "antd/lib/transfer/ListBody";

const CourseTable = (props) => {
    const [keys,expandedKeys]=useState([]);
    const [activeTabKey, setActiveTabKey] = useState('ClassPrompt');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [recordValue, setRecord] = useState([]);
    const [classInfo, setClassInfo]=useState([]);

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
          title: 'Section',
          dataIndex: 'SectionName',
          key: 'SectionName',
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

    const contentList = {
        ClassPrompt: <CourseSummary record = {classInfo}/>,
        AddAReview: <WriteReview record = {recordValue}/>,
        ViewAllReviews: <ReadReview record = {classInfo}/>
    };


    const onTab2Change = (key) => {
        setActiveTabKey(key);
    };

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

    // console.log(props.paginagtion)

    return (
      <div class="coursetable">
        <Table
            pagination={props.pagination}
            dataSource={props.data}
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

export default CourseTable;
