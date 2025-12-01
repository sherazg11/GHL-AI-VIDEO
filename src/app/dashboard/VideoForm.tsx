"use client";

import { Upload, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VideoForm() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!image || !prompt) return;

    setLoading(true);
    setError(null);
    setGeneratedVideo(null);

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate video');
      }

      setGeneratedVideo(data.videoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPrompt("");
    setGeneratedVideo(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-6 sm:p-8 lg:p-10">
          {generatedVideo ? (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Video Generated Successfully!</h3>
                <p className="text-muted-foreground">Your UGC video is ready to download</p>
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={generatedVideo}
                  controls
                  className="w-full h-full"
                  poster={image || undefined}
                />
              </div>

              <div className="flex gap-4">
                <Button asChild className="flex-1">
                  <a href={generatedVideo} download target="_blank" rel="noopener noreferrer">
                    Download Video
                  </a>
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Create Another Video
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive">{error}</p>
                </div>
              )}

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Product Image</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  {image ? (
                    <div className="space-y-4">
                      <img src={image} alt="Uploaded" className="max-h-48 mx-auto rounded-lg" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setImage(null)}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <div className="space-y-2">
                        <label className="cursor-pointer">
                          <span className="text-primary hover:underline font-medium">
                            Click to upload
                          </span>
                          <span className="text-muted-foreground"> or drag and drop</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Video Description</label>
                <textarea
                  placeholder="Describe your product, target audience, and desired vibe (e.g., 'young mom, fun energy, iPhone 15')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 px-4 py-3 bg-background border border-input rounded-lg resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="text-sm text-muted-foreground">
                  Be specific about the audience, tone, and key features you want to highlight.
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateVideo}
                disabled={!image || !prompt || loading}
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate 30-Second UGC Video
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}