import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, DollarSign, BookOpen, Lock } from "lucide-react";
import { TierBadge } from "./TierBadge";

interface CourseCardProps {
  title: string;
  university: string;
  country: string;
  city: string;
  tuition: string;
  duration: string;
  rating: number;
  field: string;
  scholarshipAvailable: boolean;
  isPremium?: boolean;
  userTier: 'guest' | 'free' | 'premium';
}

export const CourseCard = ({ 
  title, 
  university, 
  country, 
  city, 
  tuition, 
  duration, 
  rating, 
  field, 
  scholarshipAvailable,
  isPremium = false,
  userTier 
}: CourseCardProps) => {
  const canAccess = !isPremium || userTier === 'premium';

  return (
    <Card className={`relative overflow-hidden hover:shadow-glow transition-all duration-300 ${
      isPremium ? 'border-accent/30 bg-gradient-to-br from-card to-accent/5' : ''
    }`}>
      {isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <TierBadge tier="premium" />
        </div>
      )}
      
      {!canAccess && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center">
          <div className="text-center p-6">
            <Lock className="w-12 h-12 text-white mx-auto mb-3" />
            <p className="text-white font-semibold mb-2">Premium Feature</p>
            <Button variant="premium" size="sm">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2 text-xs">
              {field}
            </Badge>
            <h3 className="font-bold text-lg leading-tight">{title}</h3>
            <p className="text-muted-foreground font-medium">{university}</p>
          </div>
          {scholarshipAvailable && (
            <Badge variant="outline" className="bg-success/10 border-success text-success">
              Scholarship
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {city}, {country}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="w-4 h-4 mr-2" />
            {tuition}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            {duration}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-accent mr-1" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground text-sm ml-1">/5</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-1" />
              Details
            </Button>
            {canAccess && (
              <Button variant="default" size="sm">
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};