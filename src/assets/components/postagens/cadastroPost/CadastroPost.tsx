import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Postagem from '../../../../model/Postagem';
import Tema from '../../../../model/Tema';
import { busca, buscaId, put, post } from '../../../../service/service';
import { TokenState } from '../../../../store/tokens/tokensReducer';


function CadastroPost() {
    let navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(()=>{
        if(token == ""){
            alert("Você precisa estar logado!")
            navigate("/login")
        }
    }, [token])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: '',
            grupo: ''
        }
    )

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        descricao: '',
        status: '',
        privacidade: '',
        anexo: '',
        tema: null
    }) 

    useEffect(()=>{
        setPostagem({
            ... postagem,
            tema: tema
        })
    }, [tema])

    useEffect(()=>{
        getTemas()
        if (id !== undefined){
            findByIdPostagem(id)
        }

    }, [id])

    async function getTemas() {
        await busca('/temas', setTemas, {
            headers: {
                'Authorization': token
            }
        })
        
    }

    async function findByIdPostagem(id:string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
        
    }

    function updatedPostagem(event: ChangeEvent<HTMLInputElement>){
        setPostagem({
            ... postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    async function onSubmit(event:ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("tema" + JSON.stringify(tema))

        if(id !== undefined){
            console.log(tema)
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem atualizada com sucesso');
        }else{
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem cadastrada com sucesso!');
        }
        back()
    }

    function back(){
        navigate('/postagens')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.descricao} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id="descricao" label="descricao" name="descricao" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(event) => buscaId(`/temas/${event.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value = {tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                            
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;