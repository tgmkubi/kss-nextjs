"use client"

import { useState } from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { useSignOut } from "@/lib/useSignOut";
import { Button } from "../ui/button";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const signOut = useSignOut();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Header: logo + toggle/menu */}
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="text-lg font-bold">
            MyApp
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-sm border px-3 py-1 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button onClick={signOut}>Sign Out</Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="mt-3 md:hidden">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col gap-3">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  )
}
