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
import { useNavigate, Link } from "react-router-dom";
import Postagem from "../../../../model/Postagem";
import { busca } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";
import "./ListaPostagem.css";

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token === "") {
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
  }, [token, navigate]);

  async function getPost() {
    setLoading(true);
    try {
      const response = await busca("/postagens", setPosts, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Falha ao buscar as postagens!", {
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
  }

  useEffect(() => {
    getPost();
  }, [posts.length]);

  return (
    <div className="post">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          Carregando...
        </Box>
      ) : (
        posts.map((post) => (
          <Box my={2}>
            <Grid>
              <Card variant="outlined" className="card title">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom></Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    className="cardTitulo"
                  >
                    {post.titulo}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h2"
                    className="cardDescricao"
                  >
                    {post.descricao}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className="cardStatus"
                  >
                    {post.status}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.privacidade}
                  </Typography>
                  <Typography variant="h6" component="p" className="cardAnexo">
                    <img src={post.anexo} alt="Anexo" className="cardImagem" />
                  </Typography>
                  <Typography variant="body2" component="p" className="text">
                    {post.tema?.descricao}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Postado por: {post.usuario?.nome}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/cadastrarPostagem/${post.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="btnAtualizar"
                      size="small"
                      color="primary"
                    >
                      Atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarPostagem/${post.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className="btnDeletar"
                    >
                      Deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Box>
        ))
      )}
    </div>
  );
}

export default ListaPostagem;