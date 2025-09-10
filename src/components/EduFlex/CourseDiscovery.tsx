import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "./CourseCard";
import { TierBadge } from "./TierBadge";
import { useMobileVibration } from "@/hooks/useMobileVibration";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, MapPin, DollarSign, Clock, Star, Lock, Sparkles } from "lucide-react";
import { toast } from 'sonner';

interface CourseDiscoveryProps {
  userTier: 'guest' | 'free' | 'premium';
}

interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
  city: string;
  tuition_amount: number;
  tuition_currency: string;
  duration_months: number;
  rating: number;
  discipline: string;
  scholarship_available: boolean;
  is_premium: boolean;
}

export const CourseDiscovery = ({ userTier }: CourseDiscoveryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { saveBookmark, unlockPremium } = useMobileVibration();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
        return;
      }

      setCourses(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (courseId: string) => {
    if (userTier === 'guest') {
      toast.error('Please sign up to bookmark courses');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to bookmark courses');
        return;
      }

      const { error } = await supabase
        .from('bookmarks')
        .insert({ 
          course_id: courseId,
          user_id: user.id 
        });

      if (error) {
        if (error.code === '23505') {
          toast.info('Course already bookmarked');
        } else {
          toast.error('Failed to bookmark course');
        }
        return;
      }

      saveBookmark();
      toast.success('Course bookmarked!');
    } catch (error) {
      toast.error('Failed to bookmark course');
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const handleUpgrade = () => {
    unlockPremium();
    // Trigger upgrade flow
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard
                  title={course.title}
                  university={course.university}
                  country={course.country}
                  city={course.city}
                  tuition={formatCurrency(course.tuition_amount, course.tuition_currency)}
                  duration={`${course.duration_months} months`}
                  rating={Number(course.rating)}
                  field={course.discipline}
                  scholarshipAvailable={course.scholarship_available}
                  isPremium={course.is_premium}
                  userTier={userTier}
                />
                {userTier !== 'guest' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-3 left-3 z-10"
                    onClick={() => handleBookmark(course.id)}
                  >
                    Bookmark
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

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