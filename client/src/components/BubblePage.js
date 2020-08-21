import React, { useState, useEffect } from "react";
import axiosWithAuth from "../auth/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { fetchColors } from '../api/fetchColors'

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    fetchColors().then(res => {
      setColorList(res.data)
    })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  // const getColors = async () => {
  //   try {
  //     let res = await axiosWithAuth().get('/api/colors')
  //     let colors = res.data
  //     setColorList(colors)
  //   } catch (error) {
  //     console.log(error.message)

  //   }
  // }