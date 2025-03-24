
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Button from '@/components/ui-components/Button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col page-enter">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-6 flex flex-col items-center justify-center text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-slide-up">
            Expert Electronics Repair Service
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Professional Electronics Repair Made Simple
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            Fast, reliable repairs for all your devices. Our expert technicians are ready to fix your electronics with precision and care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4 md:px-6 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Service?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional repair services with reliability and transparency at every step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Technicians",
                description: "Our certified professionals have years of experience repairing all types of electronics."
              },
              {
                title: "Quick Turnaround",
                description: "Most repairs are completed within 48 hours, getting your devices back to you fast."
              },
              {
                title: "Quality Guarantee",
                description: "All repairs come with a 90-day warranty for your peace of mind."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass p-8 rounded-xl flex flex-col items-center text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to fix your electronics?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join our platform today and experience the easiest way to get your devices repaired.
              </p>
              <Link to="/register">
                <Button size="lg">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 bg-secondary/30 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold">Repair<span className="text-primary">Buddy</span></span>
              <p className="text-sm text-muted-foreground mt-2">© 2023 RepairBuddy. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
                Terms
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
                Privacy
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
