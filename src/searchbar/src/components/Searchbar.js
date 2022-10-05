import React from "react";
import { Form, Input, Button } from "antd";


function SearchBar(props) {
  // const [id, setId] = useState("");
  // const [cname, setCname] = useState("");
  return (
    <Form onFinish={props.onFinish}>
      <Form.Item name="CourseTitle" label="Course Title">
        <Input placeholder="CourseTitle" />
      </Form.Item>
      <Form.Item name="CourseNumber" label="Course Number">
        <Input placeholder="CourseNumber" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}


export default SearchBar;
