import React, { useState, useEffect } from "react";
import axiosWithAuth from "../auth/axiosWithAuth";
import { useHistory } from 'react-router-dom'

const initialColor = {
  color: "",
  code: { hex: "" }
};


const ColorList = ({ colors, updateColors }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  useEffect(() => {
    console.log(colorToEdit)
  }, [colorToEdit])

  const update = async () => {
    try {
      let res = await axiosWithAuth().get('/api/colors')
      let colors = res.data
      updateColors(colors)
    } catch (error) {
      console.log(error.message)

    }
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // history.pushState(`/bubbles/${color.id}`)
  };

  const saveEdit = async e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    try {
      await axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      update()
    } catch (error) {
      console.log(colorToEdit.id)
    }
  };

  const deleteColor = async (color) => {
    // make a delete request to delete this color
    const { id } = color
    try {
      await axiosWithAuth().delete(`/api/colors/${id}`)
      update()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li data-testid='bubble' key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
