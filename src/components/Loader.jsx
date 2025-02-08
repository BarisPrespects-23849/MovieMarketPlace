import "../styles/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container" role="alert" aria-busy="true">
      <div className="spinner" aria-label="Loading content"></div>
    </div>
  );
};

export default Loader;
