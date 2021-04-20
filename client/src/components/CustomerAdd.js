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
        this.addCustomer()
        .then((response) => {
            console.log(response.data)
        })
    }

    const handleFileChange =(e)=>{
        setInfo({
            file: e.target.files[0],
            fileName: e.target.value

        })
    }

    const handleValueChange=(e)=>{
        let nextState={

        }
        nextState[e.target.name] =  e.target.value
        setInfo(nextState)
    }
    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <Input type="file" name="file" file={info.file} value={info.fileName} onChange={handleFileChange} /><br />
                이름 : <Input type="text" name="userName" value={info.userName} onChange={handleValueChange}   /><br />
                생년월일 : <Input type="text" name="birthday" value={info.birthday} onChange={handleValueChange} /><br />
                성별 : <Input type="text" name ="gender" value={info.gender} onChange={handleValueChange} /><br />
                직업 : <Input type="text" name ="job" value={info.gob} onChange={handleValueChange} /><br />
                <Button type="submit">입력하기</Button>
            
            </Form>
        </div>
    )
}

export default CustomerAdd
