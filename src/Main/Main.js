import Card from '@mui/material/Card';
import {
    Box,
    Button,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getIdItemCompra} from "../redux/UserSlice";

export default function Main() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [produtos, setProdutos] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [categoria, setCategoria] = useState('Todas');
    const [categorias, setCategorias] = useState([]);

    async function getProducts() {
        return await fetch("http://localhost:8080/produto", {
            method: 'get',
        })
            .then(res => res.json())
    }

    async function getHightlights() {
        return await fetch("http://localhost:8080/destaques", {
            method: 'get',
        })
            .then(res => res.json())
    }

    useEffect(() => {
        getProducts().then(r => {
            setProdutos(r)
            const set = new Set()
            r.map(produto => set.add(produto.categoria))
            setCategorias(Array.from(set))
        })
        let dest = []
        getHightlights().then(r => r.map(d => {
            dest = [...dest, d.idProduto]
        })).then(r => setDestaques(dest))


    }, [])

    const handleChange = (event) => {
        setCategoria(event.target.value)
    };

    function handleBuy(id) {
        dispatch(getIdItemCompra(id))
        navigate(`/compra`)
    }

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', padding: 6}}>
            <FormControl fullWidth sx={{marginBottom: 4}}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoria}
                    label="Categoria"
                    onChange={handleChange}
                >
                    <MenuItem value={'Todas'}>Todas</MenuItem>
                    {categorias.map(c => <MenuItem value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
            <Typography variant={'h3'}>Destaques</Typography>
            <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto auto'}}>
                {produtos && produtos.filter(p => (p.categoria === categoria || categoria === 'Todas') && destaques.includes(p.id)).map((p, i) =>
                    <Card sx={{maxWidth: 345, margin: 2, backgroundColor: 'yellow'}} key={'Destaque_' + i}>
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
                        <CardActions>
                            <Button variant={'outlined'} onClick={() => handleBuy(p.id)}
                                    size="small">Buy</Button>
                        </CardActions>
                    </Card>)
                }
            </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: 'auto auto auto'}}>
                {produtos && produtos.filter(p => (p.categoria === categoria || categoria === 'Todas') && !destaques.includes(p.id)).map((p, i) =>
                    <Card sx={{maxWidth: 345, margin: 2}} key={'Normal_' + i}>
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
                        <CardActions>
                            <Button variant={'outlined'} onClick={() => handleBuy(p.id)}
                                    size="small">Buy</Button>
                        </CardActions>
                    </Card>)
                }
            </Box>
        </Container>
    );
}
