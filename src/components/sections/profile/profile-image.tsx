import Image from "next/image";

interface ProfileImageProps {
  imageSrc: string;
  altText: string;
  badgeRole: string;
  badgeIcon?: string;
  className?: string;
}

export function ProfileImage({
  imageSrc,
  altText,
  badgeRole,
  badgeIcon = "code",
  className = "",
}: ProfileImageProps) {
  return (
    <div className={`relative flex justify-center lg:justify-end ${className}`}>
      {/* Structural Backdrop Card */}
      <div className="relative w-full max-w-md p-4 sm:p-5 rounded-[28px] bg-secondary-container shadow-[8px_8px_0px_var(--color-on-surface)]">
        {/* Image Frame Wrapper */}
        <div className="relative rounded-2xl overflow-hidden bg-surface-container-highest aspect-square shadow-[2px_2px_0px_var(--color-on-surface)]">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>

        {/* Floating Neo-Brutalist Badge */}
        <div className="absolute -top-4 -right-2 sm:-right-4 px-4 py-2.5 rounded-full bg-primary text-on-primary shadow-[4px_4px_0px_var(--color-on-surface)] flex items-center gap-2 transform rotate-2">
          {badgeIcon && (
            <span aria-hidden="true" className="material-icons-outlined text-base">
              {badgeIcon}
            </span>
          )}
          <span className="font-display text-xs sm:text-sm font-bold">
            {badgeRole}
          </span>
        </div>
      </div>
    </div>
  );
}
