import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { useState } from "react";
import axios from "axios";


function UserProfileData(props) {

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const onSubmit = async (e )=> {
    e.preventDefault();
    let test={...params}
    setParams(test)
    // await requestData(test)
    console.log("onsubmit")
    console.log(params)
    // enterLoading(2)
  }

  // const changePage = async (currentPage)=>{
  //   console.log('before changepage')
  //   console.log(currentPage)
  //   console.log(params.Department)

  //   params.currentPage = currentPage
  //   let test={...params,currentPage}
  //   setParams(test)
  //   await requestData(params)

  //   console.log('after changepage')
  //   console.log(currentPage)
  //   console.log(test)
  //   console.log(params)
  // }

  // new onSubmit with mongodb

  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  // const [pagination, setPagination] = useState({onChange:changePage});
  const [params, setParams] = useState({
    Department:'',
    UserID:  '', 
    Email: '',
    FirstName: '',
    LastName: '',
    UserType: '',
    Interests: '',
    CourseExpectation: '',
  })


  // const requestData= async (params)=>{
  //   await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/courselist", {params})
  //   .then((res) => {
  //     if (res.status === 200) {
  //       setDatasource('')
  //       setDatasource(res.data.data)
  //       setPagination('')
  //       pagination.total = res.data.numberTotal
  //       let test={...pagination}
  //       setPagination(test)
  //       console.log("req")
  //       console.log(pagination)
  //       // message.success("Login succeed! ");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("failed: ", err.message);
  //   });
  // }

  const onReset = async () => {
    params.Department = ''
    params.UserID = ''
    params.FirstName = ''
    params.LastName = ''
    params.UserType = ''
    params.Interests = ''
    params.CourseExpectation = ''
    let test={...params}
    setParams(test)
    form.resetFields();
    // await requestData(params)
  };


  // const onGenderChange = (value) => {
  //   switch (value) {
  //     case 'male':
  //       form.setFieldsValue({
  //         note: 'Hi, man!',
  //       });
  //       return;
  //     case 'female':
  //       form.setFieldsValue({
  //         note: 'Hi, lady!',
  //       });
  //       return;
  //     case 'other':
  //       form.setFieldsValue({
  //         note: 'Hi there!',
  //       });
  //   }
  // };


  return (
    <div>
    <div class="userprofile">
    <p class='userprofiletitle'>Your Profile</p>
    {/* <Form onSubmit={onSubmit}> */}
    <Form>
      <Form.Item name="First Name" label="First Name">
        <Input
          placeholder="Your Initial Name"
          onChange={e => {params.FirstName = e.target.value}}
          value={params.FirstName}
        />
      </Form.Item>
      <Form.Item name="Last Name" label="Last Name">
        <Input
          placeholder="Your Surname"
          onChange={e => {params.LastName = e.target.value
            console.log(e)
            console.log(typeof e.target.value)}}
          value={params.LastName}
        />
      </Form.Item>
      <Form.Item name="Email" label="Email">
        <Input
          placeholder="Your Email Id"
          // onChange={e => {params.Credits = e.target.value}}
          value={params.Email}
          readOnly
        />
      </Form.Item>
      
      <Form.Item name="Student Degree" label="Student Degree">
        <Select placeholder="Please Select Your Degree" onChange={e => {params.Interests = e}} value={params.Interests}>
        <Select.Option value="">
            Please Select One Degree
          </Select.Option>
        <Select.Option value="Undergraduate">
            Undergraduate
          </Select.Option>
        <Select.Option value="Graduate">
            Graduate
          </Select.Option>
        <Select.Option value="Post Doc">
            Post Doc
          </Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="Interests" label="Interests">
        <Select placeholder="Please Select Your Interests" onChange={e => {params.Interests = e}} value={params.Interests}>
        <Select.Option value="">
            Please Select One Interest
          </Select.Option>
        <Select.Option value="Development">
          Development
          </Select.Option>
          <Select.Option value="Research">
            Research
          </Select.Option>
          <Select.Option value="Applications">
            Applications
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="Department" label="Department">
        <Select placeholder="Please Select Your Department" onChange={e =>{params.Department = e}}>
          <Select.Option value="">
            Please Select One Department
          </Select.Option>
          <Select.Option value="AS Agora Institute">
            AS Agora Institute
          </Select.Option>
          <Select.Option value="AS Anthropology">
            AS Anthropology
          </Select.Option>
          <Select.Option value="AS Archaeology">
            AS Archaeology
          </Select.Option>
          <Select.Option value="AS Art">
            AS Art
          </Select.Option>
          <Select.Option value="AS Behavioral Biology">
            AS Behavioral Biology
          </Select.Option>
          <Select.Option value="AS Biology">
            AS Biology
          </Select.Option>
          <Select.Option value="AS Biophysics">
            AS Biophysics
          </Select.Option>
          <Select.Option value="AS Center for Africana Studies">
            AS Center for Africana Studies
          </Select.Option>
          <Select.Option value="AS Center for Language Education">
            AS Center for Language Education
          </Select.Option>
          <Select.Option value="AS Chemistry">
            AS Chemistry
          </Select.Option>
          <Select.Option value="AS Classics">
            AS Classics
          </Select.Option>
          <Select.Option value="AS Cognitive Science">
            AS Cognitive Science
          </Select.Option>
          <Select.Option value="AS Comparative Thought and Literature">
            AS Comparative Thought and Literature
          </Select.Option>
          <Select.Option value="AS Dean's Teaching Fellowship Courses">
            AS Dean's Teaching Fellowship Courses
          </Select.Option>
          <Select.Option value="AS Earth & Planetary Sciences">
            AS Earth & Planetary Sciences
          </Select.Option>
          <Select.Option value="AS East Asian Studies">
            AS East Asian Studies
          </Select.Option>
          <Select.Option value="AS Economics">
            AS Economics
          </Select.Option>
          <Select.Option value="AS English">
            AS English
          </Select.Option>
          <Select.Option value="AS Film and Media Studies">
            AS Film and Media Studies
          </Select.Option>
          <Select.Option value="AS First Year Seminars">
            AS First Year Seminars
          </Select.Option>
          <Select.Option value="AS History">
            AS History
          </Select.Option>
          <Select.Option value="AS History of Art">
            AS History of Art
          </Select.Option>
          <Select.Option value="AS History of Science, Medicine, and Technology">
            AS History of Science, Medicine, and Technology
          </Select.Option>
          <Select.Option value="AS Interdepartmental">
            AS Interdepartmental
          </Select.Option>
          <Select.Option value="AS International Studies">
            AS International Studies
          </Select.Option>
          <Select.Option value="AS Islamic Studies">
            AS Islamic Studies
          </Select.Option>
          <Select.Option value="AS Jewish Studies Program">
            AS Jewish Studies Program
          </Select.Option>
          <Select.Option value="AS Mathematics">
            AS Mathematics
          </Select.Option>
          <Select.Option value="AS Medicine, Science and the Humanities">
            AS Medicine, Science and the Humanities
          </Select.Option>
          <Select.Option value="AS Military Science">
            AS Military Science
          </Select.Option>
          <Select.Option value="AS Modern Languages and Literatures">
            AS Modern Languages and Literatures
          </Select.Option>
          <Select.Option value="AS Music">
            AS Music
          </Select.Option>
          <Select.Option value="AS Near Eastern Studies">
            AS Near Eastern Studies
          </Select.Option>
          <Select.Option value="AS Neuroscience">
            AS Neuroscience
          </Select.Option>
          <Select.Option value="AS Philosophy">
            AS Philosophy
          </Select.Option>
          <Select.Option value="AS Physics & Astronomy">
            AS Physics & Astronomy
          </Select.Option>
          <Select.Option value="AS Political Science">
            AS Political Science
          </Select.Option>
          <Select.Option value="AS Program in Latin American Studies">
            AS Program in Latin American Studies
          </Select.Option>
          <Select.Option value="AS Program in Museums and Society">
            AS Program in Museums and Society
          </Select.Option>
          <Select.Option value="AS Psychological & Brain Sciences">
            AS Psychological & Brain Sciences
          </Select.Option>
          <Select.Option value="AS Public Health Studies">
            AS Public Health Studies
          </Select.Option>
          <Select.Option value="AS Reserved Registrar">
            AS Reserved Registrar
          </Select.Option>
          <Select.Option value="AS Sociology">
            AS Sociology
          </Select.Option>
          <Select.Option value="AS Study of Women, Gender, & Sexuality">
            AS Study of Women, Gender, & Sexuality
          </Select.Option>
          <Select.Option value="AS Theatre Arts & Studies">
            AS Theatre Arts & Studies
          </Select.Option>
          <Select.Option value="AS Writing Program">
            AS Writing Program
          </Select.Option>
          <Select.Option value="AS Writing Seminars">
            AS Writing Seminars
          </Select.Option>
          <Select.Option value="EN Applied Mathematics & Statistics">
            EN Applied Mathematics & Statistics
          </Select.Option>
          <Select.Option value="EN Biomedical Engineering">
            EN Biomedical Engineering
          </Select.Option>
          <Select.Option value="EN Center for Leadership Education">
            EN Center for Leadership Education
          </Select.Option>
          <Select.Option value="EN Chemical & Biomolecular Engineering">
            EN Chemical & Biomolecular Engineering
          </Select.Option>
          <Select.Option value="EN Civil and Systems Engineering">
            EN Civil and Systems Engineering
          </Select.Option>
          <Select.Option value="EN Civil Engineering">
            EN Civil Engineering
          </Select.Option>
          <Select.Option value="EN Computer Science">
            EN Computer Science
          </Select.Option>
          <Select.Option value="EN Doctor of Engineering">
            EN Doctor of Engineering
          </Select.Option>
          <Select.Option value="EN Electrical & Computer Engineering">
            EN Electrical & Computer Engineering
          </Select.Option>
          <Select.Option value="EN Engineering Management">
            EN Engineering Management
          </Select.Option>
          <Select.Option value="EN Environmental Health and Engineering">
            EN Environmental Health and Engineering
          </Select.Option>
          <Select.Option value="EN First Year Seminars">
            EN First Year Seminars
          </Select.Option>
          <Select.Option value="EN General Engineering">
            EN General Engineering
          </Select.Option>
          <Select.Option value="EN Information Security Institute">
            EN Information Security Institute
          </Select.Option>
          <Select.Option value="EN Institute for NanoBio Technology">
            EN Institute for NanoBio Technology
          </Select.Option>
          <Select.Option value="EN Materials Science & Engineering">
            EN Materials Science & Engineering
          </Select.Option>
          <Select.Option value="EN Mechanical Engineering">
            EN Mechanical Engineering
          </Select.Option>
          <Select.Option value="EN Reserved Registrar">
            EN Reserved Registrar
          </Select.Option>
          <Select.Option value="EN Robotics">
            EN Robotics
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item className='buttons'>
        <Button className='submit' type="primary" htmlType="submit" onClick={onSubmit} disabled>Submit</Button>
        {/* <Button type="primary" htmlType="submit" onClick={onSubmit} loading={loadings[2]}>Submit</Button> */}
        <Button className='reset' htmlType="button" onClick={onReset} disabled>Reset</Button>
      </Form.Item>

    </Form>
    </div>
    </div>
  );
}


export default UserProfileData;
