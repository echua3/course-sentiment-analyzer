import React from "react";
import { Button, Descriptions } from "antd";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function UserProfileData({actualID}) {
    const [datasource, setDatasource] = useState([])
    const [userID, setUserID] = useState(window.userID)

    useEffect( () => {
        async function getRecords() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + actualID)
          if(!response.ok) {
            console.log("Error:" + response.statusText);
            return;
          }
          const res = await response.json();
          setDatasource('')
          setDatasource(res.data[0]);
          console.log(res.data[0])
        }
        getRecords();

        return;
    }, [userID]);

    const firstName = datasource.firstName
    const lastName = datasource.lastName
    const degreeType = datasource.degreeType
    const department = datasource.dept
    const interest_1 = datasource.firstInterest
    const interest_2 = datasource.secondInterest
    const interest_3 = datasource.thirdInterest

    return (
        <div className="userprofileForm">
            <p class='userprofiletitle'>My Profile</p>
            <Descriptions
                bordered
                extra={
                <Link to='/ProfileEdit'>
                <Button type="primary" >Edit</Button>
                </Link>
            }
            >
            <Descriptions.Item label="First Name">{firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{lastName}</Descriptions.Item>
            <br />
            <Descriptions.Item label="Degree Type">{degreeType}</Descriptions.Item>
            <Descriptions.Item label="Department">{department}</Descriptions.Item>
            <br />
            <Descriptions.Item label="Interest 1">{interest_1}</Descriptions.Item>
            <Descriptions.Item label="Interest 2">{interest_2}</Descriptions.Item>
            <Descriptions.Item label="Interest 3">{interest_3}</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
        </div>
    )
}


export default UserProfileData;
