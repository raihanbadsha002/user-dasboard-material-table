import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'


export default function Table() {
    const url="http://localhost:5000/data"

   const [data, setData] = useState([])

   const columns=[
       {title:'Name',field:'name',validate:rowData=>rowData.name===undefined || rowData.name===undefined?"Required":true},
       {title:'UserName',field:'username'},
       {title:'Email',field:'email',validate:rowData=>rowData.email===undefined || rowData.email===undefined?"Required":true},
       {title:'Phone',field:'phone'},
       {title:'Website',field:'website',validate:rowData=>rowData.website===undefined || rowData.website===undefined?"Required":true}
   ]

   useEffect(() => {
    getData()
   }, [])

   const getData = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => setData(data)) 
   }

    return (
        <>
        <div className="container">
           <MaterialTable title="User-Info"
             data={data}
             columns={columns}
             options={{
               actionsColumnIndex:-1,
               addRowPosition:"first"
           }}
             editable={{
                 onRowAdd:(newRow) =>new Promise((resolve, reject) => {
                     fetch(url, {
                         method: "POST",
                         headers: {
                             'Content-type':"application/json"
                         },
                         body: JSON.stringify(newRow)
                     }).then(res=>res.json())
                       .then(data=>{getData()
                        resolve()
                       })
                         
                 }),
                 onRowUpdate:(newData, oldData) =>new Promise((resolve, reject) => {
                     fetch(url+"/"+oldData.id,{
                         method: "PUT",
                         headers:{
                             'Content-type':"application/json"
                         },
                         body: JSON.stringify(newData)
                     }).then(res=>res.json())
                       .then(data=>{getData()
                        resolve()
                       })
                         
                 }),
                 onRowDelete:(oldData) =>new Promise((resolve, reject) => {
                     fetch(url+"/"+oldData.id,{
                         method: "DELETE",
                         headers:{
                             'Content-type':"application/json"
                         },
                     }).then(res=>res.json())
                       .then(data=>{getData()
                        resolve()
                       })
                         
                 }),
           
             }}
          
           /> 
           </div>
        </>
    )
}
