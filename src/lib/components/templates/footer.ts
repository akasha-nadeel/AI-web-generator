import { ComponentDefinition } from "../types";

export const footerColumns: ComponentDefinition = {
  id: "footer-columns",
  category: "footer",
  name: "Column Footer",
  description: "Footer with multiple columns of links",
  source: "flowbite",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    tagline: { type: "text", label: "Tagline", required: false },
    columns: { type: "list", label: "Link Columns", required: true },
    copyright: { type: "text", label: "Copyright Text", required: true },
  },
  defaultContent: {
    brand: "Brand",
    tagline: "Making the world a better place through quality services.",
    columns: [
      { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
      { title: "Support", links: ["Help Center", "Contact", "FAQ", "Status"] },
      { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
    ],
    copyright: "2024 Brand. All rights reserved.",
  },
  html: `<footer style="background-color: {{bg}}; border-top: 1px solid {{text}}0a; padding: 64px 24px 32px;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px;">
      <div>
        <div style="font-size: 24px; font-weight: 700; color: {{primary}}; margin-bottom: 12px; font-family: {{fontHeading}};">{{brand}}</div>
        <p style="font-size: 15px; color: {{text}}; opacity: 0.5; line-height: 1.6; font-family: {{fontBody}};">{{tagline}}</p>
      </div>
      {{#columns}}<div>
        <h4 style="font-size: 14px; font-weight: 600; color: {{text}}; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; font-family: {{fontHeading}};">{{title}}</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          {{#links}}<li style="margin-bottom: 10px;"><a href="#" style="font-size: 14px; color: {{text}}; opacity: 0.5; text-decoration: none; font-family: {{fontBody}};">{{.}}</a></li>{{/links}}
        </ul>
      </div>{{/columns}}
    </div>
    <div style="border-top: 1px solid {{text}}0a; padding-top: 24px; text-align: center;">
      <p style="font-size: 13px; color: {{text}}; opacity: 0.4; font-family: {{fontBody}};">&copy; {{copyright}}</p>
    </div>
  </div>
</footer>`,
};

export const footerSimple: ComponentDefinition = {
  id: "footer-simple",
  category: "footer",
  name: "Simple Footer",
  description: "Minimal footer with copyright and links",
  source: "flowbite",
  slots: {
    brand: { type: "text", label: "Brand Name", required: true },
    links: { type: "list", label: "Links", required: true },
    copyright: { type: "text", label: "Copyright", required: true },
  },
  defaultContent: {
    brand: "Brand",
    links: ["About", "Privacy", "Terms", "Contact"],
    copyright: "2024 Brand. All rights reserved.",
  },
  html: `<footer style="background-color: {{bg}}; border-top: 1px solid {{text}}0a; padding: 32px 24px;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
    <div style="font-size: 20px; font-weight: 700; color: {{primary}}; font-family: {{fontHeading}};">{{brand}}</div>
    <div style="display: flex; gap: 24px;">
      {{#links}}<a href="#" style="font-size: 14px; color: {{text}}; opacity: 0.5; text-decoration: none; font-family: {{fontBody}};">{{.}}</a>{{/links}}
    </div>
    <p style="font-size: 13px; color: {{text}}; opacity: 0.4; font-family: {{fontBody}};">&copy; {{copyright}}</p>
  </div>
</footer>`,
};

export const footerComponents = [footerColumns, footerSimple];
