import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout title="Dashboard - Orders">
    <div className="row  m-3 p-3">
      <div className="col-md-3">
       <UserMenu/>
      </div>
      <div className="col-md-9">
        <h1>Your Orders</h1>
      </div>
    </div>
  </Layout>
  )
}

export default Orders