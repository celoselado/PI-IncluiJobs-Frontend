import React, { useEffect, useState, ChangeEvent } from "react";
import "./CadastroUsuario.css";
import { Grid, Box, Typography, TextField, Button, Autocomplete } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Usuario from "../../../model/Usuario";
import { cadastroUsuario } from "../../../service/service";
import { toast } from "react-toastify";

function CadastroUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  const [usuarioResp, setUsuarioResp] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState("");

  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha == confirmarSenha && usuario.senha.length >= 8) {
      try {
        await cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResp);
        toast.success('Usuário cadastrado com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } catch (error) {
        toast.success('Falha ao cadastrar o usuário, verifique os campos!', {
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
    } else {
      toast.error('Os campos de Senha e Confirmar Senha estão diferentes! Por favor, tente novamente!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }
  useEffect(() => {
    if (usuarioResp.id !== 0) {
      navigate("/login");
    }
  }, [usuarioResp]);
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      className="imgCadastro"
    >
      <Box
        className="containerCadastro"
        display={"flex"}
        flexDirection={"column"}
      >
        <form onSubmit={cadastrar}>
          <Typography
            variant="h4"
            gutterBottom
            color="textPrimary"
            component={"h3"}
            align="center"
          >
            Cadastrar
          </Typography>
          <TextField
            name="nome"
            label="Nome completo"
            variant="outlined"
            margin="normal"
            fullWidth
            value={usuario.nome}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="usuario"
            label="Endereço de e-mail"
            variant="outlined"
            margin="normal"
            fullWidth
            value={usuario.usuario}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="senha"
            label="Senha"
            variant="outlined"
            type="Password"
            margin="normal"
            fullWidth
            value={usuario.senha}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            className=" textos2"
            value={confirmarSenha}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              confirmSenha(event)
            }
          />
          <TextField
            name="foto"
            label="Foto"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Box marginTop={2} textAlign="center">
            <Link to={"/login"} className="text-decoration-none">
              <Button
                variant="contained"
                color="secondary"
                className="btnCancelar"
              >
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="contained" className="BtnCadastrar">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  );
}

export default CadastroUsuario;
