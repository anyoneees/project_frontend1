import { Button } from "react-bootstrap";
import { useState } from "react";
import SearchBar from "../NavBar/searchBar";
function NavPanel({ NavPanelData }) {
  //const colors = ["secondary","success", "warning","danger", "info","light", "dark"]
  //const [buttonStyle, setButtonStyle] = useState("primary");
  //const ColorChange = () => {
  //const randomNum = Math.floor(Math.random() * (colors.length ));
  //console.log(randomNum)
  //setButtonStyle(colors[randomNum]);
  // }
  console.log(NavPanelData);
  return (
    <div className="Nav-block">
      <Button>{NavPanelData}{SearchBar}</Button>

    </div>
  );
}
export default NavPanel;
