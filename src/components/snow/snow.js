import './snow.scss';

export default function Snow({ flakeCount = 100 }) {
  const flakes = Array.from({ length: flakeCount }).map(() => {
    return(
      <div className="flake">❄️</div>
    );
  });
  return (
    <div className="snow">
      {flakes}
    </div>
  );
}

