import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProfileEditForm } from "@/feature/profile/profile-edit-form";
import { PageLayout } from "@/components/layout/pagelayout";

export default function ProfileEditPage() {
  return (
    <PageLayout>
      <Header title="개인 정보 수정" />
      <main className="mt-6 space-y-4">
        <ProfileEditForm />
      </main>
      <Footer />
    </PageLayout>
  );
}
