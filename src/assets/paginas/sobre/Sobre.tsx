import { Grid } from "@material-ui/core";

function Sobre() {
  return (
    <>
      <Grid direction="row" style={{ border: "1px solid red" }}>
        <Grid xs={8} style={{ border: "1px solid red", margin: "18px" }}>
          <h1>Sobre</h1>
          <p>
            O objetivo do projeto é criar uma rede social que conecte grupos de
            pessoas que enfrentam dificuldades para ingressar ou reingressar no
            mercado de trabalho, como pessoas LGBTQIA+, mulheres, pessoas negras
            ou pardas, pessoas com deficiência, ex-presidiários, entre outros,
            com empresas que possuem vagas voltadas para esses grupos. A ideia é
            criar uma plataforma inclusiva e acessível para que essas pessoas
            possam encontrar oportunidades e se conectar com outras pessoas em
            situações similares.
          </p>
        </Grid>
        <Grid xs={4}>
          <img src="https://media.discordapp.net/attachments/1094735633810997421/1108382939328294922/close-up-vista-superior-de-jovens-empresarios-de-maos-dadas_515275-299.png?width=472&height=472"></img>
        </Grid>
      </Grid>
    </>
  );
}
export default Sobre;
