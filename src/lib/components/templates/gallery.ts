import { ComponentDefinition } from "../types";

export const galleryGrid: ComponentDefinition = {
  id: "gallery-grid",
  category: "gallery",
  name: "Image Gallery Grid",
  description: "Responsive grid of images",
  source: "meraki",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    images: { type: "list", label: "Gallery Images", required: true },
  },
  defaultContent: {
    title: "Our Gallery",
    images: [
      { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", alt: "Image 1" },
      { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop", alt: "Image 2" },
      { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop", alt: "Image 3" },
      { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop", alt: "Image 4" },
      { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop", alt: "Image 5" },
      { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop", alt: "Image 6" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; text-align: center; margin-bottom: 64px; font-family: {{fontHeading}};">{{title}}</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      {{#images}}<div style="overflow: hidden; border-radius: 12px;">
        <img src="{{src}}" alt="{{alt}}" style="width: 100%; aspect-ratio: 3/2; object-fit: cover; transition: transform 0.3s;" />
      </div>{{/images}}
    </div>
  </div>
</section>`,
};

export const galleryComponents = [galleryGrid];
