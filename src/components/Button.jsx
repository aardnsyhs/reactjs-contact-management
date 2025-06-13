import { Link } from "react-router";

export default function Button({
  type = "button",
  to = "#",
  onClick,
  icon,
  children,
  color = "blue",
  className = "",
}) {
  let colorClass = "";
  let focusClass = "";

  switch (color) {
    case "red":
      colorClass = "bg-gradient-to-r from-red-600 to-red-500";
      focusClass =
        "focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800";
      break;
    case "gray":
      colorClass = "bg-gray-700 hover:bg-gray-600";
      focusClass =
        "focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800";
      break;
    case "gradient":
      colorClass = "bg-gradient";
      focusClass =
        "focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800";
      break;
    default:
      colorClass = "bg-blue-600";
      focusClass =
        "focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800";
      break;
  }

  const baseClass = `px-4 py-2 ${colorClass} text-white rounded-lg hover:opacity-90 focus:outline-none ${focusClass} transition-all duration-200 font-medium shadow-md flex items-center justify-center ${className}`;

  if (type === "link") {
    return (
      <Link to={to} className={baseClass}>
        <i className={`fas ${icon} mr-2`} />
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      <i className={`fas ${icon} mr-2`} />
      {children}
    </button>
  );
}
