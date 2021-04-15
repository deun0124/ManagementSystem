import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {withStyles} from '@material-ui/core/styles'
import  Paper from '@material-ui/core/Paper'
const styles = theme =>({
  root: {
    width : '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
    
  },
  table:{
    minWidth:1080
  }
})

const customer = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '홍길동',
  'birthday': '1999.01.01',
  'gender': '남자',
  'job': '대학생'
}, {
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '홍길순',
  'birthday': '1980.01.02',
  'gender': '여자',
  'job': '학생'
}, {
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '홍길돌',
  'birthday': '1992.01.03',
  'gender': '남자',
  'job': '프로그래머'
}]

function App() {

  return (
    
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


          {customer.map(c => {
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

          })
          }
        </TableBody>
      </Table>
      </Paper>
  );
}
export default App
