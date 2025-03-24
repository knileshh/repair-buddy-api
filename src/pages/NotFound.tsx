
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@/components/ui-components/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 page-enter">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6 animate-slide-down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3 animate-slide-up">404</h1>
        <p className="text-xl text-muted-foreground mb-6 animate-slide-up">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
