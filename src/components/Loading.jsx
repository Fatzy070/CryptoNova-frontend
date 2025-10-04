// src/components/Loading.jsx
const Loading = ({ size = "w-6 h-6", color = "border-white" }) => {
  return (
    <div
      className={`rounded-full animate-spin border-2 ${size} ${color} border-t-transparent`}
    ></div>
  );
};

export default Loading;
