import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import Usuario from "../../../model/Usuario";
import { busca, buscaId } from "../../../service/service";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Typography,
} from "@material-ui/core";
import { Grid, Stack } from "@mui/material";
import "./Perfil.css";
import Postagem from "../../../model/Postagem";

function Perfil() {
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);
  const [posts, setPosts] = useState<Postagem[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function getUserById(id: number) {
    await buscaId(`/usuarios/${id}`, setUsuario, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getUserById(+userId);
  }, []);

  return (
    <>
      <Container>
        <Grid container className="peril-container" paddingY={5}>
          <Grid item xs={6} className="perfil-dados">
            <Stack
              display={"flex"}
              alignItems={"center"}
              className="container-perfil"
            >
              <div className="usuario-perfil">
                <Avatar
                  src={usuario.foto}
                  className="usuario-perfil-foto"
                  alt="Foto de perfil do usuario"
                  style={{
                    width: "15rem",
                    height: "15rem",
                    margin: "0 auto",
                    marginBottom: "35px",
                  }}
                />
                <Typography variant="h5" align="center">
                  {"Nome de usuário: "}
                  {usuario.nome}{" "}
                </Typography>
                <Typography variant="h5" align="center">
                  {"Usuário: "}
                  {usuario.usuario}{" "}
                </Typography>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" align="center">
              Você tem um total de {usuario.postagem?.length} postagens feitas
            </Typography>
            <Typography variant="h4" align="center" style={{marginTop: "15px"}}>
              {" "}
              Postagens de {usuario.nome}{" "}
            </Typography>

            <Stack
              direction={"row"}
              gap={"20px"}
              marginTop={5}
              flexWrap={"wrap"}
              justifyContent={"center"}
            >
              {usuario.postagem?.map((post) => (
                <Box>
                  <Card variant="outlined" className="perfil-postagens">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Postagens
                      </Typography>
                      <Typography variant="h6" component="h6">
                        {post.titulo}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {post.descricao}
                      </Typography>
                      <Stack direction={"row"} gap={"50%"}>
                        <Typography component="p">{post.status}</Typography>
                        <Typography component="p">
                          {post.privacidade}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" component="p">
                        <img
                          className="perfil-imgPostagem"
                          src={post.anexo}
                        ></img>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {post.tema?.descricao}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Postado por: {usuario.nome}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Perfil;
