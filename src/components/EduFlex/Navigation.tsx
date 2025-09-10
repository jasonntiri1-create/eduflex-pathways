import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { TierBadge } from "./TierBadge";
import { useAuth } from "@/hooks/useAuth";
import { useMobileVibration } from "@/hooks/useMobileVibration";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Menu, X, User, LogOut, Settings, Crown, Bookmark, Users, HelpCircle } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { unlockPremium } = useMobileVibration();
  
  const userTier = profile?.tier || 'guest';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EduFlex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#discover" className="text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </a>
            <a href="#programs" className="text-muted-foreground hover:text-foreground transition-colors">
              Programs
            </a>
            <a href="#scholarships" className="text-muted-foreground hover:text-foreground transition-colors">
              Scholarships
            </a>
            {isLoggedIn && (
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <TierBadge tier={userTier} size="sm" />
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col gap-4">
              <a href="#discover" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Search className="w-4 h-4" />
                Discover
              </a>
              <a href="#programs" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="w-4 h-4" />
                Programs
              </a>
              <a href="#scholarships" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Award className="w-4 h-4" />
                Scholarships
              </a>
              {isLoggedIn && (
                <a href="#projects" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Users className="w-4 h-4" />
                  Projects
                </a>
              )}
              
              <div className="border-t border-border pt-4 mt-2">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <TierBadge tier={userTier} size="sm" />
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button variant="default" className="justify-start">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};