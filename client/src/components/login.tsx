import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios,{AxiosResponse} from 'axios';
import { backendUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import SimpleSnackbar from "./snackbar";

interface LoginCardProps {
    onChangeUsername: React.ChangeEventHandler<HTMLInputElement>;
    onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate()

    interface ApiResponse {
        message: string,
        token: string
        // Add more properties as needed
      }

    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };
    
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    }

    const login = () => {
        const data = {username, password}
        axios.post<any, AxiosResponse<ApiResponse>>(backendUrl+'/login', data,{headers: {'Content-Type': 'application/json'}})
            .then((response: AxiosResponse<ApiResponse>) => {
                localStorage.setItem('token',response.data.token)
                console.log(response.data.message)
                navigate('/users')
            })
            .catch(error=>{
                if(error.response?.data.message){
                    setMessage(error.response?.data.message)
                }else setMessage('Could not shit')
                setOpen(true)
                console.log(error);
            })
    }

    return <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'90vh' }}>
        <SimpleSnackbar message={message} open={open} setOpen={setOpen}></SimpleSnackbar>
        <LoginCard onChangeUsername={onChangeUsername} onChangePassword={onChangePassword} onClick={login}/>
    </div>
    </>
}

const LoginCard: React.FC<LoginCardProps> = ({onChangeUsername, onChangePassword, onClick}) =>{
    const navigate = useNavigate()
    return  <Card style={{padding:70}}>
        <div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <h1>Login</h1>
        </div>
        <TextField 
            id="contained-basic" 
            label="Username" 
            variant="outlined" 
            onChange={onChangeUsername}
        />
            <br /> <br />
        <TextField
            id="contained-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onChangePassword}
        />
        <br /><br />
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
            <Button variant="contained" onClick={onClick}>Login</Button>
        </div>
        <div style={{display:'flex', alignContent:'space-between'}}>
            <h4>New User??</h4> <Button variant='contained' style={{margin:13, height:35}} onClick={() => navigate('signin')} >Sign In</Button></div>
        </div>
    </Card>
}

export default Login;