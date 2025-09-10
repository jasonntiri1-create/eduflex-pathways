import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/EduFlex/Navigation';
import { AuthGuard } from '@/components/EduFlex/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { useMobileVibration } from '@/hooks/useMobileVibration';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Copy, 
  Share, 
  Gift, 
  Trophy, 
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Referral {
  id: string;
  invitee_email: string;
  reward_type: string;
  reward_value: number;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
}

const Referrals = () => {
  const { profile } = useAuth();
  const { saveBookmark } = useMobileVibration();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching referrals:', error);
        return;
      }

      setReferrals(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

  const shareReferralLink = async () => {
    if (profile?.referral_code) {
      const referralUrl = `${window.location.origin}/auth?ref=${profile.referral_code}`;
      const shareText = `Join me on EduFlex - the global learning platform! Use my referral code: ${profile.referral_code}`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Join EduFlex',
            text: shareText,
            url: referralUrl,
          });
        } catch (error) {
          // User cancelled sharing or sharing failed
          copyReferralLink();
        }
      } else {
        copyReferralLink();
      }
    }
  };

  const sendInvite = async () => {
    if (!inviteEmail || !profile?.referral_code) return;

    setSending(true);
    try {
      // In a real app, you'd send an email invitation here
      // For now, we'll just create a referral record
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: profile.user_id,
          referral_code: profile.referral_code,
          invitee_email: inviteEmail,
          reward_type: 'xp',
          reward_value: 100,
          is_completed: false
        });

      if (error) {
        toast.error('Failed to send invitation');
        return;
      }

      toast.success(`Invitation sent to ${inviteEmail}!`);
      setInviteEmail('');
      fetchReferrals();
    } catch (error) {
      toast.error('Failed to send invitation');
    } finally {
      setSending(false);
    }
  };

  const completedReferrals = referrals.filter(r => r.is_completed);
  const pendingReferrals = referrals.filter(r => !r.is_completed);
  const totalRewards = completedReferrals.reduce((sum, r) => sum + r.reward_value, 0);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Invite & <span className="bg-gradient-primary bg-clip-text text-transparent">Earn</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Share EduFlex with friends and earn rewards together
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{referrals.length}</div>
                  <div className="text-sm text-muted-foreground">Total Invites</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{completedReferrals.length}</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{pendingReferrals.length}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalRewards}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Your Referral Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg">
                  <div>
                    <h3 className="font-semibold mb-1">Share your unique code</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Friends get a welcome bonus, you earn 100 XP per successful referral
                    </p>
                    <code className="bg-muted px-3 py-2 rounded text-lg font-mono font-bold">
                      {profile?.referral_code}
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={copyReferralLink}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button variant="default" onClick={shareReferralLink}>
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Direct Invite */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Send Direct Invitation</h4>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendInvite}
                      disabled={!inviteEmail || sending}
                    >
                      {sending ? 'Sending...' : 'Send Invite'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Referral History</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-muted-foreground">Loading referrals...</p>
                  </div>
                ) : referrals.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No referrals yet</h3>
                    <p className="text-muted-foreground">
                      Start inviting friends to begin earning rewards!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {referrals.map((referral) => (
                      <div
                        key={referral.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            referral.is_completed ? 'bg-success' : 'bg-accent'
                          }`} />
                          <div>
                            <p className="font-medium">{referral.invitee_email}</p>
                            <p className="text-sm text-muted-foreground">
                              Invited {new Date(referral.created_at).toLocaleDateString()}
                              {referral.completed_at && (
                                <> • Joined {new Date(referral.completed_at).toLocaleDateString()}</>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={referral.is_completed ? "default" : "secondary"}>
                            {referral.is_completed ? 'Completed' : 'Pending'}
                          </Badge>
                          {referral.is_completed && (
                            <Badge variant="outline" className="text-success">
                              +{referral.reward_value} XP
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>How Referrals Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Share className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Share Your Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Send your unique referral code to friends via link or email
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Friend Joins</h3>
                    <p className="text-sm text-muted-foreground">
                      They sign up using your code and get a welcome bonus
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-semibold mb-2">3. You Both Win</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 100 XP per successful referral and help friends succeed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Referrals;