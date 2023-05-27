import "./Login.css";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import UsuarioLogin from "../../../model/UsuarioLogin";
import { login } from "../../../service/service";
import { addId, addToken } from "../../../store/tokens/actions";
import { useDispatch } from "react-redux";
import { Stack } from "@mui/material";

function Login() {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const [userLogin, setUserLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [respUserLogin, setRespUserLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (token !== "") {
      dispatch(addToken(token));
      history("/home");
    }
  }, [token]);

  useEffect(() => {
    if (respUserLogin.token !== "") {
      dispatch(addToken(respUserLogin.token));
      dispatch(addId(respUserLogin.id.toString()));
      history("/home");
    }
  }, [respUserLogin.token]);

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(`/usuarios/logar`, userLogin, setRespUserLogin);

      alert("Usuário logado com sucesso!");
    } catch (error) {
      alert("Dados do usuário inconsistentes. Erro ao logar!");
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="containerLogin"
      >
        <Box
          className="containerLogin-form"
          display={"flex"}
          flexDirection={"column"}
        >
          <form onSubmit={onSubmit}>
            <Typography
              variant="h4"
              style={{ marginBottom: "1em" }}
              component="h4"
              align="center"
            >
              Entrar
            </Typography>
            <Stack className="login-inputs" gap={2}>
              <TextField
                value={userLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                id="usuario"
                label="Usuário"
                variant="outlined"
                name="usuario"
                size="small"
              />
              <TextField
                value={userLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                id="senha"
                label="Senha"
                variant="outlined"
                name="senha"
                type="password"
                size="small"
              />

              <Box marginTop={2} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  className="loginBtn"
                  fullWidth
                >
                  Logar
                </Button>
              </Box>
            </Stack>
          </form>
          <Box display="flex" justifyContent="center" marginTop={4}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link
              to="/cadastrar"
              style={{ textDecoration: "none", color: "#009077" }}
            >
              <Typography
                variant="subtitle1"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} className="imagem"></Grid>
    </>
  );
}

export default Login;
