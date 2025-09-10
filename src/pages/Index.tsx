import { useState } from 'react';
import { Navigation } from "@/components/EduFlex/Navigation";
import { Hero } from "@/components/EduFlex/Hero";
import { CourseDiscovery } from "@/components/EduFlex/CourseDiscovery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database, Shield, CreditCard, Info } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  // Mock user state - will be replaced with Supabase auth
  const [userTier] = useState<'guest' | 'free' | 'premium'>('free');
  const [isLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userTier={userTier} isLoggedIn={isLoggedIn} />
      
      {/* Supabase Integration Notice */}
      <Alert className="mx-4 mt-20 mb-4 border-primary/20 bg-primary/5">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready to activate EduFlex?</strong> Connect to Supabase to enable authentication, 
          tier-based access, course bookmarking, and premium features. Click the green Supabase button above to get started.
        </AlertDescription>
      </Alert>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <Hero />
        </section>

        {/* Course Discovery */}
        <CourseDiscovery userTier={userTier} />

        {/* Features Overview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Powered by <span className="text-primary">Advanced Technology</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                EduFlex integrates cutting-edge features for a personalized learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">Smart Database</h3>
                <p className="text-muted-foreground">
                  AI-powered matching system connects you with perfect programs based on your goals and background
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">Tier-Based Access</h3>
                <p className="text-muted-foreground">
                  Secure user hierarchy with guest, free, and premium tiers for personalized experiences
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-4">Premium Features</h3>
                <p className="text-muted-foreground">
                  Advanced AI search, project showcase, early alerts, and personalized university matching
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Educational Journey Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of learners discovering their perfect programs and building successful careers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Create Free Account
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                Explore Programs
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">EduFlex</span>
          </div>
          <p className="text-muted-foreground">
            Empowering global learners to discover their perfect educational path
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
