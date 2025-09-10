import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "./CourseCard";
import { TierBadge } from "./TierBadge";
import { useMobileVibration } from "@/hooks/useMobileVibration";
import { Search, Filter, MapPin, DollarSign, Clock, Star, Lock, Sparkles } from "lucide-react";

interface CourseDiscoveryProps {
  userTier: 'guest' | 'free' | 'premium';
}

export const CourseDiscovery = ({ userTier }: CourseDiscoveryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { saveBookmark, unlockPremium } = useMobileVibration();
  
  // Mock course data with premium/free tiers
  const courses = [
    {
      id: 1,
      title: "Master's in Computer Science & AI",
      university: "Technical University of Munich",
      country: "Germany",
      city: "Munich",
      tuition: "€500/semester",
      duration: "2 years",
      rating: 4.8,
      field: "Computer Science",
      scholarshipAvailable: true,
      isPremium: false
    },
    {
      id: 2,
      title: "MBA in Digital Innovation", 
      university: "Singapore Management University",
      country: "Singapore",
      city: "Singapore",
      tuition: "$65,000/year",
      duration: "18 months",
      rating: 4.9,
      field: "Business",
      scholarshipAvailable: true,
      isPremium: true
    },
    {
      id: 3,
      title: "Bachelor's in Biomedical Engineering",
      university: "University of Toronto",
      country: "Canada", 
      city: "Toronto",
      tuition: "CAD $58,160/year",
      duration: "4 years",
      rating: 4.7,
      field: "Engineering",
      scholarshipAvailable: false,
      isPremium: false
    },
    {
      id: 4,
      title: "PhD in Quantum Computing",
      university: "ETH Zurich",
      country: "Switzerland",
      city: "Zurich", 
      tuition: "CHF 1,298/year",
      duration: "4-5 years",
      rating: 4.9,
      field: "Physics",
      scholarshipAvailable: true,
      isPremium: true
    }
  ];

  const handleUpgrade = () => {
    unlockPremium();
    // Trigger upgrade flow
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Your Perfect 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Program</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Search from over 1000+ programs across 200+ fields of study. 
            Find the perfect match for your career goals.
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Course Discovery Engine
              </CardTitle>
              <TierBadge tier={userTier} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by program, field, or university..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                {userTier !== 'premium' && (
                  <Button 
                    variant="premium" 
                    onClick={handleUpgrade}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Search
                    <Lock className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                <MapPin className="w-3 h-3 mr-1" />
                Europe
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                <DollarSign className="w-3 h-3 mr-1" />
                Under $30k
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                <Clock className="w-3 h-3 mr-1" />
                1-2 years
              </Badge>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                <Star className="w-3 h-3 mr-1" />
                Scholarships
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Premium Upgrade Banner */}
        {userTier !== 'premium' && (
          <Card className="mb-8 bg-gradient-premium border-0 text-accent-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Unlock Premium Features
                  </h3>
                  <p className="opacity-90">
                    Get personalized university matching, AI-powered search, and early scholarship alerts
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleUpgrade}
                  className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              university={course.university}
              country={course.country}
              city={course.city}
              tuition={course.tuition}
              duration={course.duration}
              rating={course.rating}
              field={course.field}
              scholarshipAvailable={course.scholarshipAvailable}
              isPremium={course.isPremium}
              userTier={userTier}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Programs
          </Button>
        </div>
      </div>
    </section>
  );
};