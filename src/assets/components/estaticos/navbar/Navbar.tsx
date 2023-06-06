import {
  AppBar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../../store/tokens/tokensReducer";
import { addToken } from "../../../../store/tokens/actions";
import React from "react";
import PopupState, {
  bindTrigger,
  bindMenu,
  bindPopover,
} from "material-ui-popup-state";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(""));
    toast.warn('Usuário Deslogado!', {
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

 

  let navbarComponent;

  if (token !== "") {
    navbarComponent = (
      <AppBar className="navbarContainer">
        <Toolbar className="navbar">
          <Grid
            container
            className="navbarContainerGrid"
            alignItems="center"
            justifyContent="center"
            xs={12}
            direction="row"
          >
            <Grid item xs={5}>
              <Box style={{ cursor: "pointer" }}>
                <img
                  className="IJlogo"
                  src="https://media.discordapp.net/attachments/1094735633810997421/1113462405985480824/logoIncluiJobs2_1atual.png?width=449&height=116"
                  alt="Logo da IncluiJobs"
                  width={300}
                />
              </Box>
            </Grid>
            <div onClick={clickMenu} className="menuHamburguerContainer">
              <Box className="menuHamburguer">
                <MenuIcon className="menuHamburguerIcon" />
                <menu className="menuHamburguerItens">
                  <ul>
                    <li>
                      <a href="/home">Home</a>
                    </li>
                    <li>
                      <a href="/postagens">Postagens</a>
                    </li>
                    <li>
                      <a href="/temas">Temas</a>
                    </li>
                    <li>
                      <a href="/cadastrarTemas">Cadastrar Tema</a>
                    </li>
                    <li>
                      <a href="/sobre">Sobre</a>
                    </li>
                    <li>
                      <a href="/perfil">Meu Perfil</a>
                    </li>
                    <li>
                      <Link
                        to={"/login"}
                        onClick={goLogout}
                        className="logoutLink2"
                      ></Link>
                      Sair
                    </li>
                  </ul>
                </menu>
              </Box>
            </div>
            <Grid item xs={7}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Box className="navbarLinks">
                  <Typography variant="h6" color="inherit">
                    <Link to={"/home"} className="navbarLink">
                      Home
                    </Link>
                  </Typography>
                </Box>
                <Box className="navbarLinks">
                  <Typography variant="h6" color="inherit">
                    <Link to={"/postagens"} className="navbarLink">
                      Postagens
                    </Link>
                  </Typography>
                </Box>
                <Box className="navbarLinks">
                  <Typography variant="h6" color="inherit">
                    <Link to={"/temas"} className="navbarLink">
                      Temas
                    </Link>
                  </Typography>
                </Box>
                <Link
                  to="/cadastrarTemas"
                  className="navbarLinks text-decorator-none"
                >
                  <Box
                    mx={1}
                    className="hover cursor text-decorator-none"
                    color="black"
                  >
                    <Typography variant="h6" color="inherit">
                      Cadastrar tema
                    </Typography>
                  </Box>
                </Link>
                <Box className="navbarLinks" borderRight={"none"}>
                  <Typography variant="h6" color="inherit">
                    <Link to={"/sobre"} className="navbarLink">
                      Sobre
                    </Link>
                  </Typography>
                </Box>

                <Box marginLeft={5} className="logoutLink navbarLinks">
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button {...bindTrigger(popupState)}>Conta</Button>

                        <Menu {...bindMenu(popupState)}>
                          <Link
                            to={"/perfil"}
                            style={{
                              textDecoration: "none",
                              color: "#000000",
                            }}
                          >
                            <MenuItem onClick={popupState.close}>
                              Perfil
                            </MenuItem>
                          </Link>
                          {/*<MenuItem onClick={popupState.close}>
                              Link adicional
                      </MenuItem>*/}
                          <Link
                            to={"/login"}
                            className="navbarLink"
                            onClick={goLogout}
                          >
                            <MenuItem
                              className="logoutLink navbarLinks"
                              onClick={popupState.close}
                            >
                              Sair
                            </MenuItem>
                          </Link>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  return <>{navbarComponent}</>;
}

export default Navbar;
function clickMenu(event: React.MouseEvent<HTMLDivElement>): void {
  const menuHamburguerItens = document.querySelector(
    ".menuHamburguerItens"
  ) as HTMLElement;
  if (menuHamburguerItens.style.display === "block") {
    menuHamburguerItens.style.display = "none";
  } else {
    menuHamburguerItens.style.display = 'block'
  }
}

