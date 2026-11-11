import { en } from "@/i18n/en";
import { ProfileContent } from "./profile-content";
import { ProfileStats } from "./profile-stats";
import { ProfileImage } from "./profile-image";

export function ProfileSection() {
  const { profile } = en;

  return (
    <section
      id="profile"
      aria-label="Introduction & Profile Summary"
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
    >
      <div className="lg:col-span-7 flex flex-col items-start gap-8">
        <ProfileContent
          headline={profile.headline}
          summary={profile.summary}
          profileActions={profile.profileActions}
        />
        <ProfileStats stats={profile.stats} />
      </div>

      <ProfileImage
        imageSrc="/images/profile.jpg"
        altText={profile.imageAlt}
        badgeRole={profile.badge.role}
        badgeIcon={profile.badge.icon}
        className="lg:col-span-5"
      />
    </section>
  );
}
