import { Grid, Link, Typography } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { GitHub } from "@material-ui/icons";
import { Box } from "@mui/material";
import "../footer/Footer.css";

function Footer() {
  return (
    <>
      <Box
        className="footerContainer"
        display={"flex"}
        alignItems={"center"}
        style={{ backgroundColor: "#F6F1E9" }}
        justifyContent={"space-between"}
      >
        <Box marginLeft={10}>
          <img
            src="/src/images/IncluiJobs-logo-.png"
            alt="Logo da IncluiJobs"
            width={200}
          />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Link href="#">Sobre nós</Link>
          <Link href="#">Dúvidas Frequentes</Link>
          <Link href="#">Imprensa</Link>
          <Link href="#">Novidades</Link>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Link href="#">Colaboradores</Link>
          <Link href="#">Empegos</Link>
          <Link href="#">Central de Ajuda</Link>
          <Link href="#">Fale Conosco</Link>
        </Box>

        <Box>
          <Typography className="socialFooter">Siga-nos</Typography>
          <Box>
            <a href="https://linktr.ee/incluijobsgithub" target="_blank">
              <img
                src="https://icons.iconarchive.com/icons/fa-team/fontawesome-brands/256/FontAwesome-Brands-Square-Github-icon.png"
                alt="Github"
                style={{ width: "3em" }}
              />
            </a>
            <a href="https://linktr.ee/vinisilvax" target="_blank">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                style={{ width: "3em", marginLeft: "15px" }}
              />
            </a>
          </Box>
        </Box>
        <Box marginRight={10}>
          <Typography>Agradecimentos à:</Typography>
          
            <Link href="brasil.generation.org" style={{color: "#000"}}><img width={150} src="/src/images/generationBrasil-logo.png" alt="" /></Link>
          
        </Box>
      </Box>
      <Typography className="copyrightFooter">
        © Copyright 2023 IncluiJobs, Inc. Todos os direitos reservados. As
        diversas marcas comerciais pertencem a seus respectivos proprietários.
      </Typography>
    </>
  );
}

export default Footer;
