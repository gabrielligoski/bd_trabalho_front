import {Button, CardActions, CardContent, CardMedia, Container, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserCpf} from "../redux/UserSlice";

export default function Login() {
    const dispatch = useDispatch();
    const [cpf, setCpf] = useState('');

    const handleLogin = () => {
        dispatch(getUserCpf(cpf))
    }
    const handleInput = e => {
        setCpf(e.target.value)
    }

    return (
        <Container>
            <Card sx={{display: 'flex',  margin: 4, height: 800}}>
                <CardMedia
                    sx={{width: 600}}
                    component="img"
                    image="https://mocah.org/thumbs/896149-fantasy-art-artwork-Elden-Ring.jpg"
                    alt="green iguana"
                />
                <CardContent sx={{display: 'flex', flexDirection: 'column', margin: 'auto', width: 300}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Login
                    </Typography>
                    <TextField id="standard-basic"
                               label="cpf"
                               value={cpf}
                               onChange={handleInput}
                               variant="standard"
                               type={'number'}
                               error ={cpf.length !== 11 }
                               helperText={cpf.length !== 11?'CPF inválido':''}
                    />
                    <CardActions>
                        <Button onClick={handleLogin} variant={'outlined'} sx={{marginTop: 4}} size="small">Login</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>
    )
}
