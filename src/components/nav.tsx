/* eslint-disable @typescript-eslint/no-misused-promises */
import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { SettingsButton } from "./button";

const Nav = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { data } = useSession();

  if (!data) return null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="relative flex items-center">
        <Image
          src={data.user.image || "/default-profile.jpg"}
          width={40}
          height={40}
          alt="profile picture"
          className="select-none rounded-full"
        />
        <p className="ml-2 text-lg font-medium text-[#323030]">
          {data.user.username}
        </p>
        <button className="peer" onClick={() => setSettingsOpen(!settingsOpen)}>
          <Icon
            icon="mdi:chevron-down"
            className="peer ml-1 mt-1 text-xl text-[#323030] transition-transform duration-200"
            style={{ transform: settingsOpen ? "rotate(180deg)" : "" }}
          />
        </button>
        <div
          className="absolute top-full mt-1 min-w-[200px] rounded-md bg-white py-2 shadow-lg shadow-black/5 outline outline-1 outline-black/5"
          style={{ visibility: settingsOpen ? "visible" : "hidden" }}
        >
          <div className="z-10 px-4 py-1 text-sm text-[#888]">
            {data.user.email}
          </div>
          <SettingsButton icon="clarity:cog-line" text="Account settings" />
          <SettingsButton
            icon="ion:log-out-outline"
            text="Log out"
            onClick={signOut}
          />
        </div>
      </div>
      <Image
        src={"/logo.png"}
        width="144"
        height="45"
        alt="logo"
        className="pointer-events-none select-none"
      />
      <div className="flex h-fit items-center justify-center rounded-full bg-[#EDF2FF] px-1 py-1">
        <Icon icon="ph:bell-bold" className=" text-[20px] text-[#2F2E6D]" />
        <div className=" ml-1 rounded-full bg-[#6365EF] px-2 py-1 text-center text-xs font-bold leading-tight text-white">
          23
        </div>
      </div>
    </div>
  );
};

export default Nav;
