import NavBar from "../NavBar/navBar";

function ChatSection() {
  return (
    <div className="Chat-main">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <NavBar />
      <div className="Dialog-menu">
        <div className="Confs-section">
          <div className="Chat-one">
            <div className="Chat-name"></div>
          </div>
          <div className="Chat-one">
            <div className="Chat-name"></div>
          </div>
          <div className="Chat-one">
            <div className="Chat-name"></div>
            <div className="Chat-pic"></div>
            <div className="Chat-text"></div>
          </div>
          <div className="Chat-one">
            <div className="Chat-name"></div>
          </div>
          <div className="Chat-one">
            <div className="Chat-name"></div>
          </div>
          <div className="Chat-one">
            <div className="Chat-name"></div>
          </div>
        </div>
        <div className="Dialog-section">
          <div className="Message-panel"></div>
        </div>
      </div>
    </div>
  );
}
export default ChatSection;
