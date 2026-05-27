import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({
  isAuthenticated = true,
}: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }

      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const navLinks = [
    "Home",
    "Dashboard",
    // "My Roadmaps",
    // "Create Roadmap",
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1A1A1C] bg-[#0D0D0F]/95 backdrop-blur">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              className="
                text-sm
                text-[#D1D1D1]
                transition-colors
                hover:text-white
              "
            >
              {link}
            </button>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:block relative" ref={profileRef}>
          {isAuthenticated ? (
            <>
              <button
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  border border-[rgba(220,38,38,0.20)]
                  bg-[rgba(220,38,38,0.10)]
                  text-[#D1D1D1]
                  transition-all
                  hover:border-[rgba(220,38,38,0.30)]
                  hover:bg-[rgba(220,38,38,0.14)]
                "
              >
                <User size={16} />
              </button>

              {profileOpen && (
                <div
                  className="
                    absolute right-0 top-12
                    w-[280px]
                    overflow-hidden
                    rounded-2xl
                    border border-[#1A1A1C]
                    bg-[#111113]
                    shadow-2xl
                  "
                >
                  <div className="flex items-center justify-between border-b border-[#1A1A1C] px-4 py-3">
                    <span className="text-sm font-medium text-[#D1D1D1]">
                      Profile
                    </span>

                    <button
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="text-[#8A8A8A] hover:text-[#D1D1D1]"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="rounded-xl border border-[#1A1A1C] bg-[#0D0D0F] p-4">
                      <div
                        className="
                          mb-3 flex h-11 w-11 items-center justify-center
                          rounded-full
                          border border-[rgba(220,38,38,0.20)]
                          bg-[rgba(220,38,38,0.10)]
                          text-[#D1D1D1]
                        "
                      >
                        <User size={18} />
                      </div>

                      <h3 className="text-sm font-medium text-[#D1D1D1]">
                        Navaneeth
                      </h3>

                      <p className="mt-1 text-xs text-[#8A8A8A]">
                        navaneeth@example.com
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      className="
                        flex w-full items-center gap-2
                        rounded-xl
                        border border-[#1A1A1C]
                        bg-[#0D0D0F]
                        px-4 py-2.5
                        text-sm
                        text-[#D1D1D1]
                        transition-all
                        hover:border-[rgba(220,38,38,0.20)]
                        hover:bg-[rgba(220,38,38,0.06)]
                      "
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              className="
                rounded-xl
                border border-[rgba(220,38,38,0.20)]
                bg-[rgba(220,38,38,0.10)]
                px-4 py-2
                text-sm
                text-[#D1D1D1]
                hover:border-[rgba(220,38,38,0.30)]
                hover:bg-[rgba(220,38,38,0.14)]
              "
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative" ref={mobileRef}>
          <button
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-[rgba(220,38,38,0.20)]
              bg-[rgba(220,38,38,0.10)]
              text-[#D1D1D1]
              transition-all
              hover:border-[rgba(220,38,38,0.30)]
              hover:bg-[rgba(220,38,38,0.14)]
            "
          >
            <Menu size={16} />
          </button>

          {mobileMenuOpen && (
            <div
              className="
                absolute right-0 top-12
                w-[260px]
                overflow-hidden
                rounded-2xl
                border border-[#1A1A1C]
                bg-[#111113]
                shadow-2xl
              "
            >
              <div className="border-b border-[#1A1A1C] p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-full
                      border border-[rgba(220,38,38,0.20)]
                      bg-[rgba(220,38,38,0.10)]
                    "
                  >
                    <User
                      size={16}
                      className="text-[#D1D1D1]"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#D1D1D1]">
                      Navaneeth
                    </h3>

                    <p className="text-xs text-[#8A8A8A]">
                      navaneeth@example.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    className="
                      flex w-full items-center
                      rounded-xl
                      px-3 py-2.5
                      text-left text-sm
                      text-[#D1D1D1]
                      transition-all
                      hover:bg-[rgba(220,38,38,0.08)]
                      hover:text-white
                    "
                  >
                    {link}
                  </button>
                ))}
              </div>

              <div className="border-t border-[#1A1A1C] p-2">
                <button
                  className="
                    flex w-full items-center gap-2
                    rounded-xl
                    px-3 py-2.5
                    text-sm
                    text-[#D1D1D1]
                    transition-all
                    hover:bg-[rgba(220,38,38,0.08)]
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}