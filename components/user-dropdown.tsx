"use client";

import { useState } from "react";
import Image from "next/image";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import LogoSVG from "@/components/logo-svg";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Modal,
  IconButton,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbLogout2 } from "react-icons/tb";
import { signOut } from "next-auth/react";

export default function UserDropdown({
  user,
}: {
  user: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}) {
  const router = useRouter();
  const [SigningOutModalOpen, setSigningOutModalOpen] = useState(false);
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
          sx={{
            p: 0,
            borderRadius: "9999px",
            height: "38px",
            width: "38px",
            "&:hover": {
              opacity: "75%",
            },
            "&:focus-visible": {
              outlineWidth: "2px",
              outlineOffset: "0px",
              outlineColor: "#fff",
            },
          }}
        >
          <Image
            src={user.image ? user.image : "/user.png"}
            alt="Profile Image"
            width={38}
            height={38}
            className="h-[38px] w-[38px] rounded-full object-cover object-center"
          />
        </MenuButton>
        <Menu
          placement="bottom-end"
          sx={{
            p: 0,
            width: "240px",
            border: "1px solid #27272a",
            borderRadius: "8px",
          }}
        >
          <div className="p-3.5">
            <p className="text-sm text-zinc-400">Signed in as</p>
            <span>{user.name}</span>
          </div>
          <div className="border-y border-zinc-800 p-1">
            <MenuItem
              onClick={() => router.push("/dashboard")}
              className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            >
              <MdOutlineSpaceDashboard size={20} />
              <span className="ml-2">Dashboard</span>
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/dashboard/workout/all")}
              className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            >
              <LogoSVG className="mt-0.5 h-5 w-5" />
              <span className="ml-[9px]">Workouts</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/dashboard/progress");
              }}
              className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            >
              <FaArrowTrendUp size={18} className="ml-px mt-px" />
              <span className="ml-[9px]">Progress</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/settings");
              }}
              className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
            >
              <LuSettings size={19} className="ml-px mt-px" />
              <span className="ml-2">Settings</span>
            </MenuItem>
          </div>
          <div className="p-1">
            <MenuItem
              className="items-center rounded-[4px] px-2 *:text-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
              onClick={async () => {
                setSigningOutModalOpen(true);
                const toastId = toast.loading("Signing out...");
                const data = await signOut({
                  redirect: false,
                  callbackUrl: "/",
                });
                router.push(data.url);
                router.refresh();
                toast.success("Signed out successfully!", {
                  id: toastId,
                });
              }}
            >
              <TbLogout2 size={19} strokeWidth={2.4} className="mt-px" />
              <span className="ml-2">Sign out</span>
            </MenuItem>
          </div>
        </Menu>
      </Dropdown>
      <SigningOutModal open={SigningOutModalOpen} />
    </>
  );
}

function SigningOutModal({ open }: { open: boolean }) {
  return (
    <Modal
      aria-labelledby="Signing out"
      aria-describedby="You are currently being signed out."
      open={open}
    >
      <div></div>
    </Modal>
  );
}
