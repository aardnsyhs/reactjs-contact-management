export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-white text-xl flex items-center space-x-3">
        <i className="fas fa-spinner fa-spin text-blue-400 text-3xl" />
        <span>Redirecting...</span>
      </div>
    </div>
  );
}
