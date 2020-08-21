import React, { useState, useEffect } from "react";
import axiosWithAuth from "../auth/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getColors = async () => {
    try {
      let res = await axiosWithAuth().get('/api/colors')
      let colors = res.data
      setColorList(colors)
    } catch (error) {
      console.log(error.message)

    }
  }

  useEffect(() => {
    getColors()
  }, [])
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
