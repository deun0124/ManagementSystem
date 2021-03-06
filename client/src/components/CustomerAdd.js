import React,{useState} from 'react'
import Axios,{post} from 'axios'
import Dialog from'@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';




const styles = theme =>({
    hidden:{
        display : 'none'
    }
})
function CustomerAdd(props) {

    const [info, setInfo] = useState([{
        file : null,
        userName :"",
        birthday:"",
        gender:"",
        job:"",
        fileName:"",
        open : false

    }])




    const {file, userName, birthday, gender, job, fileName} = info;
  
   function addCustomer() {
        const url = '/api/customers'
        const formData = new FormData();
        formData.append('image', info.file);
        formData.append('name',info.userName);
        formData.append('birthday',info.birthday);
        formData.append('gender',info.gender);
        formData.append('job',info.job);
        const config={
            headers:{
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }


   const handleFormSubmit=(e)=>{
        e.preventDefault()
        addCustomer()
        .then((response) => {
            console.log(response.data)
            props.stateRefresh();
        })
        setInfo({
            file: null,
            userName:'',
            birthday : '',
            gender : ''
            ,job : '',
            fileName :''
        })

       
        
      
    }
    function handleFileChange(e) {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: e.target.files[0],
            [fileName]: value
        })
        

       console.log(value)
    }


    const handleValueChange=(e)=>{

        const { name, value} = e.target;
        setInfo({
            ...info,
            [name] : value
        })
    }


    
    
const handleClickOpen =() => {
    setInfo({open:true})

}

const handleClose =() => {
    setInfo({
        file : null,
        userName :"",
        birthday:"",
        gender:"",
        job:"",
        fileName:"",
        open:false

    })
}
  

    const {classes } = props;

   console.log(info)
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>?????????????????? </Button>
            <Dialog open={info.open} onClose={handleClose}>
                <DialogTitle>????????????</DialogTitle>
                <DialogContent>
                <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" name="file"  file={file} value={fileName} onChange={handleFileChange} /><br />
                  <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {info.fileName=== "" ? "????????? ????????? ??????" : info.fileName }
                        </Button>

                  </label><br />

                  <TextField label="??????" type="text" name="userName" value={userName} onChange={handleValueChange}   /><br />
                  <TextField label="????????????" type="text" name="birthday" value={birthday} onChange={handleValueChange} /><br />
                 <TextField label=" ??????" type="text" name ="gender" value={gender} onChange={handleValueChange} /><br />
                  <TextField label="??????" type="text" name ="job" value={job} onChange={handleValueChange} /><br />
                        
                        <DialogActions >
                            <Button  variant="contained" color="primary" onClick={handleFormSubmit}>??????</Button>
                        </DialogActions>
                   
                        
                
                </DialogContent>

            </Dialog>
            
            
            {/* <form onSubmit={handleFormSubmit}>
                <h1>?????? ??????</h1>
                ????????? ????????? : <Input type="file" name="file" file={file} value={fileName} onChange={handleFileChange} /><br />
                ?????? : <Input type="text" name="userName" value={userName} onChange={handleValueChange}   /><br />
                ???????????? : <Input type="text" name="birthday" value={birthday} onChange={handleValueChange} /><br />
                ?????? : <Input type="text" name ="gender" value={gender} onChange={handleValueChange} /><br />
                ?????? : <Input type="text" name ="job" value={job} onChange={handleValueChange} /><br />
                <Button type="submit" onClick={handleFormSubmit}>????????????</Button>
             </form>  */}
           
        </div>
    )
}

export default withStyles(styles)(CustomerAdd)
