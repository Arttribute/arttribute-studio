"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import ModelMenubar from "@/components/tunedmodels/model-menubar";
import AdvancedOptions from "@/components/tunedmodels/advanced-options";
import CreationDisplay from "@/components/tunedmodels/creation-display";
import PromptHistory from "@/components/tunedmodels/prompt-history";

export default function TunedModelPage({
  params,
}: {
  params: { slug: string };
}) {
  useEffect(() => {
    //print the slug
    console.log(params.slug);
  }, []);

  return (
    <>
      <div className="md:block">
        <ModelMenubar />
        <div className="mt-14">
          <div className="bg-background">
            <div className="lg:grid lg:grid-cols-12">
              <div className="col-span-2">
                <AdvancedOptions />
              </div>
              <div className="col-span-7">
                <CreationDisplay />
                <div className="m-4">
                  <div className="grid w-full gap-2">
                    <Textarea placeholder="Type your prompt here." />
                    <Button>Generate</Button>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <PromptHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
