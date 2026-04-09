import { ComponentDefinition } from "../types";

export const aboutStory: ComponentDefinition = {
  id: "about-story",
  category: "about",
  name: "About Story",
  description: "Company story section with image and text",
  source: "meraki",
  slots: {
    title: { type: "text", label: "Title", required: true },
    story: { type: "longtext", label: "Story Text", required: true },
    image: { type: "image", label: "Image", required: true },
    stats: { type: "list", label: "Stats", required: false },
  },
  defaultContent: {
    title: "Our Story",
    story: "Founded with a passion for excellence, we have been serving our community for over a decade. Our mission is to deliver outstanding results that exceed expectations and build lasting relationships with every client.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    stats: [
      { number: "10+", label: "Years Experience" },
      { number: "500+", label: "Happy Clients" },
      { number: "50+", label: "Team Members" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
    <div>
      <img src="{{image}}" alt="About us" style="width: 100%; border-radius: 16px; object-fit: cover; aspect-ratio: 4/3;" />
    </div>
    <div>
      <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; margin-bottom: 24px; font-family: {{fontHeading}};">{{title}}</h2>
      <p style="font-size: 17px; color: {{text}}; opacity: 0.65; line-height: 1.8; margin-bottom: 40px; font-family: {{fontBody}};">{{story}}</p>
      <div style="display: flex; gap: 40px;">
        {{#stats}}<div>
          <div style="font-size: 32px; font-weight: 700; color: {{primary}}; font-family: {{fontHeading}};">{{number}}</div>
          <div style="font-size: 14px; color: {{text}}; opacity: 0.5; font-family: {{fontBody}};">{{label}}</div>
        </div>{{/stats}}
      </div>
    </div>
  </div>
</section>`,
};

export const aboutMission: ComponentDefinition = {
  id: "about-mission",
  category: "about",
  name: "Mission Section",
  description: "Mission and values section with centered text",
  source: "custom",
  slots: {
    title: { type: "text", label: "Title", required: true },
    mission: { type: "longtext", label: "Mission Statement", required: true },
    values: { type: "list", label: "Values", required: false },
  },
  defaultContent: {
    title: "Our Mission",
    mission: "We believe in creating solutions that make a real difference. Our commitment to quality, innovation, and customer satisfaction drives everything we do.",
    values: [
      { title: "Innovation", description: "Pushing boundaries to find better solutions." },
      { title: "Integrity", description: "Honest and transparent in everything we do." },
      { title: "Impact", description: "Creating meaningful change for our clients." },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 900px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; margin-bottom: 24px; font-family: {{fontHeading}};">{{title}}</h2>
    <p style="font-size: 20px; color: {{text}}; opacity: 0.65; line-height: 1.7; margin-bottom: 64px; font-family: {{fontBody}};">{{mission}}</p>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: left;">
      {{#values}}<div style="border-left: 3px solid {{primary}}; padding-left: 24px;">
        <h3 style="font-size: 20px; font-weight: 600; color: {{text}}; margin-bottom: 8px; font-family: {{fontHeading}};">{{title}}</h3>
        <p style="font-size: 15px; color: {{text}}; opacity: 0.6; line-height: 1.6; font-family: {{fontBody}};">{{description}}</p>
      </div>{{/values}}
    </div>
  </div>
</section>`,
};

export const aboutComponents = [aboutStory, aboutMission];
