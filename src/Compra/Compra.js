import Card from '@mui/material/Card';
import {
    Box,
    Button,
    CardActions,
    CardContent,
    CardMedia, Container, Dialog, DialogContent, DialogContentText, DialogTitle, TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

export default function Compra() {
    let navigate = useNavigate();
    const userId = useSelector((state) => state.user.userId)
    const idItemCompra = useSelector((state) => state.user.idItemCompra)
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [data, setData] = useState('');
    const [securitycode, setSecuritycode] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [codigoRastreio, setCodigoRastreio] = useState('');
    const [numero, setNumero] = useState('');
    const [infoAdicional, setInfoAdicional] = useState('');
    const [open, setOpen] = useState(false);

    async function getProducts() {
        return await fetch("http://localhost:8080/produto", {
            method: 'get',
        })
            .then(res => res.json())
    }

    useEffect(() => {
        getProducts().then(r => {
            setProdutos(r)
        })

    }, [])


    const handleClose = () => {
        navigate('/')
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleInput = e => {
        switch (e.target.id) {
            case 'nome':
                setNome(e.target.value)
                break
            case 'numeroCartao':
                setNumeroCartao(e.target.value)
                break
            case 'data':
                setData(e.target.value)
                break
            case 'securitycode':
                setSecuritycode(e.target.value)
                break
            case 'cep':
                setCep(e.target.value)
                break
            case 'numero':
                setNumero(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'telefone':
                setTelefone(e.target.value)
                break
            case 'infoAdicional':
                setInfoAdicional(e.target.value)
                break
        }
    }

    const buy = () => {
        let cliente = {
            cpf: userId,
            nome,
            telefone,
            email
        }
        fetch("http://localhost:8080/cliente", {
            method: 'post',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(cliente)
        }).then(r => r.json()).then(r => console.log(r))
        let cartao = {
            numero: numeroCartao,
            nome,
            securityCode: securitycode,
            data
        }
        fetch("http://localhost:8080/cartao", {
            method: 'post',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(cartao)
        }).then(r => r.json()).then(r => console.log(r))
        let endereco = {
            cep,
            numero,
            infoAdicional
        }
        fetch("http://localhost:8080/endereco", {
            method: 'post',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(endereco)
        }).then(r => r.json()).then(r => console.log(r))
        setCodigoRastreio('#' + Math.floor(Math.random() * 16777215).toString(16))
        let pedido = {
            idProduto: idItemCompra,
            cpfCliente: userId,
            status: 'Processando',
            codigoRastreio
        }
        fetch("http://localhost:8080/pedido", {
            method: 'post',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(pedido)
        }).then(r => r.json()).then(r => console.log(r))
        setOpen(true)
    }

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', padding: 6}}>
            <Button sx={{width: 80}} variant={'contained'} onClick={() => navigate('/')}>Voltar</Button>
            <Typography variant={'h2'}>Comprando: </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                {produtos && produtos.map(p => {
                        if (p.id === idItemCompra)
                            return (
                                <Card sx={{maxWidth: 345, margin: 2}}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        sx={{objectFit: 'contain'}}
                                        src={`data:image/jpeg;base64,${p.imagem}`}
                                        alt={p.nome}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {p.categoria}
                                        </Typography>
                                        <Typography gutterBottom variant="h4" component="div">
                                            {p.nome}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {p.descricao}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {p.preco} $
                                        </Typography>
                                    </CardContent>
                                </Card>)
                    }
                )}
                <Box sx={{display: 'flex'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, padding: 2}}>
                        <Typography gutterBottom variant="h5" component="div">
                            Informações do Cartao
                        </Typography>
                        <TextField id="nome" label="nome" sx={{marginBottom: 4}} value={nome} onChange={handleInput}
                                   variant="standard"/>
                        <TextField id="numeroCartao" label="numeroCartao" sx={{marginBottom: 4}} value={numeroCartao}
                                   onChange={handleInput} variant="standard"/>
                        <TextField id="data" label="data" sx={{marginBottom: 4}} value={data} onChange={handleInput}
                                   variant="standard"/>
                        <TextField id="securitycode" label="securitycode" sx={{marginBottom: 4}} value={securitycode}
                                   onChange={handleInput} variant="standard"/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, padding: 2}}>
                        <Typography gutterBottom variant="h5" component="div">
                            Informações da Entrega
                        </Typography>
                        <TextField id="cep" label="cep" sx={{marginBottom: 4}} value={cep} onChange={handleInput}
                                   variant="standard"/>
                        <TextField id="numero" label="numero" sx={{marginBottom: 4}} value={numero}
                                   onChange={handleInput} variant="standard"/>
                        <TextField id="telefone" label="telefone" sx={{marginBottom: 4}} value={telefone}
                                   onChange={handleInput} variant="standard"/>
                        <TextField id="email" label="email" sx={{marginBottom: 4}} value={email} onChange={handleInput}
                                   variant="standard"/>
                        <TextField id="infoAdicional" label="infoAdicional" sx={{marginBottom: 4}} value={infoAdicional}
                                   onChange={handleInput} variant="standard"/>
                    </Box>
                </Box>
                <Button variant={'outlined'} onClick={buy}> Finalizar</Button>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Seu código de rastreio:</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{margin: 2}}>
                        {codigoRastreio}
                    </DialogContentText>
                    <Button fullWidth variant={'contained'} onClick={() => navigate(`/`)}>OK</Button>
                </DialogContent>
            </Dialog>
        </Container>
    );
}
