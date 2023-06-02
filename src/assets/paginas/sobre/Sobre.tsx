import { Box, Grid, Tooltip, Typography } from "@material-ui/core";
import "./Sobre.css";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Navbar from "../../components/estaticos/navbar/Navbar";

function Sobre() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="caixaSobre"
      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="titulo2"
            >
              Sobre a Inclui Jobs:
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className="texto2"
            >
              O objetivo do projeto é criar uma rede social que conecte grupos
              de pessoas que enfrentam dificuldades para ingressar ou
              reingressar no mercado de trabalho, como pessoas LGBTQIA+,
              mulheres, pessoas negras ou pardas, pessoas com deficiência,
              ex-presidiários, entre outros, com empresas que possuem vagas
              voltadas para esses grupos. A ideia é criar uma plataforma
              inclusiva e acessível para que essas pessoas possam encontrar
              oportunidades e se conectar com outras pessoas em situações
              similares.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://cdn.discordapp.com/attachments/1094735633810997421/1113972270076022844/backgroundCadTemas2.png"
            alt=""
            width="100%"
            height="100%"
          />
        </Grid>
      </Grid>
      <div style={{ backgroundColor: "black" }}>
        <br></br>
        <h1>Conheça nossa equipe!</h1>
        <br />
      </div>
      <Stack direction={"row"} className="equipe">
        <Box marginX={"auto"}>
          <Stack direction={"row"} flexWrap={"wrap"}>
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" />
                  <img
                    className="img img1"
                    src="https://media.discordapp.net/attachments/1094735633810997421/1113464364444426290/chrome_image_31_de_mai._de_2023_10_49_29_BRT.png?width=662&height=662"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Aline Soglia</div>
              <div className="title">
                Apaixonada por tecnologia desde criança, cursei técnico em
                informática durante o ensino médio. Trabalhei por 12 anos no
                setor público com atendimento, hoje estou em transição de
                carreira e com um interesse crescente pela inovação e pelo
                impacto positivo que a tecnologia pode ter na vida das pessoas.
                Estou animada para colocar em prática meus conhecimento nessa
                área.
              </div>
            </div>
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" />
                  <img
                    className="img img2"
                    src="https://media.discordapp.net/attachments/1094735633810997421/1113175458046038056/WhatsApp_Image_2023-05-30_at_15.40.54-PhotoRoom.png-PhotoRoom.png?width=489&height=662"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Erenilda Tavares</div>
              <div className="title">
                Desenvolvedora Full Stack entusiasmada, com experiência em Java
                e React. tenho 23 anos, descobri minha paixão pela tecnologia
                durante o ensino médio. Após trabalhar em São Paulo e aprimorar
                minhas habilidades em comunicação e trabalho em equipe,
                participei de um programa de treinamento intensivo em
                desenvolvimento Java Fullstack. Agora, estou confiante e pronta
                para contribuir, buscando criar soluções inovadoras, entregar
                projetos de alta qualidade, sempre aprendendo e me adaptando às
                tecnologias mais recentes.
              </div>
            </div>
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" />
                  <img
                    className="img img3"
                    src="https://media.discordapp.net/attachments/1094735633810997421/1113488727201812541/chrome_image_31_de_mai._de_2023_12_26_27_BRT.png?width=577&height=662"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name">Marcelo Alexandre</div>
              <div className="title">
                Da Zona Leste de São Paulo, amante de tecnologias e de
                atualidades, quando não estou digitando código pode ter certeza
                que vou estar jogando algum FPS! Trabalhei por 1 ano como
                bartender até realizar ter primeiro contato com um cursinho de
                programação que realizei por curiosidade no youtube. A partir
                dali decidi que queria seguir essa carreira e realizei o
                bootcamp da Generation Brasil, depois de 3 meses estudando e
                desenvolvendo experiência tenho certeza que estou pronto pra
                aplicar em um cargo de Dev Junior na sua empresa!
              </div>
            </div>
          </Stack>
          <Stack direction={"row"} flexWrap={"wrap"} marginBottom={10}>
            {/* imagem 4* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" />
                  <img
                    className="img img4"
                    src="https://media.discordapp.net/attachments/1094735633810997421/1113478374170558484/chrome_image_31_de_mai._de_2023_11_42_23_BRT.png?width=605&height=662"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name2">Raylane Silva</div>
              <div className="title2">
                Sou uma jovem natural do interior de Minas Gerais. Sempre fui
                curiosa e com interesse em aprender coisas novas. Em 2019,
                decidi cursar publicidade e propaganda para explorar minha
                criatividade, mas acabei me interessando pela tecnologia da
                informação. Desde aquele momento tive certeza de qual carreira
                gostaria de seguir. Hoje sou uma profissional da área de TI,
                formada pela Generation Brasil, atuando como Desenvolvedora
                FullStack Junior e estou animada para colocar meus conhecimentos
                em prática.
              </div>
            </div>
            {/* imagem 5* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" />
                  <img
                    className="img img5"
                    src="https://media.discordapp.net/attachments/1094735633810997421/1113463630525112400/share6352647615855199583.png?width=536&height=472"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name2">Rebeca Leite</div>
              <div className="title2">
                Regressei a tecnologia recentemente por meio do bootcamp da
                Generation Brasil, no curso de Desenvolvedora Fullstack Java,
                isso após 1 ano e alguns meses, de colocar a carreira de
                tecnologia como segundo plano na minha vida para atuar na área
                comercial em uma oportunidade de jovem aprendiz, com o fim da
                oportunidade voltei meu foco para análise e desenvolvimento.
                Após bootcamp busco minha primeira oportunidade para ingressar
                como desenvolvedora no mercado de trabalho.
              </div>
            </div>
            {/* imagem 6* */}
            <div className="person">
              <div className="container">
                <div className="container-inner">
                  <img className="circle" src="*** imagem de fundo ***" />
                  <img
                    className="img img6"
                    src="https://media.discordapp.net/attachments/1094735633810997421/1113163715425095771/vinicius.png?width=217&height=472"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="name2">Vinicius Silva</div>
              <div className="title2">
                Desde os 5 anos de idade, tive meu primeiro contato com
                tecnologia através de uma caixa branca mágica chamada PS One.
                Devido às circunstâncias financeiras da minha família, decidi
                buscar emprego cedo. Aos 18 anos, consegui meu primeiro emprego
                em uma farmácia, onde trabalhei por 3 anos e fui promovido duas
                vezes. No entanto, aos 20 anos, decidi seguir meu sonho de
                infância de trabalhar com tecnologia então comecei a estudar.
                Atualmente, sou um desenvolvedor fullstack especializado em Java
                e React. Meu objetivo é continuar crescendo e progredindo nessa
                área.
              </div>
            </div>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
export default Sobre;
