import { ComponentDefinition } from "../types";

export const teamGrid: ComponentDefinition = {
  id: "team-grid",
  category: "team",
  name: "Team Grid",
  description: "Grid of team member cards",
  source: "meraki",
  slots: {
    title: { type: "text", label: "Section Title", required: true },
    members: { type: "list", label: "Team Members", required: true },
  },
  defaultContent: {
    title: "Meet Our Team",
    members: [
      { name: "Alex Rivera", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", initials: "AR" },
      { name: "Jessica Wang", role: "Lead Designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", initials: "JW" },
      { name: "David Kim", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face", initials: "DK" },
      { name: "Maria Santos", role: "Marketing Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face", initials: "MS" },
    ],
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; text-align: center; margin-bottom: 64px; font-family: {{fontHeading}};">{{title}}</h2>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;">
      {{#members}}<div style="text-align: center;">
        <img src="{{image}}" alt="{{name}}" style="width: 160px; height: 160px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; border: 3px solid {{primary}}33;" />
        <h3 style="font-size: 18px; font-weight: 600; color: {{text}}; margin-bottom: 4px; font-family: {{fontHeading}};">{{name}}</h3>
        <p style="font-size: 14px; color: {{primary}}; font-family: {{fontBody}};">{{role}}</p>
      </div>{{/members}}
    </div>
  </div>
</section>`,
};

export const teamComponents = [teamGrid];
