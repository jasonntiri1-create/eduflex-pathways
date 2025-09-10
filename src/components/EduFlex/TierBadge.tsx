import { Badge } from "@/components/ui/badge";
import { Crown, User, UserCheck } from "lucide-react";

interface TierBadgeProps {
  tier: 'guest' | 'free' | 'premium';
  size?: 'sm' | 'md' | 'lg';
}

export const TierBadge = ({ tier, size = 'md' }: TierBadgeProps) => {
  const configs = {
    guest: {
      label: 'Guest',
      icon: User,
      variant: 'outline' as const,
      className: 'border-muted-foreground/30 text-muted-foreground'
    },
    free: {
      label: 'Free',
      icon: UserCheck,
      variant: 'secondary' as const,
      className: 'bg-secondary text-secondary-foreground'
    },
    premium: {
      label: 'Premium',
      icon: Crown,
      variant: 'default' as const,
      className: 'bg-gradient-premium text-accent-foreground shadow-premium border-0'
    }
  };

  const config = configs[tier];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${sizeClasses[size]} font-semibold flex items-center gap-1`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};