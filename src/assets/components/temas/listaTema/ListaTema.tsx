
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { busca } from "../../../../service/service";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import Tema from "../../../../model/Tema";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { addToken } from "../../../../store/tokens/actions";
import "./ListaTema.css"
import { toast } from "react-toastify";
import { Box } from '@mui/material'

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
          autoClose: 1000,
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
  }, [temas.length])

  useEffect(() => {
    if (token === '') {
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
      navigate('/login')
    }
  }, [])

  return (
    <Grid
      container
      className="pagina"
      spacing={1}
      style={{ paddingTop: "10vw" }}
      alignItems="stretch"
    >
      {temas.map((tema) => (
        <Grid item xs={12} md={4} style={{ maxHeight: "100vh", marginBottom: "10vh" }}>
          <Box>
            <Card className="cardTemas" style={{ height: "100%" }}>
              <CardContent className="cardTemas2">
                <Typography color="textSecondary" variant="h4" gutterBottom>
                  Tema
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>
                <Typography color="textSecondary" variant="h4" gutterBottom>
                  Grupo
                </Typography>
                <Typography variant="h5" component="h2">
                  {tema.grupo}
                </Typography>
              </CardContent>
              <CardActions className="cardTemas2">
                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Link
                    to={`/cadastrarTemas/${tema.id}`}
                    className="text-decorator-none"
                  >
                    <Box mx={1}>
                      <Button
                        variant="contained"
                        className="marginLeft btnAtualizar"
                        size="small"
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
                        className="btnDeletar"
                      >
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ListaTema;