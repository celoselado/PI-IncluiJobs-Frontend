import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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
  const [loading, setLoading] = useState(false);

  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      try {
        setLoading(true);
        await cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResp);
        toast.success("Usuário cadastrado com sucesso!", {
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
        toast.error("Falha ao cadastrar o usuário, informe nome completo e um e-mail válido!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error(
        "Os campos de Senha e Confirmar Senha estão diferentes! Por favor, tente novamente!",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
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
      <Grid
        className="containerCadastro"
        display={"flex"}
        flexDirection={"column"}
        xs={12} md={4}
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
            type="password"
            margin="normal"
            fullWidth
            value={usuario.senha}
            error={usuario.senha.length < 8 && usuario.senha.length > 0}
                helperText={
                  usuario.senha.length < 8 && usuario.senha.length > 0
                    ? "A senha tem que ter no minímo 8 caracteres"
                    : ""
                }
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
            label="URL da foto"
            variant="outlined"
            margin="normal"
            value={usuario.foto}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
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
            <Button
              type="submit"
              variant="contained"
              className="BtnCadastrar"
              disabled={loading} // Desabilita o botão durante o carregamento
            >
              {loading ? "Carregando..." : "Cadastrar"} {/* Renderiza o texto do botão de acordo com o estado de loading */}
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}

export default CadastroUsuario;
