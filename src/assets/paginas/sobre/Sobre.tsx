import { Box, Grid, Tooltip, Typography } from "@material-ui/core";
import "./Sobre.css";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Navbar from "../../components/estaticos/navbar/Navbar";

function Sobre() {
  return (
    <>
      <Stack direction={"row"}>
        <Box className="sobreTexto">
          <h1>Sobre nós</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            accusantium officiis quas sunt labore, voluptatum perferendis.
            Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
            Perspiciatis harum laudantium odio minus eaque. Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. At accusantium officiis quas
            sunt labore, voluptatum perferendis. Numquam obcaecati ipsa
            aspernatur voluptatem velit ut quo. Perspiciatis harum laudantium
            odio minus eaque. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. At accusantium officiis quas sunt labore,
            voluptatum perferendis. Numquam obcaecati ipsa aspernatur voluptatem
            velit ut quo. Perspiciatis harum laudantium odio minus eaque. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. At accusantium
            officiis quas sunt labore, voluptatum perferendis. Numquam obcaecati
            ipsa aspernatur voluptatem velit ut quo. Perspiciatis harum
            laudantium odio minus eaque.
          </p>
        </Box>
        <Box>
          <div className="sobreImagem"></div>
        </Box>
      </Stack>
      <h1 style={{marginLeft: "2em"}}>Conheça nossa equipe!</h1>
      <Stack direction={"row"}>
        <Box marginX={"auto"}>
          <Stack direction={"row"} flexWrap={"wrap"}>
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img className="img img1" src="** imagem do perfil **" />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Desenvolvedor 1</div>
              <div className="title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                accusantium officiis quas sunt labore, voluptatum perferendis.
                Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
                Perspiciatis harum laudantium odio minus eaque. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. At accusantium
                officiis quas sunt labore, voluptatum perferendis. Numquam
                obcaecati ipsa aspernatur voluptatem velit ut quo. Perspiciatis
                harum laudantium odio minus eaque. Lorem ipsum dolor sit, amet
                consectetur
              </div>
            </div>
            {/* imagem 2* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img className="img img2" src="** imagem do perfil **" />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Desenvolvedor 2</div>
              <div className="title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                accusantium officiis quas sunt labore, voluptatum perferendis.
                Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
                Perspiciatis harum laudantium odio minus eaque. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. At accusantium
                officiis quas sunt labore, voluptatum perferendis. Numquam
                obcaecati ipsa aspernatur voluptatem velit ut quo. Perspiciatis
                harum laudantium odio minus eaque. Lorem ipsum dolor sit, amet
                consectetur
              </div>
            </div>
            {/* imagem 3* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img className="img img3" src="** imagem do perfil **" />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Desenvolvedor 3</div>
              <div className="title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                accusantium officiis quas sunt labore, voluptatum perferendis.
                Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
                Perspiciatis harum laudantium odio minus eaque. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. At accusantium
                officiis quas sunt labore, voluptatum perferendis. Numquam
                obcaecati ipsa aspernatur voluptatem velit ut quo. Perspiciatis
                harum laudantium odio minus eaque. Lorem ipsum dolor sit, amet
                consectetur
              </div>
            </div>
          </Stack>
          <Stack direction={"row"} flexWrap={"wrap"} marginBottom={10}>
            {/* imagem 4* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img className="img img3" src="** imagem do perfil **" />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Desenvolvedor 4</div>
              <div className="title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                accusantium officiis quas sunt labore, voluptatum perferendis.
                Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
                Perspiciatis harum laudantium odio minus eaque. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. At accusantium
                officiis quas sunt labore, voluptatum perferendis. Numquam
                obcaecati ipsa aspernatur voluptatem velit ut quo. Perspiciatis
                harum laudantium odio minus eaque. Lorem ipsum dolor sit, amet
                consectetur
              </div>
            </div>
            {/* imagem 5* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img className="img img3" src="** imagem do perfil **" />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Desenvolvedor 5</div>
              <div className="title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                accusantium officiis quas sunt labore, voluptatum perferendis.
                Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
                Perspiciatis harum laudantium odio minus eaque. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. At accusantium
                officiis quas sunt labore, voluptatum perferendis. Numquam
                obcaecati ipsa aspernatur voluptatem velit ut quo. Perspiciatis
                harum laudantium odio minus eaque. Lorem ipsum dolor sit, amet
                consectetur
              </div>
            </div>
            {/* imagem 6* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img className="img img3" src="" />
                </div>
              </div>
              
              <div className="name">Desenvolvedor 6</div>
              <div className="title">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                accusantium officiis quas sunt labore, voluptatum perferendis.
                Numquam obcaecati ipsa aspernatur voluptatem velit ut quo.
                Perspiciatis harum laudantium odio minus eaque. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. At accusantium
                officiis quas sunt labore, voluptatum perferendis. Numquam
                obcaecati ipsa aspernatur voluptatem velit ut quo. Perspiciatis
                harum laudantium odio minus eaque. Lorem ipsum dolor sit, amet
                consectetur
              </div>
            </div>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
export default Sobre;
