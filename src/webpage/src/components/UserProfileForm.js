import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function UserProfileForm(props) {
  const [profileSubmitted, setProfile] = useState(false);
  const [form_1] = Form.useForm();
  const [actualID, setActualID] = useState("");

  const navigate = useNavigate()

  const [params, setParams] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    degreeType: '',
    firstInterest: '',
    secondInterest: '',
    thirdInterest: '',
    reviewIDs:'',
    reviewUpvotedIDs: '',
    reviewDownvotedIDs: '',
    dept: '',
  })

  const onFinish = async (values) => {
    // console.log()
    // e.preventDefault();

    let test={...params}
    setParams(test)
    await requestData(test).then(
      navigate('/Profile')
    )
    
  }
  const requestData= async (params)=>{
    // edited for development and deployment usage
    console.log(params)
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/update/" + actualID, {
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
      console.log(await response.json())
      setProfile(true)
    }
  }
 
  const onReset = async () => {
      navigate('/Profile')
        
  };
  async function getRecords(value) {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/info/" + value)
    if(!response.ok) {
      console.log('here')
      console.log("Error:" + response.statusText);
      return;
    }
    const res = await response.json();
    console.log(res.data[0])
    let first = '';
    let second = '';
    let third = '';
    console.log(res.data[0].firstInterest=='')
    console.log(res.data[0].secondInterest=='')
    if (res.data[0].firstInterest==undefined){
      first = ''
    } else {
      first = res.data[0].firstInterest
    }
    if (res.data[0].secondInterest==undefined){
      second = ''
    } else {
      second = res.data[0].secondInterest
    }
    if (res.data[0].thirdInterest==undefined){
      third = ''
    } else {
      third = res.data[0].thirdInterest
    }
    form_1.setFieldsValue({
      FirstName: res.data[0].firstName,
      LastName: res.data[0].lastName,
      StudentDegree: res.data[0].degreeType,
      Department: res.data[0].dept,
      firstInterest: first,
      secondInterest: second,
      thirdInterest: third
    });
  }

  useEffect( () => {
    console.log("DUMMYYYY")
    const fetchData = async () => {
      const responseValue = await fetch(process.env.REACT_APP_API_ENDPOINT + "/currentUser/", { credentials: 'include'})
      if(!responseValue.ok) {
            console.log("Error:" + responseValue.statusText);
            window.userID = "";
            return;
      }
      const records2 = await responseValue.json();
      console.log(records2.data.userId);
      setActualID(records2.data.userId);
      window.userID = actualID;
      
      getRecords(records2.data.userId);
      params.userID = records2.data.userId
      params.firstInterest = records2.data.firstInterest
      params.degreeType = records2.data.degreeType
      let test={...params}
      setParams(test)
    }
    fetchData().catch(console.error);
    

    return;
  }, []);

  console.log(params.firstInterests==undefined)
  console.log(params.secondInterests)

  return (
    <div>
    <div class="userprofile">
    <p class='userprofiletitle'>Please update your profile here:</p>
    {/* <Form onSubmit={onSubmit}> */}
    <Form
      form={form_1}
      onFinish={onFinish}
    >
      <Form.Item name="FirstName" label="First Name" >
        <Input
          placeholder="Firstname"
          // onChange={e => {params.firstName = e.target.value}}
          value={params.firstName}
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="LastName" label="Last Name">
        <Input
          placeholder="Lastname"
          // onChange={e => {params.lastName = e.target.value}}
          value={params.lastName}
          disabled={true}
        />
      </Form.Item>

      <Form.Item name="StudentDegree" label="Degree Type">
        <Select placeholder="Please Select Your Degree Type" onChange={e => {params.degreeType = e}} value={params.degreeType}>
        <Select.Option value="Undergraduate">
            Undergraduate
          </Select.Option>
        <Select.Option value="Graduate">
            Graduate
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="Department"
        label="Department"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select placeholder="Please Select Your Department" onChange={e =>{params.dept = e}}>

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
      <Form.Item name="text" label="What are you looking for in a course? (order by priority)"></Form.Item>
      <Form.Item
        name="firstInterest"
        label="Interest 1"
        rules={[
          {
            required: true,
            message: 'Please input your interest',
            whitespace: true,
          },
        ]}
        >
        <Input
          placeholder="Research, Team Projects, etc."
          onChange={e => {params.firstInterest = e.target.value}}
          value={params.firstInterest}
        />
      </Form.Item>
      <Form.Item name="secondInterest" label="Interest 2" rules={[{whitespace: true,}]}>
        <Input
          placeholder="Research, Team Projects, etc."
          onChange={e => {params.secondInterest = e.target.value}}
          value={params.secondInterest}
        />
      </Form.Item>
      <Form.Item name="thirdInterest" label="Interest 3" rules={[{whitespace: true,}]}>
        <Input
          placeholder="Research, Team Projects, etc."
          onChange={e => {params.thirdInterest = e.target.value}}
          value={params.thirdInterest}
        />
      </Form.Item>

      <Form.Item className='buttons'>
        {/* <Link to='/Profile'> */}
        <Button className='submit' type="primary" htmlType="submit" >Save changes</Button>
        {/* </Link> */}
        <Button className='reset' htmlType="button" onClick={onReset}>Cancel</Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
}
export default UserProfileForm;