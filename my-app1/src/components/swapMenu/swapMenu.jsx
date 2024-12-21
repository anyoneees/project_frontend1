import NavBar from "../NavBar/navBar";
function SwapMenu() {
  return (
    <div className="Item-menu">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <NavBar />

      <div className="Item-menu-main-block">
        <div className="Info-menu-main-block">
            <div className="Info-text">
              hello world!
            </div>
        </div>

        <div className="Image-panel-swapMenu"></div>
        <div className="Extra-image-swapMenu">
          <div className="Item-image-swapmenu"></div>
          <div className="Item-image-swapmenu"></div>
          <div className="Item-image-swapmenu"></div>
          <div className="Item-image-swapmenu"></div>
          <div className="Item-image-swapmenu"></div>
          <div className="Item-image-swapmenu"></div>
        </div>
      </div>
    </div>
  );
}
export default SwapMenu;
