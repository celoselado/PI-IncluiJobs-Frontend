import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import "./CadastroPost.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Postagem from "../../../../model/Postagem";
import Tema from "../../../../model/Tema";
import { busca, buscaId, put, post } from "../../../../service/service";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import Usuario from "../../../../model/Usuario";
import { toast } from "react-toastify";

function CadastroPost() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [temas, setTemas] = useState<Tema[]>([]);

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const userId = useSelector<TokenState, TokenState["id"]>(
    (state) => state.id
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
      navigate("/login");
    }
  }, [token]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
    grupo: "",
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    descricao: "",
    status: "",
    privacidade: "",
    anexo: "",
    tema: null,
    usuario: null,
  });

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome:"",
    usuario:"",
    senha:"",
    foto:""
  });

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
      usuario: usuario
    });
  }, [tema]);

  useEffect(() => {
    getTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  async function getTemas() {
    await busca("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [event.target.name]: event.target.value,
      tema: tema,
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("tema" + JSON.stringify(tema));

    if (id !== undefined) {
      console.log(tema);
      put(`/postagens`, postagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      toast.success('Postagem atualizada com sucesso!', {
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
      post(`/postagens`, postagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      toast.success('Postagem cadastrada com sucesso!', {
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
    navigate("/postagens");
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h5"
          color="textSecondary"
          component="h5"
          align="center"
        >
          Formulário de cadastro postagem
        </Typography>
        <TextField
          value={postagem.titulo}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
          id="titulo"
          label="Titulo"
          variant="outlined"
          name="titulo"
          size="small"
          margin="normal"
          fullWidth
        />
        <TextField
          value={postagem.descricao}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
          id="descricao"
          label="Descricao"
          name="descricao"
          variant="outlined"
          margin="normal"
          size="small"
          fullWidth
        />
        <TextField
          value={postagem.status}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
          id="status"
          label="Status"
          name="status"
          variant="outlined"
          margin="normal"
          size="small"
          fullWidth
        />
        <TextField
          value={postagem.privacidade}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
          id="privacidade"
          label="Privacidade"
          name="privacidade"
          variant="outlined"
          margin="normal"
          size="small"
          fullWidth
        />
        <TextField
          value={postagem.anexo}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
          id="anexo"
          label="Anexo"
          name="anexo"
          variant="outlined"
          margin="normal"
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={(event) =>
              buscaId(`/temas/${event.target.value}`, setTema, {
                headers: {
                  Authorization: token,
                },
              })
            }
          >
            {temas.map((tema) => (
              <MenuItem value={tema.id}>{tema.descricao} - {tema.grupo}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Escolha um tema para a postagem</FormHelperText>
          <Button type="submit" variant="contained" color="primary">
            Finalizar
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}
export default CadastroPost;
