"use client";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GiAnarchy } from "react-icons/gi";
import Skeletom from "@/app/components/Skeleton";
import axios from "axios";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Link href="/">
              <GiAnarchy />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();
  return (
    <ul className="flex space-x-6">
      {links.map(({ href, label }) => {
        return (
          <Link
            className={`${
              href === currentPath ? "text-zinc-900" : "text-zinc-500"
            } text-zinc-500 hover:text-zinc-900 transition-colors`}
            key={href}
            href={href}
          >
            {label}
          </Link>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Skeletom width="3rem" />;
  if (status === "unauthenticated") return <Link href="/api/auth/signin">로그인</Link>;

  const handleClick = async () => {
    router.push("/api/auth/signout");
  };

  return (
    <Box>
      <Flex align="center" gap="2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2"> {session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item color="red" onClick={handleClick}>
              로그아웃
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Text size="2">{session!.user!.name}님 환영합니다</Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
