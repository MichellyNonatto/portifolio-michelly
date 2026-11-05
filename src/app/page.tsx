import { ProfileSection } from "@/components/sections/profile/profile-section";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full py-12 lg:py-20">
        <ProfileSection />
      </div>
    </main>
  );
}
