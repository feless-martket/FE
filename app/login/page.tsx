import LoginForm from "@/feature/login/login-form";
import { Footer } from "@/components/layout/footer";

export default function Page() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100 pb-[52px]">
      <LoginForm />
      <Footer />
    </div>
  );
}
