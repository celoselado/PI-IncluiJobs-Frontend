import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import Usuario from "../../../model/Usuario";
import { busca, buscaId, put } from "../../../service/service";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid, Stack } from "@mui/material";
import "./Perfil.css";
import Postagem from "../../../model/Postagem";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    setUsuario({
      ...usuario,
      senha: "",
    });
  }, [usuario.usuario]);

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  }

  async function atualizar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      try {
        await put("/usuarios/atualizar", usuario, setUsuario, {
          headers: {
            Authorization: token,
          },
        });
        alert("Usuário cadastrado com sucesso");
        setUsuario({ ...usuario, senha: "" });
        setConfirmarSenha("");
      } catch (error) {
        alert("Falha ao cadastrar o usuário, verifique os campos");
      }
    } else {
      alert("Os campos de Senha e Confirmar Senha estão diferentes");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

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
                  alt={`Foto de perfil de ${usuario.nome}`}
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
              <div className="perfilUpdate">
                <Accordion>
                  <AccordionSummary
                    
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5" style={{ margin: "0 auto" }}>
                      Atualizar Perfil
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form onSubmit={atualizar}>
                      <Box
                        display={"flex"}
                        width={"100%"}
                        flexDirection={"column"}
                        
                      >
                        <TextField
                          name="nome"
                          label="Nome completo"
                          value={usuario.nome}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            updateModel(event)
                          }
                        />
                        <TextField
                          name="usuario"
                          label="Endereço de e-mail"
                          disabled
                          value={usuario.usuario}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            updateModel(event)
                          }
                        />
                        <TextField
                          name="foto"
                          label="URL da foto"
                          value={usuario.foto}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            updateModel(event)
                          }
                        />
                        <TextField
                          name="senha"
                          label="Senha"
                          type="password"
                          value={usuario.senha}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            updateModel(event)
                          }
                        />
                        <TextField
                          name="confirmarSenha"
                          label="Confirmar senha"
                          type="password"
                          value={confirmarSenha}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            confirmSenha(event)
                          }
                        />
                        <Button fullWidth variant={"contained"} type="submit">
                          Atualizar
                        </Button>
                      </Box>
                    </form>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" align="center">
              Você tem um total de {usuario.postagem?.length} postagens feitas
            </Typography>
            <Typography
              variant="h4"
              align="center"
              style={{ marginTop: "15px" }}
            >
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
