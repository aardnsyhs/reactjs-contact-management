import { Link } from "react-router";

export default function Button({
  type = "button",
  to = "#",
  onClick,
  icon,
  children,
  color = "blue",
}) {
  const colorClass =
    color === "gradient"
      ? "bg-gradient"
      : color === "red"
      ? "bg-gradient-to-r from-red-600 to-red-500"
      : "bg-blue-600";
  const baseClass = `px-4 py-2 ${colorClass} text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 ${
    color === "red"
      ? "focus:ring-red-500 focus:ring-offset-red-800"
      : "focus:ring-blue-500 focus:ring-offset-gray-800"
  } transition-all duration-200 font-medium shadow-md flex items-center`;

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
