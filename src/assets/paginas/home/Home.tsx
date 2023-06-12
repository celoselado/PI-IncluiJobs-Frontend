import { Grid, Typography, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import TabPostagem from "../../components/postagens/tabpostagem/TabPostagem";
import { toast } from "react-toastify";
import { scrollTop } from "../../components/estaticos/scrollTop/ScrollTop";

function Home() {
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado!", {
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

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="caixa"
        xs={12}
      >
        <Grid alignItems="center" item xs={12} md={6} className="homeContainer">
          <Box paddingX={5}>
            
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="titulo"
              style={{ padding: "20px" }}
            >
              Seja bem vindo(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className="titulo"
              style={{ padding: "10px" }}
            >
              Mostre suas habilidades e conquiste oportunidades ou expresse suas
              experiências e opiniões!
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            style={{ paddingBottom: "40px" }}
          >
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>
            <Link to="/postagens">
              <Button variant="outlined" className="postHover botao btnDeletar">
                Ver Postagens
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={4} className="imagemContainer">
          <img
            className="imagemHome"
            src="https://cdn.pixabay.com/photo/2019/06/13/09/41/business-4271251_1280.png"
            alt="Imagem de uma mão segurando uma lampada"
            width="300px"
            height="300px"
            
          />
        </Grid>
        <Grid xs={12} className="postagens">
          <TabPostagem />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
