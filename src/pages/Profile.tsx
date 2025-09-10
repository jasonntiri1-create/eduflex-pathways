import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/EduFlex/Navigation';
import { TierBadge } from '@/components/EduFlex/TierBadge';
import { useAuth } from '@/hooks/useAuth';
import { useMobileVibration } from '@/hooks/useMobileVibration';
import { AuthGuard } from '@/components/EduFlex/AuthGuard';
import { 
  User, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe, 
  Trophy, 
  Zap, 
  Copy,
  Crown,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { profile, updateProfile } = useAuth();
  const { saveBookmark } = useMobileVibration();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    country: profile?.country || '',
    city: profile?.city || '',
    github_username: profile?.github_username || '',
    linkedin_url: profile?.linkedin_url || '',
    website_url: profile?.website_url || '',
    is_public_profile: profile?.is_public_profile || false
  });

  const handleSave = async () => {
    const { error } = await updateProfile(formData);
    if (!error) {
      setIsEditing(false);
      saveBookmark();
    }
  };

  const copyReferralLink = () => {
    if (profile?.referral_code) {
      const referralUrl = `${window.location.origin}/auth?ref=${profile.referral_code}`;
      navigator.clipboard.writeText(referralUrl);
      toast.success('Referral link copied to clipboard!');
      saveBookmark();
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading profile...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{profile.full_name || 'Anonymous User'}</h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <TierBadge tier={profile.tier} />
                        {profile.is_public_profile && (
                          <Badge variant="outline">Public Profile</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={isEditing ? 'default' : 'outline'}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold">{profile.total_xp}</div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{profile.current_streak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Crown className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold capitalize">{profile.tier}</div>
                    <div className="text-sm text-muted-foreground">Account Tier</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <User className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {profile.is_public_profile ? 'Public' : 'Private'}
                    </div>
                    <div className="text-sm text-muted-foreground">Profile</div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="e.g. United States"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      disabled={!isEditing}
                      placeholder="e.g. New York"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github_username">GitHub Username</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="github_username"
                        value={formData.github_username}
                        onChange={(e) => setFormData({...formData, github_username: e.target.value})}
                        disabled={!isEditing || profile.tier !== 'premium'}
                        className="pl-10"
                        placeholder="e.g. johndoe"
                      />
                    </div>
                    {profile.tier !== 'premium' && (
                      <p className="text-xs text-muted-foreground">
                        Premium feature - upgrade to add GitHub integration
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="website_url"
                        value={formData.website_url}
                        onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="https://your-website.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                {/* Public Profile Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label htmlFor="public_profile" className="text-base font-medium">
                      Public Profile
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to discover and connect with you
                    </p>
                  </div>
                  <Switch
                    id="public_profile"
                    checked={formData.is_public_profile}
                    onCheckedChange={(checked) => setFormData({...formData, is_public_profile: checked})}
                    disabled={!isEditing || profile.tier !== 'premium'}
                  />
                </div>

                {profile.tier !== 'premium' && formData.is_public_profile && (
                  <p className="text-xs text-muted-foreground">
                    Premium feature - upgrade to enable public profiles
                  </p>
                )}

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSave} className="flex-1">
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Referral Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Share & Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg">
                  <div>
                    <h3 className="font-semibold mb-1">Your Referral Code</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Invite friends and earn XP when they join EduFlex
                    </p>
                    <code className="bg-muted px-3 py-1 rounded text-sm font-mono">
                      {profile.referral_code}
                    </code>
                  </div>
                  <Button variant="outline" onClick={copyReferralLink}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Profile;