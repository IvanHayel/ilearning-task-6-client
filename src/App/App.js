import {Container}                        from "@mui/material";
import {observer}                         from "mobx-react-lite";
import {Route, Routes}                    from "react-router-dom";
import {ROUTE_URL}                        from "../Constants";
import {Footer, Header, Home, Whoops404,} from "../Modules";

const App = observer(() => {
  return (
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route exact path={ROUTE_URL.HOME} element={<Home />} />
          <Route exact path="*" element={<Whoops404 />} />
        </Routes>
        <Footer />
      </Container>
  );
});

export default App;
