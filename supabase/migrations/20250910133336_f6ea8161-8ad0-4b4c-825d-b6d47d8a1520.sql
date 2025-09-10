-- Create enum types
CREATE TYPE public.user_tier AS ENUM ('guest', 'free', 'premium');
CREATE TYPE public.subscription_status AS ENUM ('inactive', 'active', 'trial', 'cancelled');
CREATE TYPE public.support_ticket_type AS ENUM ('bug_report', 'feature_request', 'billing', 'general', 'feedback');
CREATE TYPE public.support_ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.degree_level AS ENUM ('bachelor', 'master', 'phd', 'diploma', 'certificate', 'foundation');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  tier user_tier NOT NULL DEFAULT 'free',
  subscription_status subscription_status NOT NULL DEFAULT 'inactive',
  country TEXT,
  city TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  bio TEXT,
  github_username TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  is_public_profile BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  referral_code TEXT UNIQUE,
  referred_by_code TEXT,
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  discipline TEXT NOT NULL,
  degree_level degree_level NOT NULL,
  university TEXT NOT NULL,
  university_logo_url TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  tuition_amount INTEGER, -- in cents
  tuition_currency TEXT DEFAULT 'USD',
  duration_months INTEGER,
  intake_month INTEGER, -- 1-12
  qs_ranking INTEGER,
  language TEXT DEFAULT 'English',
  entry_requirements TEXT[],
  scholarship_available BOOLEAN DEFAULT false,
  direct_entry_available BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  description TEXT,
  application_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type support_ticket_type NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status support_ticket_status NOT NULL DEFAULT 'open',
  admin_response TEXT,
  email TEXT, -- for guest users
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT NOT NULL,
  invitee_email TEXT,
  reward_type TEXT, -- 'xp', 'premium_days'
  reward_value INTEGER,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create github_projects table (premium feature)
CREATE TABLE public.github_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  github_repo_url TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  demo_url TEXT,
  is_expo_project BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  star_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_analytics table for tracking engagement
CREATE TABLE public.user_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'course_viewed', 'bookmark_added', 'premium_upgraded', etc.
  event_data JSONB,
  user_tier user_tier,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Create security definer function for getting user tier
CREATE OR REPLACE FUNCTION public.get_user_tier(user_uuid UUID)
RETURNS user_tier
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT tier FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create function to check if user has premium access
CREATE OR REPLACE FUNCTION public.has_premium_access(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT tier = 'premium' FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public profiles" ON public.profiles
  FOR SELECT USING (is_public_profile = true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Courses policies - all users can view courses
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (true);

-- Premium courses need premium access
CREATE POLICY "Premium courses require premium access" ON public.courses
  FOR SELECT USING (
    NOT is_premium OR 
    public.has_premium_access(auth.uid()) OR 
    auth.uid() IS NULL
  );

-- Bookmarks policies
CREATE POLICY "Users can manage their own bookmarks" ON public.bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Support tickets policies
CREATE POLICY "Users can view their own tickets" ON public.support_tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create support tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own tickets" ON public.support_tickets
  FOR UPDATE USING (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view their referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = invitee_id);

CREATE POLICY "Users can create referrals" ON public.referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- GitHub projects policies (premium feature)
CREATE POLICY "Users can manage their own projects" ON public.github_projects
  FOR ALL USING (auth.uid() = user_id AND public.has_premium_access(auth.uid()));

CREATE POLICY "Anyone can view featured projects" ON public.github_projects
  FOR SELECT USING (is_featured = true);

-- Analytics policies
CREATE POLICY "System can insert analytics" ON public.user_analytics
  FOR INSERT WITH CHECK (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referral_code_val TEXT;
BEGIN
  -- Generate unique referral code
  referral_code_val := UPPER(SUBSTRING(MD5(NEW.id::text || NEW.email) FROM 1 FOR 8));
  
  INSERT INTO public.profiles (
    user_id,
    full_name,
    tier,
    referral_code,
    referred_by_code,
    created_at
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    'free',
    referral_code_val,
    NEW.raw_user_meta_data ->> 'referral_code',
    now()
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_github_projects_updated_at
  BEFORE UPDATE ON public.github_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample courses data
INSERT INTO public.courses (title, discipline, degree_level, university, country, city, tuition_amount, tuition_currency, duration_months, intake_month, qs_ranking, scholarship_available, direct_entry_available, is_premium, rating, description) VALUES
('Master of Computer Science & AI', 'Computer Science', 'master', 'Technical University of Munich', 'Germany', 'Munich', 50000, 'EUR', 24, 9, 50, true, true, false, 4.8, 'Cutting-edge program combining computer science fundamentals with artificial intelligence and machine learning.'),
('MBA in Digital Innovation', 'Business', 'master', 'Singapore Management University', 'Singapore', 'Singapore', 6500000, 'USD', 18, 8, 12, true, false, true, 4.9, 'Transform your career with our innovative MBA program focused on digital transformation and entrepreneurship.'),
('Bachelor of Biomedical Engineering', 'Engineering', 'bachelor', 'University of Toronto', 'Canada', 'Toronto', 5816000, 'CAD', 48, 9, 25, false, true, false, 4.7, 'Interdisciplinary program combining engineering principles with biological sciences to advance healthcare technology.'),
('PhD in Quantum Computing', 'Physics', 'phd', 'ETH Zurich', 'Switzerland', 'Zurich', 129800, 'CHF', 48, 9, 8, true, false, true, 4.9, 'Research-intensive doctoral program at the forefront of quantum computing and quantum information science.'),
('Master of Data Science', 'Computer Science', 'master', 'University of Melbourne', 'Australia', 'Melbourne', 4500000, 'AUD', 24, 2, 37, true, true, true, 4.6, 'Comprehensive program covering machine learning, big data analytics, and statistical modeling.'),
('Bachelor of Medicine', 'Medicine', 'bachelor', 'University of Oxford', 'United Kingdom', 'Oxford', 4650000, 'GBP', 72, 10, 2, false, false, true, 4.9, 'World-renowned medical program with exceptional clinical training and research opportunities.'),
('Master of Architecture', 'Architecture', 'master', 'MIT', 'United States', 'Cambridge', 5386000, 'USD', 24, 9, 1, true, true, true, 4.8, 'Innovative architecture program combining design excellence with cutting-edge technology and sustainability.'),
('Bachelor of International Law', 'Law', 'bachelor', 'Sciences Po', 'France', 'Paris', 1300000, 'EUR', 36, 9, 242, true, true, false, 4.5, 'Prestigious law program with focus on international relations and global governance.');