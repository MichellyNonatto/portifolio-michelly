import { ProfileSection } from "@/components/sections/profile/profile-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { ProjectSection } from "@/components/sections/projects/projects-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full py-12 lg:py-20 flex flex-col gap-16 lg:gap-24">
        <ProfileSection />
        <AboutSection />
        <ProjectSection />
        <SkillsSection />
      </div>
    </main>
  );
}
