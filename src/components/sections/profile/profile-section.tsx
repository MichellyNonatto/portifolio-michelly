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
          summary={profile.resume}
          profileActions={profile.profileActions}
        />
        <ProfileStats stats={profile.stats} />
      </div>

      <ProfileImage
        imageSrc="https://media.licdn.com/dms/image/v2/D4D03AQHJeJsEU6F3WQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723343535380?e=1796256000&v=beta&t=nVcJRCV3HEFcbsqNVcFj2G8w8yvnSUEdI06zZsD4ZPU"
        altText={profile.imageAlt}
        badgeRole={profile.badge.role}
        badgeIcon={profile.badge.icon}
        className="lg:col-span-5"
      />
    </section>
  );
}
