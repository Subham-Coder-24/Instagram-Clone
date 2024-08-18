import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="header">
      <h2 className="logo">Instagram</h2>
      <div>
        <Link to="/" onClick={() => setTab("/")}>
          {tab === "/" ? (
            <Home style={{ fontSize: "30px", color: "white" }} />
          ) : (
            <HomeOutlined style={{ fontSize: "30px" }} />
          )}
          <Typography style={{ fontSize: "20px" }}>Home</Typography>
        </Link>

        <Link to="/newpost" onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <Add style={{ fontSize: "30px", color: "white" }} />
          ) : (
            <AddOutlined style={{ fontSize: "30px" }} />
          )}
          <Typography style={{ fontSize: "20px" }}>Create</Typography>
        </Link>

        <Link to="/search" onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <Search style={{ fontSize: "30px", color: "white" }} />
          ) : (
            <SearchOutlined style={{ fontSize: "30px" }} />
          )}
          <Typography style={{ fontSize: "20px" }}>Search</Typography>
        </Link>

        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <AccountCircle style={{ fontSize: "30px", color: "white" }} />
          ) : (
            <AccountCircleOutlined style={{ fontSize: "30px" }} />
          )}
          <Typography style={{ fontSize: "20px" }}>Profile</Typography>
        </Link>
        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <AccountCircle style={{ fontSize: "30px", color: "white" }} />
          ) : (
            <AccountCircleOutlined style={{ fontSize: "30px" }} />
          )}
          <Typography style={{ fontSize: "20px" }}>Reels</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Header;
