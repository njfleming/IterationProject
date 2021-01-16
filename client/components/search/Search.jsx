import React, { useState, useEffect, useRef } from "react";
import useInput from "../hooks/useInput";
import SearchList from "./SearchList";
import useToggler from "../hooks/useToggler";
import Loader from "./Loader";
import {
  Button,
  TextField,
  Dialog,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Spinner from "./Spinner";
import useStyles from "../../style/theme";
const axios = require("axios");

const Search = ({ userId, addProduct, startSpinner, getAllProducts }) => {
  const firstRender = useRef(true);
  const [searchVal, handleSearchVal, resetSearch] = useInput("");
  const [urlInput, setUrl, resetUrl] = useInput("");
  const [results, setResults] = useState([]);
  const [isFetching, toggler] = useToggler(false);
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [stores, setStores] = useState({
    target: false,
    bestbuy: false,
    walmart: false,
    apple: false,
    newegg: false,
  });
  const classes = useStyles();

  const storesId = {
    target: "m10046",
    bestbuy: "g7187155",
    walmart: "g8299768",
    apple: "m3622330",
    newegg: "g8277688",
  };

  const handleChange = (event) => {
    setStores({ ...stores, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchVal) return alert("Please fill in the search bar input!");

    toggler();
    let merchants = "";
    let arr = [];
    for (let prop in stores) {
      stores[prop] ? arr.push(storesId[prop]) : null;
    }
    merchants = arr.join(",");
    console.log("merchants", merchants);
    const params = {
      api_key: "CD73F000ECD64896BF38A4F007A654BA",
      search_type: "shopping",
      sort_by: "relevance",
      gl: "us",
      hl: "en",
      google_domain: "google.com",
      q: `${searchVal}`, //,merchagg:g8277688%7Cg829768`,
      shopping_condition: "new",
      shopping_merchants: merchants,
    };

    axios
      .get("https://api.scaleserp.com/search", { params })
      // .then((response) => response.json())
      .then((response) => {
        const goodUrl = "google.com/shopping/product/";
        console.log(response.data);
        const items = response.data.shopping_results;
          // .filter((item) => {
          //   return item.link.includes(goodUrl);
          // })
          // .slice(0, 20);
        items.forEach(
          (el) => {
            el.link = "https://www.google.com/shopping/product/" + el.id
            el.stores = stores
          }
        );
        console.log("items: ", items);
        setOpen(true);

        setResults(items);
        console.log("open: ", open);
        firstRender.current = false;
      })
      .catch((err) => console.log(err));

    resetSearch();
  };

  const clearResults = () => {
    setOpen(false);
    setResults([]);
  };

  const handleUrl = (e) => {
    e.preventDefault();

    const goodUrl = "google.com/shopping/product/";

    if (!urlInput.includes(goodUrl)) {
      resetUrl();
      return alert("Invalid product url. Please try again");
    }

    setSpinner(true);
  };

  useEffect(() => {
    if (firstRender.current) return;
    if (results.length < 1) return; // maybe render a component for no products
    toggler();
  }, [results]);

  useEffect(() => {
    if (!spinner) return;

    const google_url = urlInput;

    fetch(`/api/products/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_url,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        getAllProducts();
        setSpinner(false);
        resetUrl();
      })
      .catch((err) => {
        console.log("main ue addProduct", err);
        setSpinner(false);
        alert("Uh oh! Seems like the link is broken. Please try again.");
        resetUrl();
      });
  }, [spinner]);

  if (isFetching) return <Loader />;
  if (spinner) return <Spinner />;

  return results.length > 0 ? (
    <Dialog open={open} onClose={clearResults}>
      <SearchList
        startSpinner={startSpinner}
        results={results}
        clearResults={clearResults}
        addProduct={addProduct}
        setOpen={setOpen}
      />
    </Dialog>
  ) : (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10} justify="center">
          <form onSubmit={handleSubmit}>
            <TextField
              id="search_bar"
              className={classes.searchBar}
              variant="outlined"
              label="Search for a product"
              value={searchVal}
              onChange={handleSearchVal}
              inputProps={{ className: classes.searchBar }}
            />
          </form>
        </Grid>
        <Grid item xs={2}>
          <Button
            className={classes.searchBtn}
            id="search_btn"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" m={2}>
            <FormLabel component="legend">Select Stores:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                id="target"
                control={
                  <Switch
                    checked={stores.target}
                    onChange={handleChange}
                    name="target"
                  />
                }
                label="Target"
              />
              <FormControlLabel
                id="bestbuy"
                control={
                  <Switch
                    checked={stores.bestbuy}
                    onChange={handleChange}
                    name="bestbuy"
                  />
                }
                label="Best Buy"
              />
              <FormControlLabel
                id="walmart"
                control={
                  <Switch
                    checked={stores.walmart}
                    onChange={handleChange}
                    name="walmart"
                  />
                }
                label="Walmart"
              />
              <FormControlLabel
                id="apple"
                control={
                  <Switch
                    checked={stores.apple}
                    onChange={handleChange}
                    name="apple"
                  />
                }
                label="Apple"
              />
              <FormControlLabel
                id="newegg"
                control={
                  <Switch
                    checked={stores.newegg}
                    onChange={handleChange}
                    name="newegg"
                  />
                }
                label="New Egg"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;

// https://www.google.com/search?q=headphones&gl=us&hl=en&tbm=shop&tbs=vw:l,new:1,merchagg:g8277688%7Cg829976,p_ord:p,
// https://www.google.com/search?gl=us&hl=en&tbm=shop&q=headphones&tbs=vw:l,mr:1,p_ord:p,new:1,cat:505771,merchagg:g8277688%7Cg829976%7Cg8299768&sa=X&ved=0ahUKEwiM3dzlvYvuAhVGcq0KHcZFArYQsysIvgUoBQ&biw=1860&bih=1257
