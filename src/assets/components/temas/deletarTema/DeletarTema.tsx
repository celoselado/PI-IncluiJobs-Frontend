import { Box, Card, CardContent, Typography, CardActions, Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../../model/Tema";
import { buscaId, deleteId } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import "./DeletarTema.css"
import { toast } from "react-toastify";

function DeletarTema() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })

    }

    function sim() {
        navigate('/temas')
        deleteId(`/temas/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        toast.success('Tema deletado com sucesso!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    function nao() {
        navigate('/temas')

    }


    return (
        <Box className="pagina" height="100vh">
            <Grid container  className="centralizarCard">
                <Box m={1}>
                    <Card variant="outlined" className="cardTemas cardTemas2">
                        <CardContent>
                            <Box justifyContent="center">
                                <Typography color="textSecondary" variant="h4" gutterBottom>
                                    Deseja deletar o Tema:
                                </Typography>
                                <Typography variant="h5" color="textSecondary">
                                    {tema?.descricao}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                                <Box mx={2}>
                                    <Button onClick={sim} variant="contained" className="marginLeft btnAtualizar" size='large' color="primary">
                                        Sim
                                    </Button>
                                </Box>
                                <Box mx={2}>
                                    <Button onClick={nao} variant="contained" size='large' color="secondary" className="btnDeletar">
                                        Não
                                    </Button>
                                </Box>
                            </Box>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Box>
    );
}
export default DeletarTema;