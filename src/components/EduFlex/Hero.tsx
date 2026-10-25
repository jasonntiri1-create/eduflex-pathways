import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap, Compass, Bookmark, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold shadow-glow">
            <Compass className="w-4 h-4 mr-2" />
            Education discovery, simplified
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find the right
            <span className="bg-gradient-premium bg-clip-text text-transparent"> academic path </span>
            for your future.
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            EduFlex helps students explore programs, save opportunities, and navigate education decisions with a more confident, structured experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 shadow-glow">
              <GraduationCap className="w-5 h-5 mr-2" />
              Explore pathways
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
              <Sparkles className="w-5 h-5 mr-2" />
              View features
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">Guided</div>
              <div className="text-white/70 text-sm">Discovery</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">Saved</div>
              <div className="text-white/70 text-sm">Opportunities</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">Student</div>
              <div className="text-white/70 text-sm">First</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="text-3xl font-bold text-white mb-2">Built</div>
              <div className="text-white/70 text-sm">for clarity</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
