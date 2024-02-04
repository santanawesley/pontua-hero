import "./styles.scss";

interface LoadingProps {
  size?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = "small" }) => {
  return (
    <div
      className={`c-loader ${size === "large" ? "loader-large" : ""}`}
      data-testid="loading"
    ></div>
  );
};

export default Loading;
