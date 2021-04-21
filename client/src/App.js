import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomerAdd from './components/CustomerAdd'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"

  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})


function App() {


  const customer = []


  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
 

  useEffect(() => {
    let complete = 0;
    let timer = (() => {
      if (complete >= 100) {
        complete = 0
      } else {
        complete += 1;
      }
      setCompleted(complete);
      if (isLoad) {
        clearInterval(timer);
      }
    }, 20);


      
    callApi().then(res => {
      setCustomers(res);
    }).
      catch(err => console.log(err));
  }, [isLoad]);

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    setIsLoad(true);
    return body;
  }


  // 새로고침...... axios...로 해버리기^^...
  const stateRefresh = async() =>{
    const result = await Axios.get('./api/customers')
    setCustomers(result.data);
    
  }
 

  return (
    <div>
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>


            {customers != 0 ?
              customers.map(c => {
                return (


                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                )
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={styles.progress} variant="determinate" value={completed} />

                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh}/>
    </div>


  );
}
export default App
