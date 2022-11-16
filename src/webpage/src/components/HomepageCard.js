import React from "react";
import {useNavigate} from "react-router-dom"
const { Card, Grid } = "antd";


const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };


function HomepageCard() {
  return (
    <Card title="Card Title">
      <Grid style={gridStyle}>Content</Grid>
      <Grid style={gridStyle}>Content</Grid>
    </Card>
    )
  };



export default HomepageCard;
