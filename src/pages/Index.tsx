import { useState } from 'react';
import { Navigation } from "@/components/EduFlex/Navigation";
import { Hero } from "@/components/EduFlex/Hero";
import { CourseDiscovery } from "@/components/EduFlex/CourseDiscovery";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Shield, Compass, ArrowRight } from "lucide-react";

const Index = () => {
  const [userTier] = useState<'guest' | 'free' | 'premium'>('free');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <Hero />

        <CourseDiscovery userTier={userTier} />

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Built for <span className="text-primary">student decision-making</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                A cleaner, more structured way to explore education opportunities and track what matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">Pathway Discovery</h3>
                <p className="text-muted-foreground">
                  Explore relevant learning opportunities in a simple, guided experience.
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">Saved Interests</h3>
                <p className="text-muted-foreground">
                  Keep track of programs and opportunities you want to revisit over time.
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-glow transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-4">Clear User Experience</h3>
                <p className="text-muted-foreground">
                  Designed to feel intentional, modern, and easy to understand for students.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A better way to explore education
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Designed to make academic exploration more structured, informative, and confidence-building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Explore the experience
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">EduFlex Pathways</span>
          </div>
          <p className="text-muted-foreground">
            Designed to support clearer student decision-making and better education discovery.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
