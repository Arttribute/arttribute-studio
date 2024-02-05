"use client";
import { useState, useEffect } from "react";

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
            <div className="lg:grid lg:grid-cols-5">
              <div className="col-span-1">
                <AdvancedOptions />
              </div>
              <div className="col-span-3">
                <CreationDisplay />
              </div>
              <div className="col-span-1">
                <PromptHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
