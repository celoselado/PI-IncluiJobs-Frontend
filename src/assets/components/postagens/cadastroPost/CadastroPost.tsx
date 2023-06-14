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

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  );

  const userId = useSelector<TokenState, TokenState['id']>((state) => state.id);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token === '') {
      toast.error('Você precisa estar logado!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/login');
    }
  }, [token, navigate]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
    grupo: '',
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    descricao: '',
    status: '',
    privacidade: '',
    anexo: '',
    tema: null,
    usuario: null,
  });

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
      usuario: usuario,
    });
  }, [tema]);

  useEffect(() => {
    setLoading(true);
    getTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
    setLoading(false);
  }, [id]);

  async function getTemas() {
    setLoading(true);
    try {
      const response = await busca('/temas', setTemas, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Falha ao buscar os temas!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  async function findByIdPostagem(id: string) {
    setLoading(true);
    try {
      const response = await buscaId(`postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Falha ao buscar a postagem!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
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
    setLoading(true);

    try {
      if (id !== undefined) {
        await put(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Postagem atualizada com sucesso!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        await post(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Postagem cadastrada com sucesso!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      setLoading(false);
      back();
    } catch (error) {
      setLoading(false);
      toast.error('Falha ao salvar a postagem, por favor, tente novamente.', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  function back() {
    navigate('/postagens');
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
          error={postagem.descricao.length > 255}
          helperText={
            postagem.descricao.length > 255
              ? "A postagem deve conter no maximo 255 caracteres"
              : ""
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
          <InputLabel id="demo-simple-select-helper-label">Tema</InputLabel>
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
              <MenuItem key={tema.id} value={tema.id}>
                {tema.descricao} - {tema.grupo}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Escolha um tema para a postagem</FormHelperText>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Carregando' : 'Finalizar'}
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default CadastroPost;
