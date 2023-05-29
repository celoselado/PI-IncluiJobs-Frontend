import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { ChangeEvent, useEffect, useState } from "react";
import { buscaId, post, put } from "../../../../service/service";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Tema from "../../../../model/Tema";
import "./CadastroTema.css";
import { toast } from "react-toastify";

function CadastroTema() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
    grupo: "",
  });

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

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedTema(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("tema" + JSON.stringify(tema));

    if (id !== undefined) {
      console.log(tema);
      put(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      });
      toast.success('Tema atualizado com sucesso!', {
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
      post(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      });
      toast.success('Tema cadastrado com sucesso!', {
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
    back();
  }

  function back() {
    navigate("/temas");
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="centralizar"
    >
      <Box
        paddingX={20}
        className="corpoTema"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        padding={10}
      >
        <form onSubmit={onSubmit}>
          <Typography
            variant="h3"
            color="textSecondary"
            component="h1"
            align="center"
          >
            Cadastro de Temas
          </Typography>
          <TextField
            value={tema.descricao}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updatedTema(event)
            }
            id="descricao"
            label="descricao"
            variant="outlined"
            name="descricao"
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            value={tema.grupo}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updatedTema(event)
            }
            id="grupo"
            label="grupo"
            variant="outlined"
            name="grupo"
            margin="normal"
            fullWidth
          ></TextField>
          <Button type="submit" variant="contained" color="primary">
            Finalizar
          </Button>
        </form>
      </Box>
    </Grid>
  );
}

export default CadastroTema;
