import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../../model/Postagem";
import { buscaId, deleteId } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import "./DeletarPostagem.css";
import { toast } from "react-toastify";

function DeletarPostagem() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [post, setPosts] = useState<Postagem>();

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/postagens/${id}`, setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  function sim() {
    navigate("/postagens");
    deleteId(`/postagens/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    toast.success("Postagem deletada com sucesso!", {
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
    navigate("/postagens");
  }

  return (
    <>
      <Box className="pagina" height="100vh">
        <Grid container className="centralizarCard">
          <Box m={2}>
            <Card variant="outlined" className="cardTemas cardTemas2">
              <CardContent>
                <Box justifyContent="center">
                  <Typography color="textSecondary" variant="h4" gutterBottom>
                    Deseja deletar a Postagem:
                  </Typography>
                  <Typography variant="h5" color="textSecondary">
                    {post?.titulo}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                  <Box mx={2}>
                    <Button
                      onClick={sim}
                      variant="contained"
                      className="marginLeft btnAtualizar"
                      size="large"
                      color="primary"
                    >
                      Sim
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={nao}
                      variant="contained"
                      size="large"
                      color="secondary"
                      className="btnDeletar"
                    >
                      Não
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
export default DeletarPostagem;
