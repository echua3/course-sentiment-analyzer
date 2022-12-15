import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseTable from "./CourseTable";
import ResultPrompts from "./ResultPrompts";
import CompoSelection from "./CompoSelection";
import "./style/css/CourseComponent.scss"

function SearchBar(props) {

  const onSubmit = async (e)=> {
    e.preventDefault();
    let test={...params}
    setParams(test)
    if (!params.CourseNumber && !params.CourseTitle && !params.Credits && !params.Department) {
      return
    }
    startLoading(0)
    await requestData(test)
    endLoading(0)
  }

  const changePage = async (currentPage)=>{
    params.currentPage = currentPage
    let test={...params,currentPage}
    setParams(test)
    await requestData(params)
  }

  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [pagination, setPagination] = useState({onChange:changePage, showSizeChanger:false});
  const [loadings, setLoadings] = useState([]);
  const [resstatus, setResstatus] = useState('info')
  const [restitle, setRestitle] = useState('No data received')
  const [ressub, setRessub] = useState('Please enter data')
  const [form_1] = Form.useForm();

  const [params, setParams] = useState({
    CourseTitle: '',
    CourseNumber: '',
    Credits:'',
    Department:'',
    currentPage:1,
    total:1
  })

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  // for form validation
  const validateMessages = {
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      min: '${label} must be at least ${min}',
    },
  };

  const requestData= async (params)=>{
    // edited for development and deployment usage
      async function fetchData() {
        let url = process.env.REACT_APP_API_ENDPOINT + "/totalclasscount?"
        if(params.CourseTitle) {
          url += "CourseTitle=" + params.CourseTitle + "&"
        }
        if(params.Department) {
          url += "Department=" + params.Department + "&"
        }
        if(params.CourseNumber) {
          url += "CourseNumber=" + params.CourseNumber + "&"
        }
        if(params.Credits) {
          url += "Credits=" + String(params.Credits) + "&"
        }

        const responseValue = await fetch(url)
        console.log(url)
        if(!responseValue.ok) {
          const message = "An error occured"
          console.log("Error:" + responseValue.statusText);
          window.userID = "";
          return;
        } else {
          const records = await responseValue.json();
          params.total = records.Count;
          console.log("total", params.total)
          let test = params;
          setParams(test);
          if(records) {
            console.log("Gets here?")
            await axios.get(API_ENDPOINT + "/api/courselist", {params})
            .then((res) => {
              if (res.status === 200) {
                setDatasource('')
                pagination.total = 0
                pagination.current = params.currentPage
                let test={...pagination}
                setPagination(test)

                if (res.data.code == 400) {
                  if (res.data.msg=="Credits need to be numbers!") {
                    // message.error(res.data.msg)
                    setResstatus('error');
                    setRestitle('Data type error');
                    setRessub('Credits need to be numbers!')
                  } else if (res.data.msg=="The format of the Course Number is incorrect") {
                    // message.error(res.data.msg)
                    setResstatus('error');
                    setRestitle('Data format error!');
                    setRessub('The format of the Course Number is incorrect')
                  }
                  pagination.total = 0
                  pagination.current = params.currentPage
                  let test={...pagination}
                  setPagination(test)
                } else if(res.data.code==200){
                  if (res.data.numberTotal==0) {
                    // message.info("No course found!");
                    setResstatus('info');
                    setRestitle('No course found!');
                    setRessub('Please enter the correct information')
                  }
                  else{
                    setResstatus('success');
                    setRestitle('Success');
                    setRessub('Above is the course list')
                    setDatasource(res.data.data)
                    console.log(res.data)
                    pagination.total = res.data.numberTotal
                    pagination.current = params.currentPage
                    let test={...pagination}
                    setPagination(test)
                  }
                }
              }
            })
            .catch((err) => {
              console.log("failed: ", err.message);
            });
          }
        }

      }


    await fetchData().catch(console.error);


  }

  const onReset = async () => {
    startLoading(1)
    form.resetFields()
    endLoading(1)
    params.CourseNumber = ''
    params.CourseTitle = ''
    params.Credits = ''
    params.Department = ''
    params.currentPage = 1
    setResstatus('info');
    setRestitle('No data received');
    setRessub('Please enter the data')

    // edited for development and deployment usage
    await axios.get(process.env.REACT_APP_API_ENDPOINT+ "/api/courselist")
    .then((res) => {
      if (res.status === 200) {
        setDatasource('')
        pagination.total = 0
        pagination.current = params.currentPage
        let test={...pagination}
        setPagination(test)
      }
    })
    .catch((err) => {
      console.log("failed: ", err.message);
    });
  };


  const startLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  }

  const endLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  }


  return (
    <div class='searchPage'>
      <div class="searchbar">

        <Form form={form} validateMessages={validateMessages}>
          <Form.Item name="CourseTitle" label="Course Title">
            <Input
              placeholder="(any part of title)"
              onChange={e => {params.CourseTitle = e.target.value
                              params.currentPage = 1}}
              value={params.CourseTitle}
              onPressEnter={onSubmit}
              maxLength={100}
            />
          </Form.Item>
          <Form.Item name="CourseNumber" label="Course Number">
            <Input
              placeholder="e.g. AS.100.495 or partial like 495"
              onChange={e => {params.CourseNumber = e.target.value
                              params.currentPage = 1}}
              value={params.CourseNumber}
              onPressEnter={onSubmit}
              maxLength={15}
            />
          </Form.Item>
          <Form.Item name="Credits" label="Credits" >
            <Input
              type="number"
              min="0"
              placeholder="e.g. 3"
              onChange={e => {params.Credits = e.target.value
                              params.currentPage = 1}}
              value={params.Credits}
              onPressEnter={onSubmit}
              maxLength={2}
            />
          </Form.Item>
          <Form.Item name="Department" label="Department">
          <Select placeholder="Please Select" onChange={e =>{params.Department = e
                                                            params.currentPage = 1}} >
            <Select.Option value="">
              All
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
            <Button className='submit' type="primary" htmlType="submit" loading={loadings[0]} onClick={onSubmit}>Submit</Button>
        {/* <Button type="primary" htmlType="submit" onClick={onSubmit} loading={loadings[2]}>Submit</Button> */}
            <Button className='Reset' htmlType="button" loading={loadings[1]} onClick={onReset}>Reset</Button>
          </Form.Item>

        </Form>
      </div>

      <Form form={form_1}>
      <CompoSelection status={resstatus} title={restitle} subTitle={ressub} pagination={{...pagination,onChange:changePage}} data={datasource}/>
      {/* <ResultPrompts status={resstatus} title={restitle} subTitle={ressub}/> */}
      </Form>
      <CourseTable pagination={{...pagination,onChange:changePage}} data={datasource}/>

    </div>
  );
}

export default SearchBar;