export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" flex items-center justify-center">
        <div className="animate-bounce ">
          <svg
            width="88"
            height="100"
            viewBox="0 0 88 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.4583 0L87.5423 25.2349L46.3048 52.3163L0.45108 25.2349L44.4583 0Z"
              fill="#F74581"
            />
            <path
              d="M0.45108 25.2349L46.3047 52.3163V99.4009L1.06657 74.166L0.45108 25.2349Z"
              fill="#813380"
            />
            <path
              d="M46.3047 52.3163L87.5422 25.2349V73.8583L46.3047 99.0932V52.3163Z"
              fill="#1A237E"
            />
            <path
              d="M0.466277 26.2648L0.451026 25.235L1.06651 25.5427L46.613 98.7864L46.3047 99.401L45.8523 99.1648L0.466277 26.2648Z"
              fill="#F74581"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
