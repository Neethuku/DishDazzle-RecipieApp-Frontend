import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDash from '../Components/AdminDash';
import { useLocation } from 'react-router-dom';
import DashUsers from '../Components/DashUsers';
import DashPosts from '../Components/DashPosts';
import DashComments from '../Components/DashComments';


function Dashboard() {
  const location=useLocation()
  const [tab,setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <>
      <Row className="dashboard-row">
        <Col xs={12} md={2} className="sidebar-col ">
          <DashSidebar />
        </Col>       
        <Col xs={12} md={10} className="profile-col ">
          {tab=== 'dash' && <AdminDash />}
          {tab=== 'profile' && <DashProfile />}
          {tab=== 'users' && <DashUsers />}
          {tab=== 'posts' && <DashPosts />}
          {tab=== 'comments' && <DashComments />}
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
