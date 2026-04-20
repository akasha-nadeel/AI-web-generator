"use client";

import { useRef } from "react";
import { useWizardStore } from "@/stores/wizardStore";
import { Upload, X } from "lucide-react";

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
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Add inspiration <span className="text-white/40 font-normal">(optional)</span></h2>
      <p className="text-white/60 text-base mb-7 leading-relaxed max-w-lg">
        Upload screenshots of websites you like, your logo, or product photos.
        Our AI will match the style.
      </p>

      <div className="flex-1 space-y-6">
        {/* Upload area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-400/[0.8] hover:bg-white/[0.02] transition-colors"
        >
          <Upload className="w-8 h-8 text-white/40 mx-auto mb-4" />
          <p className="text-base text-white/80 mb-2 font-medium">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-white/40">
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
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {inspirationImages.map((img, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden aspect-square border border-white/10">
                <img
                  src={img}
                  alt={`Inspiration ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeInspirationImage(img)}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-between items-center pt-5 border-t border-white/5">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10 bg-transparent text-white hover:bg-white/5"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors bg-white text-black hover:bg-white/90"
        >
          {inspirationImages.length > 0 ? "Next" : "Skip"}
        </button>
      </div>
    </div>
  );
}
