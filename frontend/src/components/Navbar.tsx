import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { authApi, useGetCurrentUserQuery } from "../redux/features/authApi";
import { useDispatch } from "react-redux";



export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let navigate = useNavigate();

 const isAuthenticated = !!localStorage.getItem("token");

  const profileRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    dispatch(authApi.util.resetApiState());
    navigate('/');
  }
  
  const {data} = useGetCurrentUserQuery();

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


  return (
    <nav className="sticky top-0 z-50 border-b border-[#1A1A1C] bg-[#0D0D0F]/95 backdrop-blur">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="cursor-pointer" onClick={()=>navigate('/')}>
        <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          
            <Link to ='/' className="text-sm text-[#D1D1D1] transition-colors hover:text-white">Home</Link>
            { isAuthenticated && <Link to='/dashboard' className="text-sm text-[#D1D1D1] transition-colors hover:text-white">Dashboard</Link>}
            { isAuthenticated && <Link to='/chat-roadmap' className="text-sm text-[#D1D1D1] transition-colors hover:text-white">Prompt Guide</Link>}
          
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
                        {data?.user.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#8A8A8A]">
                        {data?.user.email}
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
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to='/auth'
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
            </Link>
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
                      {data?.user.name}
                    </h3>

                    <p className="text-xs text-[#8A8A8A]">
                      {data?.user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                  <button
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
                    Home
                  </button>
                  <button
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
                    Dashboard
                  </button>
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
                  onClick={handleLogout}
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