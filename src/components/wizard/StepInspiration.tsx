"use client";

import { useRef } from "react";
import { useWizardStore } from "@/stores/wizardStore";
import { GradientButton } from "@/components/shared/GradientButton";
import { ArrowRight, ArrowLeft, Upload, X, Image } from "lucide-react";

export function StepInspiration() {
  const { inspirationImages, addInspirationImage, removeInspirationImage, setStep } =
    useWizardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addInspirationImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Add inspiration (optional)</h2>
      <p className="text-muted-foreground mb-8">
        Upload screenshots of websites you like, your logo, or product photos.
        Our AI will match the style.
      </p>

      {/* Upload area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-white/15 rounded-2xl p-6 md:p-10 text-center cursor-pointer hover:border-purple-500/40 hover:bg-white/3 transition-all mb-6"
      >
        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground/60">
          PNG, JPG, WEBP up to 5MB each
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Uploaded images */}
      {inspirationImages.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
          {inspirationImages.map((img, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square">
              <img
                src={img}
                alt={`Inspiration ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeInspirationImage(img)}
                className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <GradientButton variant="secondary" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </GradientButton>
        <GradientButton onClick={() => setStep(3)}>
          {inspirationImages.length > 0 ? "Next" : "Skip"}
          <ArrowRight className="w-4 h-4" />
        </GradientButton>
      </div>
    </div>
  );
}
