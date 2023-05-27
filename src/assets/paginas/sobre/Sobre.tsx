import { Box, Grid, Tooltip, Typography } from "@material-ui/core";
import "./Sobre.css";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Navbar from "../../components/estaticos/navbar/Navbar";

function Sobre() {
  
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Box className="sobreTexto">
            <h1>Sobre nós</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
              accusantium officiis quas sunt labore, voluptatum perferendis.
              Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
              Perspiciatis harum laudantium odio minus eaque. Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. At accusantium officiis
              quas sunt labore, voluptatum perferendis. Numquam obcaecati ipsa
              aspernatur voluptatem velit ut quo. Perspiciatis harum laudantium
              odio minus eaque. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. At accusantium officiis quas sunt labore,
              voluptatum perferendis. Numquam obcaecati ipsa aspernatur
              voluptatem velit ut quo. Perspiciatis harum laudantium odio minus
              eaque. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              At accusantium officiis quas sunt labore, voluptatum perferendis.
              Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
              Perspiciatis harum laudantium odio minus eaque.
            </p>
          </Box>

          

        </Grid>

        <Grid item xs={3}>
          <img
            className="sobreImagem"
            src="/src/images/background-sobre.png"
          ></img>
        </Grid>
      </Grid>
    </>
  );
}
export default Sobre;
