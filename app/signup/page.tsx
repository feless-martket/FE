import { PageLayout } from "@/components/layout/pagelayout";
import SignUp from "@/feature/signup/Signup";

export default function Page() {
  return (
    <PageLayout>
      <div className="flex size-full w-full justify-center bg-gray-100">
        <SignUp />
      </div>
    </PageLayout>
  );
}
