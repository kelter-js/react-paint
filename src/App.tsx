import "./App.css";

const App = (): JSX.Element => {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">React Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
    </div>
  );
};

export default App;
