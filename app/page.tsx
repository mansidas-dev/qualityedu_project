import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Brain, BookOpen, TrendingUp, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col selection:bg-blue-500/30">
      {/* Navbar */}
      <header className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Compass className="h-7 w-7 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">CareerCompass</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</Link>
          <Link href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/register" className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</Link>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center w-full max-w-5xl mx-auto flex-1 justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all hover:bg-blue-500/20">
            <Sparkles className="h-4 w-4" />
            <span>Contributing to UN SDG 4: Quality Education</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Your AI Career Counselor <br className="hidden md:block" />
            <span className="text-blue-500 drop-shadow-sm">— Free, Instant, Personalized</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed">
            Get career path suggestions, skill gap analysis, and learning resources tailored to YOU
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="text-base h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base h-14 px-8 border-slate-700 hover:bg-slate-800 text-slate-100 hover:text-white bg-slate-900/50 backdrop-blur-sm transition-all" asChild>
              <Link href="/chat">Try Demo</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 bg-slate-900/50 border-t border-slate-800/50 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How CareerCompass Works</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to navigate your career journey with confidence.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <Card className="bg-slate-950/80 border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-xl text-slate-50">Career Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    Discover personalized career trajectories based on your interests, strengths, and current market trends.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-950/80 border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle className="text-xl text-slate-50">Skill Gap Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    Identify the exact skills you need to reach your dream job, with a clear roadmap of what to learn next.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-950/80 border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle className="text-xl text-slate-50">Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    Get curated courses, articles, and tutorials matched exactly to the skills you need to develop.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-slate-800/80 bg-slate-950 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-blue-500" />
            <span className="font-bold text-slate-200">CareerCompass</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CareerCompass. Empowering students worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
