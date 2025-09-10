import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap, Globe2, Star, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold shadow-glow">
            <Globe2 className="w-4 h-4 mr-2" />
            Trusted by learners in 40+ countries
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Your
            <span className="bg-gradient-premium bg-clip-text text-transparent"> Dream </span>
            Education
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Connect with universities worldwide, showcase your projects, and unlock personalized learning paths with AI-powered matching.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 shadow-glow">
              <GraduationCap className="w-5 h-5 mr-2" />
              Start Learning Today
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
              <Star className="w-5 h-5 mr-2" />
              View Premium Features
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/70 text-sm">Universities</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70 text-sm">Active Learners</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">200+</div>
              <div className="text-white/70 text-sm">Study Fields</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-white/70 text-sm">Success Rate</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};