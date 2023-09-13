import { memo } from "react";

type Props = {
  fullName: string;
  emailAddress: string;
};

function User({ fullName, emailAddress }: Props) {
  return (
    <div className="flex items-center gap-4">
      <img
        src="https://img.icons8.com/external-flat-juicy-fish/60/external-social-social-media-marketing-flat-flat-juicy-fish-4.png"
        alt="logo"
        className="h-10 w-10 cursor-pointer rounded-full"
      />

      <div>
        <p className="text-sm font-bold">{fullName}</p>
        <p className="text-sm">{emailAddress}</p>
      </div>
    </div>
  );
}

export default memo(User);
