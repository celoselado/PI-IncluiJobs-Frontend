import { AppBar, Tabs, Tab, Box, Typography, Grid } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import ListaPostagem from "../listaPostagem/ListaPostagem";
import "./TabPostagem.css";
import ListaTema from "../../temas/listaTema/ListaTema";

function TabPostagem() {
  const [value, setValue] = useState("1");
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className="barra">
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" />
            <Tab label="Temas" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" style={{ backgroundColor: "#E8AA42" }}>
          <Box display="flex" flexDirection="column" alignItems="center" className="post">
            <Box>
              <ListaPostagem />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2" style={{ backgroundColor: "#E8AA42"}}>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <ListaTema />
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;
