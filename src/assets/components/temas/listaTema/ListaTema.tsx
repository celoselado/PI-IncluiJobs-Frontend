
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { busca } from "../../../../service/service";
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import Tema from "../../../../model/Tema";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { addToken } from "../../../../store/tokens/actions";
import { toast } from "react-toastify";

function ListaTema() {
    const [temas, setTemas] = useState<Tema[]>([])
    const navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const dispatch = useDispatch();

    async function getTemas() {
        // alterado a função pra dentro de um try catch, para poder verificar a validade do token do usuário
        try {
            await busca('/temas', setTemas, {
                headers: {
                    Authorization: token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
              toast.warn('Seu token expirou, logue novamente!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                dispatch(addToken(''))
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        getTemas()
    }, [])

    useEffect(() => {
        if (token === '') {
          toast.error('Você precisa estar logado!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            navigate('/login')
        }
    }, [])

    return (
      <>
        {temas.map((tema) => (
          <Box m={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Grupo
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.grupo}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Link
                    to={`/cadastrarTemas/${tema.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        className="marginLeft"
                        size="small"
                        color="primary"
                      >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link
                    to={`/deletarTema/${tema.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))}
      </>
    );
}

export default ListaTema;