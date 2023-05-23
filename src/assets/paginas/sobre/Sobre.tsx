import { Grid } from "@material-ui/core";
import "./Sobre.css"
function Sobre() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8} className="sobreTexto">
          <h1>Sobre</h1>
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
        </Grid>
        <Grid item xs={3}>
          <img className="sobreImagem"
            src="/src/images/background-sobre.png"
          ></img>
        </Grid>
      </Grid>
    </>
  );
}
export default Sobre;
