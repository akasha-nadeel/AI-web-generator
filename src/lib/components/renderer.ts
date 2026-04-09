import { getComponent } from "./registry";
import { ThemeConfig } from "./types";

function renderTemplate(
  html: string,
  content: Record<string, unknown>,
  theme: ThemeConfig
): string {
  let result = html;

  // Replace theme variables
  result = result.replace(/\{\{primary\}\}/g, theme.primary);
  result = result.replace(/\{\{secondary\}\}/g, theme.secondary);
  result = result.replace(/\{\{accent\}\}/g, theme.accent);
  result = result.replace(/\{\{bg\}\}/g, theme.bg);
  result = result.replace(/\{\{text\}\}/g, theme.text);
  result = result.replace(/\{\{fontHeading\}\}/g, `'${theme.fontHeading}', sans-serif`);
  result = result.replace(/\{\{fontBody\}\}/g, `'${theme.fontBody}', sans-serif`);

  // Replace simple content variables
  for (const [key, value] of Object.entries(content)) {
    if (typeof value === "string") {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
    }
  }

  // Handle list/array content with mustache-like syntax
  for (const [key, value] of Object.entries(content)) {
    if (Array.isArray(value)) {
      const listRegex = new RegExp(
        `\\{\\{#${key}\\}\\}([\\s\\S]*?)\\{\\{/${key}\\}\\}`,
        "g"
      );

      result = result.replace(listRegex, (_, template) => {
        return value
          .map((item) => {
            let itemHtml = template;
            if (typeof item === "string") {
              itemHtml = itemHtml.replace(/\{\{\.\}\}/g, item);
            } else if (typeof item === "object" && item !== null) {
              // Replace item properties
              for (const [itemKey, itemValue] of Object.entries(item as Record<string, unknown>)) {
                if (typeof itemValue === "string") {
                  itemHtml = itemHtml.replace(
                    new RegExp(`\\{\\{${itemKey}\\}\\}`, "g"),
                    itemValue
                  );
                } else if (typeof itemValue === "boolean") {
                  itemHtml = itemHtml.replace(
                    new RegExp(`\\{\\{${itemKey}\\}\\}`, "g"),
                    String(itemValue)
                  );
                }
                // Handle nested arrays
                if (Array.isArray(itemValue)) {
                  const nestedRegex = new RegExp(
                    `\\{\\{#${itemKey}\\}\\}([\\s\\S]*?)\\{\\{/${itemKey}\\}\\}`,
                    "g"
                  );
                  itemHtml = itemHtml.replace(nestedRegex, (_: string, nestedTemplate: string) => {
                    return (itemValue as unknown[])
                      .map((nestedItem) => {
                        let nestedHtml = nestedTemplate;
                        if (typeof nestedItem === "string") {
                          nestedHtml = nestedHtml.replace(/\{\{\.\}\}/g, nestedItem);
                        } else if (typeof nestedItem === "object" && nestedItem !== null) {
                          for (const [nk, nv] of Object.entries(nestedItem as Record<string, unknown>)) {
                            if (typeof nv === "string") {
                              nestedHtml = nestedHtml.replace(new RegExp(`\\{\\{${nk}\\}\\}`, "g"), nv);
                            }
                          }
                        }
                        return nestedHtml;
                      })
                      .join("");
                  });
                }
              }
              // Re-inject theme vars inside list items
              itemHtml = itemHtml.replace(/\{\{primary\}\}/g, theme.primary);
              itemHtml = itemHtml.replace(/\{\{secondary\}\}/g, theme.secondary);
              itemHtml = itemHtml.replace(/\{\{accent\}\}/g, theme.accent);
              itemHtml = itemHtml.replace(/\{\{bg\}\}/g, theme.bg);
              itemHtml = itemHtml.replace(/\{\{text\}\}/g, theme.text);
              itemHtml = itemHtml.replace(/\{\{fontHeading\}\}/g, `'${theme.fontHeading}', sans-serif`);
              itemHtml = itemHtml.replace(/\{\{fontBody\}\}/g, `'${theme.fontBody}', sans-serif`);
            }
            return itemHtml;
          })
          .join("");
      });
    }
  }

  return result;
}

export function renderComponent(
  componentId: string,
  content: Record<string, unknown>,
  theme: ThemeConfig
): string {
  const component = getComponent(componentId);
  if (!component) {
    return `<!-- Component "${componentId}" not found -->`;
  }

  // Merge default content with provided content
  const mergedContent = { ...component.defaultContent, ...content };
  return renderTemplate(component.html, mergedContent, theme);
}

export function renderSection(
  section: { componentId: string; content: Record<string, unknown> },
  theme: ThemeConfig
): string {
  return renderComponent(section.componentId, section.content, theme);
}
