export default function SkeletonCard() {
  return (
    <div className="w-[279px] h-[500px] animate-pulse">
      <div className="h-[400px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      <div className="mt-5 h-[10px] w-[70%] rounded bg-gray-200" />
      <div className="mt-5 h-[14px] w-[40%] rounded bg-gray-300" />
    </div>
  );
}
