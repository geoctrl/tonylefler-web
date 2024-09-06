import React from "react";
import AppHeader from "~/components/app-header";
import { Button } from "~/common/button";
import { AiShadow } from "~/components/ai-shadow";

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <AppHeader />
      </div>

      <div className="mb-8 flex items-center justify-center">
        <div className="flex max-w-[50rem] flex-col items-center justify-center">
          <div className="mb-4 text-5xl font-bold">Set it and forget it</div>
          <p className="mb-8 text-center text-lg">
            Automatic mass storage backups the moment you plug in.
          </p>

          <div className="flex gap-4">
            <Button
              intent="ai"
              formSize="lg"
              className="dark:bg-[rgb(28,30,33)]"
            >
              Join the Waitlist
            </Button>
            <Button formSize="lg">Learn more</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="app/assets/app-screenshot.png"
          alt="App screenshot"
          style={{ width: 1000 }}
        />
      </div>
    </div>
  );
}
