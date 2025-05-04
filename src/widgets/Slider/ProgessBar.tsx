// fix: создать отдельный компонент прогресс бара на нативном прогресс баре
export const ProgressBar = ({ progress }: { progress: number }) => (
  <div
    className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={progress}
  >
    <div
      className="h-full bg-white transition-[width] duration-400 ease-in-out"
      style={{ width: `${progress}%` }}
    />
  </div>
)
