import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { makeStyles, fade } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomerAdd from './components/CustomerAdd'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


import { LocalConvenienceStoreOutlined, TextRotationAngledownOutlined } from '@material-ui/icons';


const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing(3),
    minWidth: 1080


  },
  paper: {
    marginLeft: 18,
    margin: 18
  },

  menu: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
    marginBottom: '15px'

  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: '1.0rem'
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



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
  const stateRefresh = async () => {
    const result = await Axios.get('./api/customers')
    setCustomers(result.data);

  }



  // filteredComponents.map((c)=>{
  //   return <Customer
  //           stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}birthday={c.birthday}gender={c.gender} job={c.job} />
  // });
  
  //   return data.map((c)=>{
  //     return <Customer
  //        stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}birthday={c.birthday}gender={c.gender} job={c.job} />
  //   })
  
  // }
  


  const lists = ['번호', '이미지', '이름', '생년월일', '성별', '직업', '설정']
  const classes = styles();

  


  // const SearchAppBar=()=> {
    
    const [state, setstate] = useState("")
  
  
  
    const handleValueChange = (e) =>{
      
  
      setstate(e.currentTarget.value)
      
      
  
    }

    console.log(state)
  
  // }

  const filteredComponents = (data) =>{
    data=data.filter((c)=>{
      return c.name.indexOf(state)>-1;
    })
    return data.map((c)=>{
      return  <Customer
            stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}birthday={c.birthday}gender={c.gender} job={c.job} />
       
    })
  }
  

  return (
    <div className={styles.root} >

      {/* <SearchAppBar customers={customers}/> */}

      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객관리시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="고객 검색"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="state"
              value={state}
              onChange={handleValueChange}
              
              inputProps={{ 'aria-label': 'search' }}
            />
          
          </div>
        </Toolbar>
      </AppBar>


      <div className={styles.menu} style={{justifyContent:'center', display:'flex', marginTop:'15px', marginBottom:'15px'}} >
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
   
      
      <Paper className={styles.paper} >
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              {lists.map(c => {
                return <TableCell className={styles.tableHead} > {c}</TableCell>
              })}
              {/* <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
               */}
            </TableRow>
          </TableHead>

          <TableBody>


            {customers != 0 ?
                filteredComponents(customers) 

                // filteredComponents.map((c) =>{
                //   return <Customer
                //             stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}birthday={c.birthday}gender={c.gender} job={c.job} />
                //   })
                // customers.map(c => {
                
                //    return(
 
                //     <Customer
                //       stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name}birthday={c.birthday}gender={c.gender} job={c.job} />
                 
                //       )})
               :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={styles.progress} variant="determinate" value={completed} />

                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>

    </div>


  );
}
export default App
