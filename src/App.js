import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
var x = 0;
function App() {

  const [user,setuser]=useState([]);
  const [userId,setuserId]=useState('');
  const [title,settitle]=useState('');
  const [body,setbody]=useState('');
 const [id,setid]=useState('');
  const [saveInProgress,setsaveInProgress]=useState(false);

  useEffect(async()=>{
    var response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
     setuser( response.data );
  })
const handleSubmit= async(e)=>{
    e.preventDefault();
    if(x){
        updateData();
        // alert('data has been updated');
    }else{
        createData();
        // alert('New data has been created');
    }  
}

const createData = async () => {
    setsaveInProgress(true);
    var response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        userId:userId,
        title: title,
        body:body,
      }
    );
    var user1 = [...user];
    user1.push(response.data);
    setuser(user1);
    setuserId('');
    setbody('');
    settitle('');
    setsaveInProgress(false);
  };

const updateData = async () => {
    var response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${x}`,
      {
        id:x,
        userId: userId,
        title: title,
        body: body,
      }
    );
    var index = user.findIndex((row) => row.id === x);
    var user1 = [...user];
    user1[index] = response.data;
    setuser(user1);
    setuserId('');
    setbody('');
    settitle('');
    setid('');
  };
const onPopulateData = (id) => {
    var selectedData = user.filter((row) => row.id === id)[0];
    x=id;
    setuserId(selectedData.userId);
    setbody(selectedData.body);
    settitle(selectedData.title);
  };
const handleDelete = async (id) => {
    var response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    var user1 = user.filter((row) => row.id !== id);
    setuser(user1);
    // alert('data has been deleted');
  };

  return (
    <div className="App">

<form onSubmit={handleSubmit}>
  <div>
    <h1>Form</h1>
  </div>
          <div>
            <label> UserId </label>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setuserId(e.target.value)}
            />
          </div>{' '}
          <br />
          <div>
            <label> Title </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>{' '}
          <br />
          <div>
            <label> Body </label>
            <input
              type="text"
              name="body"
              value={body}
              onChange={(e) => setbody(e.target.value )}
            />
          </div>{' '}
          <br />
          <button disabled={saveInProgress}> Submit </button>
        </form>

      <h3>DATA TABLE</h3>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Id</TableCell>
            <TableCell>UserId</TableCell>
            <TableCell >Title</TableCell>
            <TableCell >Body</TableCell>
            <TableCell >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{user.id}</TableCell>
              <TableCell >{user.userId}</TableCell>
              <TableCell >{user.title}</TableCell>
              <TableCell >{user.body}</TableCell>
              <TableCell> <button  onClick={() => onPopulateData(user.id)} >
                      {' '}
                      Update{' '}
                    </button>{' '}
                    &nbsp;&nbsp;
                    <button onClick={() => handleDelete(user.id)}>
                      {' '}
                      Delete{' '}
                    </button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
