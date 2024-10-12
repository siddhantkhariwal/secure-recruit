import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center space-y-3 mt-10">
      {/* Animated Loader */}
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-16 w-16 mb-4"></div>
      {/* Loading Message */}
      <p className="text-blue-700 dark:text-blue-300">Loading content, please wait...</p>
      {/* Skeleton Elements */}
      <div className="w-full space-y-5">
        <Skeleton className="min-h-[200px] h-full w-full bg-blue-300" />
        <Skeleton className="min-h-[200px] h-full w-full bg-blue-300" />
        <Skeleton className="min-h-[200px] h-full w-full bg-blue-300" />
      </div>
    </div>
  );
}

// Add CSS for loader
const styles = `
  .loader {
    border-color: #3b82f6 transparent transparent transparent;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Inject styles into the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
