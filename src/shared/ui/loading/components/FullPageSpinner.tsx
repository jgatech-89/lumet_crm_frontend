import { AppSkeleton } from "./AppSkeleton";

export function FullPageSpinner() {
  return <AppSkeleton variant="dashboard" fullPage tableRows={5} />;
}