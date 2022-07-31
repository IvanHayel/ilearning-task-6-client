import {AppBar, Toolbar, Typography} from "@mui/material";
import {observer}                    from "mobx-react";
import React                         from "react";
import {useNavigate}                 from "react-router-dom";
import {ROUTE_URL}                   from "../../Constants";
import "./Styles/Header.scss";

export const Header = observer(() => {
  const navigate = useNavigate();
  const handleBrandClick = () => navigate(ROUTE_URL.HOME);
  return (
      <AppBar position="sticky" className="header-bar"
              sx={{backgroundColor: 'mediumpurple'}}>
        <Toolbar>
          <Typography
              variant="h5"
              noWrap
              onClick={handleBrandClick}
              className="brand"
          >
            Task 6
          </Typography>
        </Toolbar>
      </AppBar>
  );
});
