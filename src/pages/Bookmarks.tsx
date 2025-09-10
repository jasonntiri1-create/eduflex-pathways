import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/components/EduFlex/Navigation';
import { CourseCard } from '@/components/EduFlex/CourseCard';
import { AuthGuard } from '@/components/EduFlex/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Search, Bookmark, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface BookmarkedCourse {
  id: string;
  course_id: string;
  created_at: string;
  courses: {
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
  };
}

const Bookmarks = () => {
  const { profile } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          id,
          course_id,
          created_at,
          courses (
            id,
            title,
            university,
            country,
            city,
            tuition_amount,
            tuition_currency,
            duration_months,
            rating,
            discipline,
            scholarship_available,
            is_premium
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookmarks:', error);
        toast.error('Failed to load bookmarks');
        return;
      }

      setBookmarks(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (error) {
        toast.error('Failed to remove bookmark');
        return;
      }

      setBookmarks(bookmarks.filter(b => b.id !== bookmarkId));
      toast.success('Bookmark removed');
    } catch (error) {
      toast.error('Failed to remove bookmark');
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.courses.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.courses.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.courses.discipline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                My <span className="bg-gradient-primary bg-clip-text text-transparent">Bookmarks</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your saved courses and programs
              </p>
            </div>

            {/* Search */}
            <Card className="mb-6 shadow-card">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search your bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bookmarks Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your bookmarks...</p>
              </div>
            ) : filteredBookmarks.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="text-center py-12">
                  <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchQuery ? 'No matching bookmarks' : 'No bookmarks yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery 
                      ? 'Try adjusting your search terms'
                      : 'Start exploring courses and save your favorites here'
                    }
                  </p>
                  <Button asChild>
                    <a href="/">Browse Courses</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="relative">
                    <CourseCard
                      title={bookmark.courses.title}
                      university={bookmark.courses.university}
                      country={bookmark.courses.country}
                      city={bookmark.courses.city}
                      tuition={formatCurrency(bookmark.courses.tuition_amount, bookmark.courses.tuition_currency)}
                      duration={`${bookmark.courses.duration_months} months`}
                      rating={Number(bookmark.courses.rating)}
                      field={bookmark.courses.discipline}
                      scholarshipAvailable={bookmark.courses.scholarship_available}
                      isPremium={bookmark.courses.is_premium}
                      userTier={profile?.tier || 'guest'}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-3 right-3 z-10"
                      onClick={() => removeBookmark(bookmark.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            {bookmarks.length > 0 && (
              <Card className="mt-8 shadow-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{bookmarks.length}</div>
                      <div className="text-sm text-muted-foreground">Total Bookmarks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">
                        {new Set(bookmarks.map(b => b.courses.discipline)).size}
                      </div>
                      <div className="text-sm text-muted-foreground">Disciplines</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">
                        {new Set(bookmarks.map(b => b.courses.country)).size}
                      </div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">
                        {bookmarks.filter(b => b.courses.scholarship_available).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Scholarships</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Bookmarks;