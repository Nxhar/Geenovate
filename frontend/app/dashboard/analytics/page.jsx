import React from 'react'

function page() {
  return (
    <div className='h-screen w-auto overflow-hidden'>
        <iframe title="DASHBOARD1"  style={{width:'120%',marginLeft:'-34px', height:'107vh', backgroundColor:'#000'}} src="https://app.powerbi.com/reportEmbed?reportId=6348cd9d-5ab9-4cf0-b913-f726aa642e73&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
    </div>
  )
}

export default page