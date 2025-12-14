//Next
import Link from "next/link";

//paths constant
import { PATHS } from "@/constant/PATHS";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-main text-center px-6">
      <div>
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <p className="text-muted mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          href={PATHS.HOME}
          className="btn-primary px-6 py-3 rounded-lg font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
