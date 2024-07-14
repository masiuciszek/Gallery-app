import {Flex, Separator} from "@radix-ui/themes";
import {cookies} from "next/headers";
import type {ReactNode} from "react";

import {ActiveLink} from "@/shared/components/active-link";
import {Link} from "@/shared/components/link";
import {NavIcon} from "@/shared/components/nav-icon";
import {Span, Strong} from "@/shared/components/typography";
import {siteData} from "@/site-data";

import {MainFooter} from "../_layout-components/main-footer";
import {MainHeader} from "../_layout-components/main-header";
import {ToggleTheme} from "../_layout-components/toggle-theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  let cookieStore = cookies();
  let storedTheme = cookieStore.get("theme");
  return (
    <>
      <MainHeader />
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r sm:flex">
        <nav className="flex flex-col gap-4 px-2 sm:py-5">
          <Link href="/">
            <Strong className="uppercase">{siteData.title}</Strong>
          </Link>
          <ul className="flex flex-col gap-4">
            {siteData.navLinks.map((link) => (
              <li key={link.href}>
                <ActiveLink href={link.href}>
                  <Flex gap="2">
                    <NavIcon href={link.href} />
                    <Span>{link.text}</Span>
                  </Flex>
                </ActiveLink>
              </li>
            ))}
            <Separator size="4" />
            <li className="flex gap-2">
              <ToggleTheme
                theme={storedTheme?.value === "dark" ? "dark" : "light"}
              />
              <Span>
                {storedTheme?.value === "dark" ? "Dark" : "Light"} theme
              </Span>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex min-h-[calc(100dvh-10rem)] flex-col border border-red-600 sm:ml-auto sm:w-[calc(100dvw-14rem)]">
        {/* <main className="flex min-h-[calc(100dvh-10rem)] flex-col border border-red-600"> */}
        {children}
      </main>
      <MainFooter />
    </>
  );
}
