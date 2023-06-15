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
import { busca, buscaId, post } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";
import "./ListaPostagem.css";
import { Comentario } from "../../../../model/Comentario";
import Usuario from "../../../../model/Usuario";

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);
  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: "",
    foto: "",
    senha: "",
    usuario: "",
  });

  const [comment, setComment] = useState<Comentario>({
    id: 0,
    texto: "",
    postagem: null,
    usuario: usuario,
  });

  const [comments, setComments] = useState<Comentario[]>([]);

  async function getComent() {
    await busca("/comentarios", setComments, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getComent();
  }, []);

  // update de useState do comentario
  // busca a postagem por ID, coloca essa postagem no comentário
  function handleChange(event) {
    // console.log(event);
    buscaId(`/postagens/${event.target.id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
    setComment({
      ...comment,
      texto: event.target.value,
      postagem: postagem,
      usuario: usuario,
    });
  }

  // envio de comentario
  // vai pegar o comentário, adicionar a postagem e o usuário dono, e gravar no banco, puxar denovo todos os comentários, e ja exibir na tela
  async function handleSubmit(event) {
    event.preventDefault();

    // garantia de que o comentário vai completo
    setComment({
      ...comment,
      postagem: postagem,
      usuario: usuario,
    });

    // teste pra ver se o coment ta vazio
    if (comment.texto === "") {
      toast.error("Digite um comentário válido!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      console.log(comment);
      await post("/comentarios", comment, setComment, {
        headers: {
          Authorization: token,
        },
      });
      toast.info("Comentário feito com sucesso!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // apagar o campo do comentário pra deixar pronto pra mais um
      setComment({
        id: 0,
        texto: "",
        postagem: null,
        usuario: null,
      });
      getComent();
    }
  }

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
    <div className="post">
      {posts.map((post) => (
        <Box my={2}>
          <Grid>
            <Card variant="outlined" className="card title">
              <CardContent>
                <Typography color="textSecondary" gutterBottom></Typography>
                <Typography variant="h5" component="h2" className="texto">
                  {post.titulo}
                </Typography>
                <Typography variant="h5" component="h2" className="text">
                  {post.descricao}
                </Typography>
                <Typography variant="body2" component="p" className="text">
                  {post.status}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.privacidade}
                </Typography>
                <Typography variant="h6" component="p" className="image ">
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
          {/* mapeamento dos comentários de cada uma das postagens, para não exibir comentários de uma postagem na outra */}
          <Box className="box-Coments">
            <div>
              <Typography className="pd-Coments">Comentarios:</Typography>

              {comments
                .filter((comentario) => comentario.postagem.id === post.id)
                .map((comentario) => (
                  <div className="bg-Coments">
                    <div className="pd-Coments">
                      <img
                        src={comentario.usuario.foto}
                        alt="foto de quem comentou"
                        width={50}
                        className="imgComents"
                        height={50}
                      />
                      <p className="pd-User">{comentario.usuario.nome}</p>
                    </div>
                    <p className="pd-Texto">{comentario.texto}</p>
                  </div>
                ))}
            </div>

            {/* mapeamento dos comentários de cada uma das postagens, para não exibir comentários de uma postagem na outra */}
            <CardActions>
              <CardActions>
                <Typography variant="body2" component="p">
                  {/* {post.usuario?.nome} */}
                </Typography>
                {/* formulário de preenchimento do comentário */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={comment.texto}
                    name="texto"
                    onChange={(event) => handleChange(event)}
                    placeholder="Digite seu comentário"
                    id={post.id.toString()}
                    className="input"
                  />
                  <button className="button-coments">
                    <div className="svg-wrapper-1 ">
                      <div className="svg-wrapper">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span>Publicar</span>
                  </button>
                </form>

                {/* formulário de preenchimento do comentário */}
              </CardActions>

              {/* aqui fica os botoes de atualizar e deletar caso precise colocar de novo */}
            </CardActions>
          </Box>
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
        </Box>
      ))}
    </div>
  );
}
export default ListaPostagem;
