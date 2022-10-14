import React from "react";
import { Form, Input, Button } from "antd";


function SearchBar(props) {
  // const [id, setId] = useState("");
  // const [cname, setCname] = useState("");
  return (
    <Form onFinish={props.onFinish}>
      <Form.Item name="CourseTitle" label="Course Title">
        <Input placeholder="course title" />
      </Form.Item>
      <Form.Item name="CourseNumber" label="Course Number">
        <Input placeholder="course number" />
      </Form.Item>
      <Form.Item name="Credits" label="Credits">
        <Input placeholder="credits" />
      </Form.Item>
      <Form.Item name="Department" label="Department">
        <Input placeholder="department" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}


export default SearchBar;
