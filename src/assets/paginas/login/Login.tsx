import "./Login.css";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import useLocalStorage from "react-use-localstorage";
import UsuarioLogin from "../../../model/UsuarioLogin";
import { login } from "../../../service/service";

function Login() {
  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage("token");

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [event.target.name]: event.target.value,
    });
  }
  async function enviar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login("/usuarios/logar", usuarioLogin, setToken);
      alert("Usuario logado com sucesso");
    } catch (error) {
      alert("Usuario e/ou senha inválidos");
    }
  }
  useEffect(() => {
    if (token !== "") {
      navigate("/home");
    }
  }, [token]);
  return (
    <>
      <Grid
        container
        alignItems="center"
        className="imgLogin"
        justifyContent="center"
      >
        <Grid>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            paddingX={8}
            className="fundoLog"
          >
            <form onSubmit={enviar}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="textPrimary"
                  component={"h3"}
                  align="center"
                  className="textos1"
                >
                  Login
                </Typography>
                <TextField
                  name="usuario"
                  label="Nome de Usuario"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  className="corLog"
                  value={usuarioLogin.usuario}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
                  }
                />
                <TextField
                  name="senha"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  className="corLog"
                  value={usuarioLogin.senha}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
                  }
                />
                <Box marginTop={2} textAlign="center">
                    <Button type="submit" variant="contained" className="btnLogin" color="primary">
                      Logar
                    </Button>
                </Box>
              </Box>
            </form>

            <Box display="flex" justifyContent="center" marginTop={2}>
              <Box marginRight={1}>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Não tem uma conta?
                </Typography>
              </Box>
              <Link to="/cadastrar">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  align="center"
                  className="textos1"
                >
                  Cadastre-se
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
