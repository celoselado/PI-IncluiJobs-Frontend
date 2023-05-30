import { Box, Card, CardContent, Typography, CardActions, Button, Grid,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Postagem from "../../../../model/Postagem";
import { busca } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";
<<<<<<< HEAD
import "./ListaPostagem.css";
=======
import "./ListaPostagem.css"

>>>>>>> cda99d5199f7cec290f4023864b9f85e33f3f4f7

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
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
    navigate("/login")
      navigate("/login");
    }
  }, [token]);

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getPost();
  }, [posts.length]);

  return (
    <>
      {posts.map((post) => (
<<<<<<< HEAD
        <Box m={2}>
          <Card variant="outlined" className="corzinha">
=======
        <Box m={2} >
          <Grid className="card title">
            <Grid className="image " >
          <Card variant="outlined" className="image " >
>>>>>>> cda99d5199f7cec290f4023864b9f85e33f3f4f7
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
              </Typography>
              <Typography variant="h5" component="h2" className="text">
                {post.titulo}
              </Typography>
              <Typography variant="body2" component="p" className="text">
                {post.descricao}
              </Typography>
              <Typography variant="body2" component="p" className="text">
                {post.status}
              </Typography>
              <Typography variant="body2" component="p" className="text">
                {post.privacidade}
              </Typography>
              <Typography variant="h6" component="p">
                <img src={post.anexo}></img>
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
                      className="marginLeft"
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
                    <Button variant="contained" size="small" color="secondary">
                      Deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
        </Box>
      ))}
    </>
  );
}

export default ListaPostagem;
