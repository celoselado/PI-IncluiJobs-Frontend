import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { ChangeEvent, useEffect, useState } from "react";
import { buscaId, post, put } from "../../../../service/service";
import {Button, Grid, TextField, Typography,
} from "@material-ui/core";
import Tema from "../../../../model/Tema";
import "./CadastroTema.css";
import { toast } from "react-toastify";
import {Box} from '@mui/material'


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
  const [isLoading, setIsLoading] = useState(false);

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
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    setIsLoading(true);
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
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
    setIsLoading(true);
    console.log("tema" + JSON.stringify(tema));

    if (id !== undefined) {
      console.log(tema);
      put(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      })
        .then(() => {
          setIsLoading(false);
          toast.success("Tema atualizado com sucesso!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          back();
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      post(`/temas`, tema, setTema, {
        headers: {
          Authorization: token,
        },
      })
        .then(() => {
          setIsLoading(false);
          toast.success("Tema cadastrado com sucesso!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          back();
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
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
        padding={7}
      >
        <form onSubmit={onSubmit}>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            className="cadtemastitulo"
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
            className="formTema"
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
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btnAtualizar"
              style={{ marginTop: "10px" }}
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Finalizar"}
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  );
}

export default CadastroTema;