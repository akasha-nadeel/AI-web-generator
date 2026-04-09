import { ComponentDefinition } from "../types";

export const contactSplit: ComponentDefinition = {
  id: "contact-split",
  category: "contact",
  name: "Split Contact",
  description: "Contact form with info on the side",
  source: "meraki",
  slots: {
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "longtext", label: "Subtitle", required: false },
    email: { type: "text", label: "Email", required: true },
    phone: { type: "text", label: "Phone", required: false },
    address: { type: "text", label: "Address", required: false },
  },
  defaultContent: {
    title: "Get in Touch",
    subtitle: "Have a question or want to work together? We'd love to hear from you.",
    email: "hello@yourbusiness.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, City, ST 12345",
  },
  html: `<section style="background-color: {{bg}}; padding: 96px 24px;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px;">
    <div>
      <h2 style="font-size: 40px; font-weight: 700; color: {{text}}; margin-bottom: 16px; font-family: {{fontHeading}};">{{title}}</h2>
      <p style="font-size: 17px; color: {{text}}; opacity: 0.65; line-height: 1.7; margin-bottom: 40px; font-family: {{fontBody}};">{{subtitle}}</p>
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="font-size: 14px; font-weight: 600; color: {{primary}}; margin-bottom: 4px; font-family: {{fontBody}};">Email</div>
          <div style="font-size: 16px; color: {{text}}; opacity: 0.8; font-family: {{fontBody}};">{{email}}</div>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 600; color: {{primary}}; margin-bottom: 4px; font-family: {{fontBody}};">Phone</div>
          <div style="font-size: 16px; color: {{text}}; opacity: 0.8; font-family: {{fontBody}};">{{phone}}</div>
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 600; color: {{primary}}; margin-bottom: 4px; font-family: {{fontBody}};">Address</div>
          <div style="font-size: 16px; color: {{text}}; opacity: 0.8; font-family: {{fontBody}};">{{address}}</div>
        </div>
      </div>
    </div>
    <div>
      <form style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; font-size: 14px; font-weight: 500; color: {{text}}; margin-bottom: 6px; font-family: {{fontBody}};">Name</label>
          <input type="text" placeholder="Your name" style="width: 100%; padding: 12px 16px; background: {{text}}08; border: 1px solid {{text}}15; border-radius: 10px; color: {{text}}; font-size: 15px; box-sizing: border-box; font-family: {{fontBody}};" />
        </div>
        <div>
          <label style="display: block; font-size: 14px; font-weight: 500; color: {{text}}; margin-bottom: 6px; font-family: {{fontBody}};">Email</label>
          <input type="email" placeholder="your@email.com" style="width: 100%; padding: 12px 16px; background: {{text}}08; border: 1px solid {{text}}15; border-radius: 10px; color: {{text}}; font-size: 15px; box-sizing: border-box; font-family: {{fontBody}};" />
        </div>
        <div>
          <label style="display: block; font-size: 14px; font-weight: 500; color: {{text}}; margin-bottom: 6px; font-family: {{fontBody}};">Message</label>
          <textarea rows="5" placeholder="Your message..." style="width: 100%; padding: 12px 16px; background: {{text}}08; border: 1px solid {{text}}15; border-radius: 10px; color: {{text}}; font-size: 15px; resize: vertical; box-sizing: border-box; font-family: {{fontBody}};"></textarea>
        </div>
        <button type="submit" style="background: {{primary}}; color: #ffffff; padding: 14px; border-radius: 10px; border: none; font-weight: 600; font-size: 16px; cursor: pointer; font-family: {{fontBody}};">Send Message</button>
      </form>
    </div>
  </div>
</section>`,
};

export const contactComponents = [contactSplit];
