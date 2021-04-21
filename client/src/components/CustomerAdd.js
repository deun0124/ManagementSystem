import React,{useState} from 'react'
import Axios,{post} from 'axios'
import { Typography, Button, Form, message, Input, Icon} from 'antd';


function CustomerAdd() {

    const [info, setInfo] = useState([{
        file : null,
        userName :"",
        birthday:"",
        gender:"",
        job:"",
        fileName:""

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

    const handleFileChange =(e)=>{
        setInfo({
            file: e.target.files[0],
            fileName: e.target.value

        })
    }

    const handleValueChange=(e)=>{

        const { name, value} = e.target;
        setInfo({
            ...info,
            [name] : value
        })
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <Input type="file" name="file" file={file} value={fileName} onChange={handleFileChange} /><br />
                이름 : <Input type="text" name="userName" value={userName} onChange={handleValueChange}   /><br />
                생년월일 : <Input type="text" name="birthday" value={birthday} onChange={handleValueChange} /><br />
                성별 : <Input type="text" name ="gender" value={gender} onChange={handleValueChange} /><br />
                직업 : <Input type="text" name ="job" value={job} onChange={handleValueChange} /><br />
                <Button type="submit" onClick={handleFormSubmit}>입력하기</Button>
            
            </form>
        </div>
    )
}

export default CustomerAdd
