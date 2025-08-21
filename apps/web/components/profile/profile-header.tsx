import { auth } from '@/auth';
import ProfileAvatarEditor from '@/components/profile/profile-avatar-editor';
import { User } from '@/types/user.type';
import { Button } from '@repo/shadcn/button';
import { Camera, Edit } from '@repo/shadcn/lucide';
import Image from 'next/image';
import Link from 'next/link';

const ProfileHeader = async ({ user }: { user: User }) => {
  const session = await auth();

  return (
    <div className="relative pb-4">
      {/* Cover Photo */}
      <div className="h-48 sm:h-64 w-full relative rounded-b-lg overflow-hidden">
        <Image
          src={'/assets/placeholder.svg'}
          alt="Cover"
          fill
          className="w-full h-full object-cover"
        />
        <Button
          size="sm"
          variant="secondary"
          className=" absolute bottom-4 right-4 hidden items-center gap-1"
        >
          <Camera className="size-4" />
          <span>Edit Cover Photo</span>
        </Button>
      </div>

      {/* Profile Photo and Name */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-20 ml-0 sm:ml-8 relative z-10">
        <div className="relative">
          <ProfileAvatarEditor />
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4 mb-2 sm:mb-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {user.profile.name ?? session?.user.profile.name}
              {user.username === session?.user?.username &&
                !session?.user.isEmailVerified && (
                  <Link
                    href={'/auth/confirm-email'}
                    className="text-sm underline font-normal"
                  >
                    verified
                  </Link>
                )}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.username ?? session?.user?.username}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className=" hidden items-center gap-1"
          >
            <Edit className="size-4" />
            <span>Edit Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
