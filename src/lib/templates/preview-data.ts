import { COLOR_PALETTES, FONT_STYLES, INDUSTRY_DEFAULT_PAGES } from "@/lib/constants";
import { ThemeConfig, SiteSection } from "@/lib/components/types";

export interface TemplatePreview {
  industryId: string;
  siteName: string;
  tagline: string;
  description: string;
  heroImage: string;
  paletteId: string;
  fontStyleId: string;
  overallFeel: string;
  sections: SiteSection[];
}

/* ===== TEMPLATE PREVIEW CONFIGS ===== */

const TEMPLATE_PREVIEWS: Record<string, TemplatePreview> = {
  restaurant: {
    industryId: "restaurant",
    siteName: "Sunrise Bistro",
    tagline: "Where Elegance Meets Flavor",
    description: "Premium Japanese dining experience with authentic cuisine crafted by master chefs using the finest seasonal ingredients.",
    heroImage: "/images/restaurant-hero.png",
    paletteId: "sushi",
    fontStyleId: "condensed",
    overallFeel: "rich",
    sections: [
      {
        componentId: "restaurant-nav",
        content: {
          brand: "Sunrise Bistro",
          links: ["About", "Menu", "Gallery", "Contact"],
          ctaText: "Book a Table",
        },
      },
      {
        componentId: "restaurant-hero",
        content: {
          headline: "WHERE ELEGANCE MEETS FLAVOR",
          subtitle: "Experience authentic cuisine crafted with passion, premium ingredients, and centuries of culinary tradition.",
          ctaText: "Explore Menu",
          heroImage: "/images/restaurant-hero.png",
          stat: "10+",
          statLabel: "Years of Excellence",
        },
      },
      {
        componentId: "restaurant-marquee",
        content: {
          items: [
            { label: "FRESH SUSHI ROLLS" },
            { label: "PREMIUM WAGYU" },
            { label: "SIGNATURE RAMEN" },
            { label: "SEASONAL SASHIMI" },
            { label: "CRAFT COCKTAILS" },
          ],
        },
      },
      {
        componentId: "restaurant-about",
        content: {
          sectionLabel: "{About Us}",
          headline: "A STORY BUILT ON PASSION AND FLAVOR",
          body: "From our humble beginnings, we set out to craft dishes that honor tradition while embracing innovation. Every plate tells a story of dedication, fresh ingredients, and the art of Japanese cuisine passed down through generations.",
          image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
          ctaText: "More About Us",
        },
      },
      {
        componentId: "restaurant-menu",
        content: {
          sectionLabel: "{Our Menu}",
          headline: "DISCOVER THE ART OF TASTE",
          ctaText: "View All Menu",
          items: [
            { image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=400&fit=crop", name: "Sashimi Board", desc: "Chef's selection of 12 premium daily cuts", price: "$38", rating: "4.9" },
            { image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop", name: "Dragon Roll", desc: "Shrimp tempura, avocado, unagi sauce", price: "$24", rating: "4.8" },
            { image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop", name: "Wagyu A5 Steak", desc: "Japanese wagyu glazed with white miso", price: "$65", rating: "5.0" },
          ],
        },
      },
      {
        componentId: "restaurant-specials",
        content: {
          sectionLabel: "{Chef's Special}",
          headline: "A SYMPHONY OF TRADITION AND MODERN TASTE",
          featureName: "Omakase Experience",
          featureYear: "(2024-2025)",
          items: [
            { num: "01", name: "Crispy Tempura Bites" },
            { num: "02", name: "Spicy Tuna Tartare" },
            { num: "03", name: "Truffle Mushroom Soup" },
            { num: "04", name: "Edamame with Sea Salt" },
          ],
        },
      },
      {
        componentId: "restaurant-testimonials",
        content: {
          sectionLabel: "{Testimonials}",
          headline: "WHAT OUR GUESTS SAY",
          reviews: [
            { quote: "An extraordinary dining experience. Every dish was a work of art, and the attention to detail was remarkable.", author: "Sakura Tanaka", role: "Business Executive", stars: "5" },
            { quote: "The freshest sushi I have ever tasted outside of Tokyo. The omakase experience was truly unforgettable.", author: "Aiko Matsuda", role: "Culinary Reviewer", stars: "5" },
            { quote: "Impeccable service and stunning presentation. We keep coming back for the wagyu and the atmosphere.", author: "Emi Suzuki", role: "Food Photographer", stars: "5" },
          ],
        },
      },
      {
        componentId: "restaurant-team",
        content: {
          sectionLabel: "{Our Chefs}",
          headline: "THE TEAM BEHIND EVERY DISH",
          members: [
            { image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=700&fit=crop", name: "Takahashi Aya", role: "Sous Chef" },
            { image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=500&h=700&fit=crop", name: "Sato Kenichi", role: "Head Chef" },
            { image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=500&h=700&fit=crop", name: "Nakamura Sho", role: "Pastry Chef" },
          ],
        },
      },
      {
        componentId: "restaurant-locations",
        content: {
          sectionLabel: "{Our Locations}",
          headline: "CELEBRATE EVERY MOMENT WITH SUNRISE BISTRO EVENTS",
          places: [
            { photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=500&fit=crop", city: "Downtown", addr: "123 Main St, San Francisco, CA 94102" },
            { photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=500&fit=crop", city: "Waterfront", addr: "456 Harbor Blvd, San Francisco, CA 94111" },
          ],
        },
      },
      {
        componentId: "restaurant-blog",
        content: {
          headline: "OUR LATEST BLOGS.",
          intro: "Explore culinary stories, behind-the-scenes moments, and the latest from our kitchen to your table.",
          posts: [
            { photo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=800&fit=crop", tag: "(Culinary)", date: "Mar 15, 2026", title: "THE ART OF PLATING: HOW OUR CHEFS CREATE EDIBLE MASTERPIECES" },
            { photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop", tag: "(Ingredients)", date: "Feb 28, 2026", title: "FROM OCEAN TO TABLE: SOURCING THE FRESHEST FISH DAILY" },
          ],
        },
      },
      {
        componentId: "restaurant-footer",
        content: {
          brand: "Sunrise Bistro",
          photos: [
            { src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop" },
          ],
          newsletterHeading: "SIGN UP FOR UPDATES, OFFERS, AND DELICIOUS SURPRISES",
          columns: [
            { title: "Pages", links: ["About", "Menu", "Gallery", "Contact"] },
            { title: "Utility", links: ["Style Guide", "Licenses", "Changelog"] },
            { title: "Follow Us", links: ["Instagram", "Facebook", "Twitter"] },
          ],
          copyright: "2026 Sunrise Bistro. All rights reserved.",
        },
      },
    ],
  },

  portfolio: {
    industryId: "portfolio",
    siteName: "Portilo Design",
    tagline: "Crafting Digital Experiences",
    description: "Product designer & creative developer building thoughtful, user-centered digital experiences.",
    heroImage: "/images/portfolio-hero.png",
    paletteId: "sunset",
    fontStyleId: "bold",
    overallFeel: "minimal",
    sections: [
      {
        componentId: "portfolio-nav",
        content: { brand: "Portilo", ctaText: "Contact" },
      },
      {
        componentId: "portfolio-hero",
        content: {
          heroImage: "/images/portfolio-hero.png",
          availableText: "Available for work",
          name: "LEON",
          role: "Product Designer",
          location: "Bangladesh",
          bio: "LEON \u2014 PRODUCT DESIGNER, I'M SPECIALIZES IN WEBSITE DESIGN, PROTOTYPING, WIRE-FRAMING, AND DESIGN SYSTEMS, TURNING COMPLEX IDEAS INTO CLEAN, FUNCTIONAL INTERFACES DESIGN.",
          rate: "$75",
          rateLabel: "Hourly Rate",
          ctaText: "HIRE ME",
        },
      },
      {
        componentId: "portfolio-skills",
        content: {
          label: "//ABOUT ME",
          title: "My Experience And Expertise With Design Tools Used",
          accentText: "Through Out My Career.",
          skills: [
            { name: "Website Design", number: "/01", description: "Scalable UI Components", percentage: "90" },
            { name: "App UI Design", number: "/02", description: "Device-Friendly Layouts", percentage: "75" },
            { name: "Prototyping", number: "/03", description: "Add Motion And Transitions", percentage: "90" },
            { name: "Web Flow/ Framer Dev", number: "/04", description: "Build Dynamic Sites", percentage: "85" },
          ],
        },
      },
      {
        componentId: "portfolio-services",
        content: {
          label: "//WHAT I DO?",
          previewImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
          previewDesc: "This Project Involved The End-To-End UI/UX Design Of A Modern SaaS (Software As A Service) Platform, Focusing On Usability, Responsiveness, And Conversion Optimization.",
          services: [
            { name: "Web Design" },
            { name: "Web Development" },
            { name: "App Design" },
            { name: "UI/UX Reserch" },
            { name: "Branding" },
            { name: "Web Development" },
          ],
        },
      },
      {
        componentId: "portfolio-projects",
        content: {
          label: "//RECENT WORK",
          title: "My Recent Project That I Done.",
          subtitle: "I Start By Understanding The User Needs And Mapping Out The App Flow Through Wireframes.",
          ctaText: "SEE ALL OF MY WORK",
          projects: [
            { title: "Project Title Goes Here", description: "About Project By Understanding The User Needs And Mapping Out The App Flow Through Wireframes.", image: "/images/portfolio-project.png" },
          ],
        },
      },
      {
        componentId: "portfolio-pricing",
        content: {
          label: "//PRICING",
          title: "My Pricing Plan For You.",
          plans: [
            { name: "Starter Plan", price: "$299", period: "/Monthly", badge: "", btnStyle: "", description: "My Basic Pricing Plan Is Designed To Offer Extra Ordinary Value And Feature", ctaText: "GET STARTED", featureList: [{ item: "All Template Unlocked" }, { item: "Unlimited Request" }, { item: "Poject Mangement" }, { item: "Unlimited Revisions" }, { item: "Pause Or Cancel Anytime" }, { item: "Email Support" }] },
            { name: "Starter Plan", price: "$299", period: "/Monthly", badge: "Pro", btnStyle: "background:#f97316;border-color:#f97316", description: "My Basic Pricing Plan Is Designed To Offer Extra Ordinary Value And Feature", ctaText: "GET STARTED", featureList: [{ item: "All Template Unlocked" }, { item: "Unlimited //" }, { item: "Poject Mangement" }, { item: "Unlimited Revisions" }, { item: "Pause Or Cancel Anytime" }, { item: "Email Support" }] },
            { name: "Starter Plan", price: "$299", period: "/Monthly", badge: "", btnStyle: "", description: "My Basic Pricing Plan Is Designed To Offer Extra Ordinary Value And Feature", ctaText: "GET STARTED", featureList: [{ item: "All Template Unlocked" }, { item: "Unlimited Request" }, { item: "Poject Mangement" }, { item: "Unlimited Revisions" }, { item: "Pause Or Cancel Anytime" }, { item: "Email Support" }] },
          ],
        },
      },
      {
        componentId: "portfolio-testimonials",
        content: {
          label: "//TESTIMONIAL",
          title: "Trusted By International Brand",
          testimonials: [
            { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#f97316", company: "Hero" },
            { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#6366f1", company: "vivo" },
            { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#22c55e", company: "ASUS" },
          ],
          testimonials2: [
            { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#f43f5e", company: "Hero" },
            { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#eab308", company: "vivo" },
            { name: "Alen Sapan", role: "Product Designer, BD", quote: "\u201C I Hired <b>Rebel</b> To Redesign My Saas  Company <b>Website</b>. The Process Was Smooth And Easy. He Is Very Talented <b>Webflow</b> Developer. I Highly Recommend Him.", initials: "AS", bgColor: "#06b6d4", company: "ASUS" },
          ],
        },
      },
      {
        componentId: "portfolio-stats",
        content: {
          label: "//STATS",
          stats: [
            { number: "50+", label: "Global Clients" },
            { number: "12+", label: "Years Of Experience" },
            { number: "15+", label: "Awards Won" },
            { number: "99%", label: "Success Rate" },
          ],
        },
      },
      {
        componentId: "portfolio-cta",
        content: {
          headline: "LET'S WORK TOGETHER",
          ctaText: "Get In Touch",
          email: "hello@alexchen.design",
        },
      },
      {
        componentId: "portfolio-footer",
        content: {
          footerImage: "/images/portfolio-footer.png",
          brand: "Portilo",
          name: "LEON",
          role: "Product Designer",
          experience: "12+ Years Of Experience",
          location: "Based In Bangladesh",
          city: "Sylhet",
          description: "CREATIVE PRODUCT DESIGNER FROM BANGLADESH, CRAFTING HIGH-PERFORMANCE, INTERACTIVE WEBSITES WITH PRECISION.",
          copyright: "2025 DESIGN BY LEON",
        },
      },
    ],
  },

  agency: {
    industryId: "agency",
    siteName: "A GenC",
    tagline: "Creative Studio",
    description: "We turn ambitious ideas into striking digital realities through strategy, design, and relentless attention to detail.",
    heroImage: "/images/agency-hero-bg.png",
    paletteId: "clean",
    fontStyleId: "modern",
    overallFeel: "corporate",
    sections: [
      {
        componentId: "agency-nav",
        content: { brand: "A GenC", ctaText: "Book" },
      },
      {
        componentId: "agency-hero",
        content: {
          heroImage: "/images/agency-hero-bg.png",
          name: "A GenC",
          label: "CREATIVE STUDIO",
          description: "We turn ambitious ideas into striking digital realities through strategy, design, and relentless attention to detail.",
          ctaText1: "See Projects",
          ctaText2: "Get in Touch",
        },
      },
      {
        componentId: "agency-about",
        content: {
          label: "Why choose us",
          title: "The People Behind Every Pixel",
          image: "/images/car-image.jpg",
          description: "At A GenC\u00AE Studio, we unite creative thinkers, brand architects,",
          descFaded: "and digital craftspeople to deliver work that moves audiences and drives real business results.",
          statNumber: "260+",
          statLabel: "Projects Shipped",
          factNumber: "97%",
          factLabel: "Client satisfaction across every engagement.",
          factImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=600&fit=crop",
          ctaText: "View Plans",
          fieldsCount: "Over 80 Industries",
          countriesCount: "9 Countries Worldwide",
        },
      },
      {
        componentId: "agency-projects",
        content: {
          label: "Case studies",
          title: "Recent Work.",
          subtitle: "A selection of projects where strategy met craft. Each one solved a real problem for a real brand.",
          badge: "22-26\u00B0",
          projects1: [
            { number: "01", name: "Halcyon Dashboard", year: "2026", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop" },
            { number: "02", name: "Orion Platform", year: "2025", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=700&h=500&fit=crop" },
          ],
          projects2: [
            { number: "03", name: "Prism Mobile App", year: "2024", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop" },
            { number: "04", name: "Vanta Rebrand", year: "2023", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop" },
            { number: "05", name: "Kova E-Commerce", year: "2025", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop" },
          ],
        },
      },
      {
        componentId: "agency-team",
        content: {
          label: "Our Crew",
          title: "Creatives Who Care About the Craft",
          members: [
            { name: "Sara Mitchell", role: "Creative Director", tag: "#thevisionary", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face" },
            { name: "David Park", role: "Lead Developer", tag: "#theengineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
            { name: "Nina Alvarez", role: "Brand Strategist", tag: "#thestoryteller", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
          ],
        },
      },
      {
        componentId: "agency-testimonials",
        content: {
          label: "Client Feedback",
          title: "Kind Words.",
          subtitle: "Hear directly from the founders, marketers, and product leads we\u2019ve partnered with.",
          quote: "A GenC didn\u2019t just redesign our product \u2014 they rethought how our users experience it. The results spoke for themselves within the first month.",
          authorName: "Rachel Owens",
          authorRole: "Head of Product, Nimbus",
          authorImage: "/images/men-image.jpg",
          stat1: "1.8M+",
          stat1Label: "Users reached",
          stat2: "92%",
          stat2Label: "Conversion lift",
          stat3: "74%",
          stat3Label: "Repeat clients",
        },
      },
      {
        componentId: "agency-process",
        content: {
          label: "How we work",
          title: "Clarity at Every Stage",
          subtitle: "No black boxes. We keep you in the loop from first sketch to final deploy.",
          steps: [
            { number: ".01", stepLabel: "Discovery", stepTitle: "Research, Audit and Strategy Alignment", stepImage: "/images/process-phone.png" },
            { number: ".02", stepLabel: "Design Sprint", stepTitle: "Wireframes, Prototypes and Visual Direction" },
            { number: ".03", stepLabel: "Build & Ship", stepTitle: "Development, QA and Launch Support" },
          ],
        },
      },
      {
        componentId: "agency-pricing",
        content: {
          label: "Investment",
          title: "Pricing",
          plans: [
            { planName: "Starter", duration: "1-2 Weeks", price: "$1,200", period: "/Project", desc: "Perfect for landing pages, small sites, or quick design sprints.", ctaLabel: "Get Started", btnStyle: "background:#fff;color:#111", featureList: [{ item: "Single-page or micro-site design" }, { item: "Responsive build in Figma" }, { item: "Two revision rounds included" }, { item: "Delivered within 10 business days" }, { item: "Async communication via Slack" }] },
            { planName: "Growth", duration: "3-4 Weeks", price: "$4,800", period: "/Project", desc: "For brands ready to level up their digital presence.", ctaLabel: "Get Started", btnStyle: "background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.2)", featureList: [{ item: "Multi-page site or web app design" }, { item: "Brand system and component library" }, { item: "Interactive prototype delivery" }, { item: "Weekly check-in calls" }, { item: "Priority turnaround" }] },
            { planName: "Enterprise", duration: "2-5 Months", price: "Custom", period: "", desc: "End-to-end engagements for complex products and platforms.", ctaLabel: "Talk to Us", btnStyle: "background:#222;color:#fff", featureList: [{ item: "Full discovery and strategy phase" }, { item: "Design system + development handoff" }, { item: "Dedicated project manager" }, { item: "Phased milestone delivery" }, { item: "Post-launch optimization support" }] },
          ],
        },
      },
      {
        componentId: "agency-faq",
        content: {
          label: "Questions & Answers",
          title: "Got Questions?",
          faqs: [
            { question: "How does a typical project kick off?", answer: "We start with a free 30-minute discovery call to understand your goals, timeline, and budget before sending a tailored proposal." },
            { question: "What is your average turnaround time?", answer: "" },
            { question: "Do you work with startups or only large companies?", answer: "" },
            { question: "Can I request revisions after delivery?", answer: "" },
            { question: "What happens if the project scope changes?", answer: "" },
          ],
        },
      },
      {
        componentId: "agency-blog",
        content: {
          label: "From the Blog",
          title: "Perspectives on Design & Growth.",
          subtitle: "A GenC shares lessons learned from building brands, shipping products, and everything in between.",
          posts: [
            { author: "Sara Mitchell", authorRole: "Creative Dir.", date: "Mar 2026", postTitle: "Why Brand Strategy Should Come Before Any Visual Design Work", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop" },
            { author: "David Park", authorRole: "Lead Dev", date: "Jan 2026", postTitle: "Performance Budgets: The Hidden Driver of Great User Experience", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop" },
            { author: "Nina Alvarez", authorRole: "Strategist", date: "Nov 2025", postTitle: "Storytelling in UI: How Micro-Copy Shapes Product Perception", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&h=350&fit=crop" },
          ],
        },
      },
      {
        componentId: "agency-contact",
        content: {
          label: "Start a conversation",
          title: "Ready to Build Something?",
          subtitle: "Drop us a line about your next project \u2014 we\u2019ll get back within 24 hours.",
          ctaText: "Send Message",
        },
      },
      {
        componentId: "agency-footer",
        content: {
          brand: "A GenC",
          email: "hello@agenc.studio",
          copyright: "2026 A GenC Studio. All Rights Reserved",
          footerImage: "/images/footer-image.jpg",
        },
      },
    ],
  },

  ecommerce: {
    industryId: "ecommerce",
    siteName: "Chicago",
    tagline: "Run to win.",
    description: "Premium athletic gear built for runners who never stop. Designed for speed, endurance, and the toughest conditions.",
    heroImage: "/images/ecom-hero.png",
    paletteId: "storefront",
    fontStyleId: "storefront",
    overallFeel: "corporate",
    sections: [
      {
        componentId: "ecom-hero",
        content: {
          brand: "Chicago",
          navLinks: ["Shop All", "Behind The Brand"],
          headline: "Meet Chicago, the flexible ecommerce template.",
          description: "Gear built for runners who never stop. Designed for speed, endurance, and the toughest conditions — because limits are meant to be broken.",
          ctaLabel: "Shop All",
          backgroundImage: "/images/ecom-hero.png",
        },
      },
      {
        componentId: "ecom-marquee",
        content: {
          items: [
            { label: "FREE SHIPPING ON SELECTED ORDERS" },
            { label: "30 DAY RETURNS" },
            { label: "FREE SHIPPING ON SELECTED ORDERS" },
            { label: "30 DAY RETURNS" },
          ],
        },
      },
      {
        componentId: "ecom-featured",
        content: {
          title: "Featured",
          products: [
            { image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop", category: "ALL WEATHER", name: "Elite Windbreaker", price: "$139" },
            { image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop", category: "PERFORMANCE", name: "Racing Shorts", price: "$49" },
            { image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=600&fit=crop", category: "LIFESTYLE", name: "Training Joggers", price: "$79" },
          ],
        },
      },
      {
        componentId: "ecom-promo",
        content: {
          headline: "Footwear formulated for champion athletes.",
          description: "Check out our new line of running shoes, designed for road, performance, and distance athletes.",
          ctaLabel: "Shop Shoes",
          backgroundImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&h=800&fit=crop",
        },
      },
      {
        componentId: "ecom-shop-all",
        content: {
          title: "Shop All",
          subtitle: "The latest in lifestyle and performance running, meticulously crafted for wherever your journey takes you",
          filters: ["Featured", "Low to High", "High to Low"],
          resultCount: "9 RESULTS",
          products: [
            { image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop", category: "PERFORMANCE", name: "Racing Singlet", price: "$65" },
            { image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop", category: "PERFORMANCE", name: "Speed Shorts", price: "$49" },
            { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop", category: "FOOTWEAR", name: "Hermes Racing Shoe", price: "$220" },
            { image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop", category: "ALL WEATHER", name: "Windbreaker Pro", price: "$139" },
            { image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop", category: "PERFORMANCE", name: "Training Tee White", price: "$49" },
            { image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=500&fit=crop", category: "LIFESTYLE", name: "Training Joggers", price: "$79" },
          ],
          ctaLabel: "Load More",
        },
      },
      {
        componentId: "ecom-reviews",
        content: {
          title: "What Other Runners Say",
          reviews: [
            { image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", username: "@usain_voltage", stars: "4.5", review: "Super lightweight and responsive! Feels like running on air. A bit pricey, but totally worth it for serious runners." },
            { image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", username: "@couchp0tat014", stars: "4.5", review: "The softest hoodie I have ever bought. Perfect for lounging or casual wear. Fits oversized, so size down." },
            { image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop", username: "@elliotkipchoge", stars: "5", review: "Blocks the wind without overheating. Stylish but needs an extra pocket." },
          ],
        },
      },
      {
        componentId: "ecom-story",
        content: {
          headline: "Born from the streets of Chicago",
          description: "From humble beginnings, our gear is built to stand behind you on every journey. We take pride in what we make, knowing that it is the backbone of your training.",
          ctaLabel: "Behind the Brand",
          backgroundImage: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&h=800&fit=crop",
        },
      },
      {
        componentId: "ecom-footer",
        content: {
          brand: "Chicago",
          columns: [
            { title: "Shop", links: ["Shop all", "Behind the brand", "New arrivals"] },
            { title: "Support", links: ["Contact", "Terms", "FAQ's"] },
          ],
          copyright: "2026 Chicago",
          tagline: "Run to win.",
        },
      },
    ],
  },

  blog: {
    industryId: "blog",
    siteName: "The Daily Muse",
    tagline: "Stories Worth Telling",
    description: "A curated journal of ideas, culture, and creative inspiration for curious minds.",
    heroImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop",
    paletteId: "noir",
    fontStyleId: "editorial",
    overallFeel: "minimal",
    sections: [
      {
        componentId: "blog-nav",
        content: {
          brand: "muse",
          links: ["Culture", "Design", "Travel", "About"],
          ctaText: "Subscribe",
        },
      },
      {
        componentId: "blog-hero",
        content: {
          headline: "Read today.",
          headline2: "Think tomorrow.",
          subheadline: "Stories and insights at the intersection of\nculture, design, and the human experience.",
          ctaText: "Start Reading",
          backgroundImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1600&h=1000&fit=crop",
          trustText: "Trusted by curious minds",
          trustLogos: ["Medium", "Substack", "The Verge", "Wired"],
        },
      },
      {
        componentId: "blog-white-section",
        content: {
          headline: "The Daily Muse is where culture, creativity, and curiosity collide.",
          description: "We bring together the sharpest writers and the most compelling stories. Every piece is crafted to make you think deeper, see clearer, and live more intentionally.",
          ctaText: "About us",
          stats: [
            { number: "500+", desc: "Articles published" },
            { number: "120K", desc: "Monthly readers" },
            { number: "50+", desc: "Contributors" },
            { number: "12", desc: "Awards won" },
          ],
        },
      },
      {
        componentId: "blog-photo-section",
        content: {
          headline: "Say goodbye to bland content and hello to bold storytelling.",
          description: "We believe every story deserves to be told with depth, beauty, and authenticity. No fluff, no filler — just writing that stays with you.",
          backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop",
        },
      },
      {
        componentId: "blog-articles",
        content: {
          label: "Featured Stories",
          title: "Latest from the journal",
          articles: [
            { name: "The Art of Slow Living", tag: "Culture", readTime: "8 min read", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop" },
            { name: "Design Trends Shaping 2026", tag: "Design", readTime: "6 min read", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&h=500&fit=crop" },
            { name: "Finding Inspiration in Silence", tag: "Creativity", readTime: "5 min read", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&h=500&fit=crop" },
          ],
        },
      },
      {
        componentId: "blog-newsletter",
        content: {
          headline: "Designed to make\nevery story unforgettable.",
          description: "All your inspiration, one effortless experience.",
          backgroundImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=900&fit=crop",
          ctaText: "Subscribe",
          placeholder: "Enter your email",
        },
      },
      {
        componentId: "blog-footer",
        content: {
          brand: "muse",
          tagline: "Ideas, culture, and creative inspiration for curious minds.",
          columns: [
            { title: "Journal", links: ["Culture", "Design", "Travel", "Technology"] },
            { title: "Company", links: ["About", "Contributors", "Advertise", "Contact"] },
            { title: "Connect", links: ["Twitter", "Instagram", "RSS", "Newsletter"] },
          ],
          copyright: "2026 The Daily Muse. All rights reserved.",
        },
      },
    ],
  },

  fitness: {
    industryId: "fitness",
    siteName: "WARAS",
    tagline: "Push Your Limits",
    description: "Premium fitness club with world-class training, expert coaches, and a community built for results.",
    heroImage: "/images/fitness-hero-bg.png",
    paletteId: "blaze",
    fontStyleId: "athletic",
    overallFeel: "rich",
    sections: [
      {
        componentId: "fitness-nav",
        content: { brand: "WARAS", links: ["About", "Programs", "Trainers", "Club"], ctaText: "Claim free trial" },
      },
      {
        componentId: "fitness-hero",
        content: {
          label: "NO EXCUSES. JUST RESULTS.",
          headline: "PUSH YOUR BODY BEYOND LIMITS",
          subheadline: "Join a community that pushes limits and celebrates every victory — big or small.",
          ctaText: "Start training",
          secondaryCta: "Visit us",
          backgroundImage: "/images/fitness-hero-bg.png",
        },
      },
      {
        componentId: "fitness-stats",
        content: {
          note: "No hidden fees. Cancel anytime.",
          stats: [
            { number: "15K+", desc: "Active Members" },
            { number: "85+", desc: "Expert Trainers" },
            { number: "120+", desc: "Weekly Classes" },
            { number: "12", desc: "Club Locations" },
          ],
        },
      },
      {
        componentId: "fitness-marquee",
        content: {
          items: [
            { label: "STRENGTH TRAINING" },
            { label: "CROSSFIT" },
            { label: "HIIT" },
            { label: "YOGA" },
            { label: "BOXING" },
            { label: "CYCLING" },
            { label: "PILATES" },
            { label: "FUNCTIONAL FITNESS" },
          ],
        },
      },
      {
        componentId: "fitness-locations",
        content: {
          title: "Find a Club Near You",
          subtitle: "Premium facilities in major cities across the country.",
          locations: [
            { name: "Downtown", city: "Manhattan, NY", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop" },
            { name: "Westside", city: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=800&fit=crop" },
            { name: "Lakefront", city: "Chicago, IL", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=800&fit=crop" },
          ],
        },
      },
      {
        componentId: "fitness-split",
        content: {
          title: "Real Coaches. Real Results.",
          subtitle: "Certified Personal Training — Starting from $45/Session",
          description: "Our certified trainers design programs tailored to your unique goals, body type, and schedule. Whether you want to build muscle, lose weight, or improve endurance — we've got you covered.",
          ctaText: "About Personal Training",
          image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&h=800&fit=crop",
        },
      },
      {
        componentId: "fitness-promo",
        content: {
          badge: "NEW CLASS LAUNCH",
          headline: "Pilates Reformer at WARAS — Starting from $25/Session",
          description: "Join our Pilates Reformer class and sculpt your way to a stronger, leaner, more aligned body.",
          ctaText: "RESERVE YOUR SPOT TODAY",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=900&fit=crop",
          cardText: "Whether you're chasing better posture, core strength, or a toned silhouette — this is your move.",
          benefits: [
            { label: "Suitable for all fitness levels" },
            { label: "Improves posture, flexibility & muscle control" },
            { label: "Low-impact, high-result training" },
          ],
        },
      },
      {
        componentId: "fitness-classes",
        content: {
          title: "Explore Our Classes",
          subtitle: "From high-intensity training to mindful movement — find your perfect workout.",
          classes: [
            { name: "Power Lift", tag: "Strength", tagColor: "#fd6934", level: "Advanced", duration: "60 min", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=800&fit=crop" },
            { name: "HIIT Burn", tag: "Cardio", tagColor: "#dbff02", level: "Intermediate", duration: "45 min", image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&h=800&fit=crop" },
            { name: "Flow Yoga", tag: "Mind & Body", tagColor: "#00c4d1", level: "All Levels", duration: "50 min", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=800&fit=crop" },
          ],
        },
      },
      {
        componentId: "fitness-cta",
        content: {
          headline: "YOUR TRANSFORMATION STARTS TODAY",
          subheadline: "Join 15,000+ members who chose to invest in themselves. First week is on us.",
          ctaText: "Claim free trial",
          backgroundImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1600&h=900&fit=crop",
        },
      },
      {
        componentId: "fitness-footer",
        content: {
          brand: "WARAS",
          tagline: "Your Trusted Fitness Partner",
          columns: [
            { title: "Programs", links: ["Hatha Yoga", "HIIT Burn", "Kettlebell Conditioning", "Hip Hop Sweat", "Functional Strength"] },
            { title: "Pages", links: ["About Us", "Trainers", "Programs", "Location", "Contact Us"] },
            { title: "Resources", links: ["Blog", "Career", "Privacy Policy", "Terms & Conditions"] },
            { title: "Social", links: ["Instagram", "Facebook", "Twitter", "Youtube"] },
          ],
          emails: [
            { label: "careers@waras.com" },
            { label: "partnership@waras.com" },
            { label: "enterprise@waras.com" },
          ],
          photos: [
            { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=300&fit=crop" },
            { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop" },
          ],
          copyright: "2026 WARAS. All rights reserved.",
        },
      },
    ],
  },

  realestate: {
    industryId: "realestate",
    siteName: "Dwello",
    tagline: "Real Estate made easy",
    description: "Find your next home with our curated collection of premium properties across Iceland, Switzerland and Ireland.",
    heroImage: "/images/realestate-hero-bg.png?w=800&h=500&fit=crop",
    paletteId: "sunset",
    fontStyleId: "geometric",
    overallFeel: "luxury",
    sections: [
      {
        componentId: "realestate-nav",
        content: { menuText: "Menu" },
      },
      {
        componentId: "realestate-hero",
        content: {
          heroImage: "/images/realestate-hero-bg.png?w=1600&h=900&fit=crop",
          titleTop: "Find Your",
          titleBottom: "Next Home",
          description: "Search through our collection of properties in Iceland, Switzerland and Ireland",
          ctaText: "Explore All",
        },
      },
      {
        componentId: "realestate-listings",
        content: {
          label: "Featured Properties",
          title: "Explore Our Top Listings",
          subtitle: "Our featured properties page showcases a curated selection of the finest homes for sale in Ireland, Switzerland and Iceland",
          ctaText: "Explore All",
          filterLabel: "Choose Your Location",
          locations: ["Iceland", "Switzerland", "Ireland"],
          properties: [
            { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", name: "Modern City Loft", location: "Dublin", specs: "2 Beds \u00B7 2 Baths \u00B7 1,200 m\u00B2", type: "Rent", price: "$10,000" },
            { image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop", name: "Old Studio", location: "Zurich, Kreis 5", specs: "2 Beds \u00B7 2 Baths \u00B7 1,100 m\u00B2", type: "Sale", price: "$720,000" },
          ],
        },
      },
      {
        componentId: "realestate-services",
        content: {
          label: "Our Services",
          title: "We Help You Buy, Sell, Rent, and Manage Properties With Ease.",
          description: "What makes us different? We offer personalized real estate services with a client-first approach. Our local market expertise ensures a seamless experience and outstanding results.",
          filterLabel: "Choose Your Service",
          services: ["Buy", "Sell", "Rent", "Manage"],
          contentTitle: "Find Your Perfect Home",
          contentDesc: "We guide you through every step of finding and buying your dream property, ensuring a smooth and confident process from your first search to the final closing.",
          subTitle: "What makes us Expectational",
          bullets: ["We find properties that match your needs.", "We provide expert guidance through the process.", "We handle all negotiations for you.", "We assist with all paperwork and closing."],
          ctaLabel: "Find Your Next Home",
          ctaText: "Explore Properties",
          image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop",
          image2: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop",
          thumbImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=150&fit=crop",
        },
      },
      {
        componentId: "realestate-team",
        content: {
          label: "Our Team",
          title: "Our Team of Experts",
          phone: "+323 323 3232",
          email: "hello@dwello.com",
          address: "123 Main Street @Capital City,",
          contactBtn: "Contact us",
          description: "We are a passionate team of experts dedicated to your real estate success.",
          tagline: "Real Estate made easy",
          brand: "Dwello",
          brandTag: "Real Estate made easy.",
          members: [
            { image: "/images/team-member-1.jpg", name: "Mark", role: "Real Estate Agent" },
            { image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop", name: "Zack", role: "Real Estate Advisor" },
            { image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop", name: "Idris", role: "Property Consultant" },
          ],
        },
      },
      {
        componentId: "realestate-about",
        content: {
          label: "About us",
          title: "Our Proven Track Record of Success in Helping You Achieve Your Goals.",
          subtitle: "We believe that a company\u2019s success is best measured by its results. Our achievements are a direct reflection of our dedication to our clients and their real estate goals.",
          btnText: "About us",
          stat1Num: "150", stat1Desc: "Properties Sold",
          stat2Num: "100M", stat2Desc: "In Property Value Sold",
          stat3Num: "150k", stat3Desc: "Online Property Views",
          stat4Num: "130", stat4Desc: "Properties Rented",
          stat5Num: "20", stat5Desc: "Years of Experience",
          stat6Num: "100.", stat6Desc: "Satisfied Clients",
          aboutImage1: "/images/images-about-us/about-4.jpg",
          statBg2: "/images/images-about-us/about-3.jpg",
          statBg3: "/images/images-about-us/about-7.jpg",
          statBg5: "/images/images-about-us/about-2.jpg",
          statBg6: "/images/images-about-us/about-1.jpg",
        },
      },
      {
        componentId: "realestate-reviews",
        content: {
          label: "Reviews",
          title: "Discover Why We Are The Top-Rated Real Estate Service in The Area.",
          subtitle: "We are proud to share the experiences of our clients. Read their stories to learn more about our service and how we can help you.",
          btnText: "Read All",
          reviews: [
            { quote: "I will definitely recommend Dwello to anyone looking to sell. Their dedication and hard work were truly outstanding.", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605\u2605", initial: "I", name: "Idris", role: "Entrepreneur" },
            { quote: "Selling my home was effortless with Dwello. Their professional guidance and deep market knowledge made all the difference.", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605", initial: "L", name: "Leo", role: "Seller" },
            { quote: "Thanks to the Dwello team, I found the perfect home. Their commitment and expertise were evident in every interaction.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605\u2605", initial: "J", name: "John", role: "Buyer" },
            { quote: "Dwello made buying my first home a wonderful journey. They were patient, knowledgeable, and guided me with confidence every step of the way.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop", stars: "\u2605\u2605\u2605\u2605", initial: "M", name: "Maria", role: "Investor" },
          ],
        },
      },
      {
        componentId: "realestate-contact",
        content: {
          label: "Contact us",
          title: "Ready to Start Your Journey?",
          description: "Ready to start your real estate journey? Our team is here to help you every step of the way. Contact us today to schedule a consultation and take the first step toward achieving your goals",
          cards: [
            { num: "01", title: "Fast Reply", desc: "Skip the wait. Get fast, reliable answers to all your property questions.", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop" },
            { num: "02", title: "Effortless Contact", desc: "Get in touch easily and get a quick, expert answer to your real estate questions.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop" },
          ],
        },
      },
      {
        componentId: "realestate-faq",
        content: {
          label: "Frequently Asked Questions",
          title: "The Answers to Your Real Estate Questions.",
          subtitle: "We know you have questions. Our team has compiled a list of the most common inquiries to provide you with the answers you need to start your real estate journey with confidence.",
          questions: [
            { question: "What is my first step in the home buying process?" },
            { question: "How do I determine the right price for my home?" },
            { question: "Why should I hire a real estate agent?" },
            { question: "What are closing costs?" },
          ],
          bottomText: "Still Got a Question?",
          bottomBtn: "Feel Free to Contact us!",
        },
      },
      {
        componentId: "realestate-blog",
        content: {
          label: "Blogs",
          title: "Real Estate Insights",
          description: "Get the latest market updates, expert tips, and helpful advice to guide your real estate journey.",
          btnText: "View All",
          posts: [
            { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop", category: "News", date: "Sep 21, 2025", postTitle: "Local Market Update" },
            { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", category: "Guides", date: "Sep 21, 2025", postTitle: "Your Guide to Finding a Dream Home" },
            { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", category: "News", date: "Jan 5, 2025", postTitle: "Current State of the Real Estate Market" },
            { image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop", category: "Tips", date: "Dec 1, 2025", postTitle: "Top Tips for Real Estate Success" },
          ],
        },
      },
      {
        componentId: "realestate-footer",
        content: {
          brand: "Dwello",
          tagline: "Real estate made easy",
          email: "hello@dwello.com",
          phone: "+323 323 3232",
          address: "123 Main Street @Capital City,",
          copyright: "\u00A9 2025 Dwello. All rights reserved.",
        },
      },
    ],
  },

  saas: {
    industryId: "saas",
    siteName: "FlowBase",
    tagline: "Automate Your Workflow",
    description: "The all-in-one platform that helps teams ship faster with intelligent automation and seamless collaboration.",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
    paletteId: "midnight",
    fontStyleId: "modern",
    overallFeel: "corporate",
    sections: [
      {
        componentId: "nav-floating",
        content: { brand: "FlowBase", links: ["Features", "Pricing", "Docs", "Blog"], ctaText: "Start Free" },
      },
      {
        componentId: "hero-gradient-modern",
        content: {
          badge: "Now in Public Beta",
          headline: "Automate Your Workflow",
          subheadline: "The all-in-one platform that helps teams ship faster with intelligent automation and seamless collaboration.",
          ctaText: "Get Started Free",
          secondaryCta: "Watch Demo",
          features: [
            { name: "Smart Automation", icon: "\u26A1" },
            { name: "Team Collab", icon: "\uD83D\uDC65" },
            { name: "Analytics", icon: "\uD83D\uDCCA" },
            { name: "Enterprise Security", icon: "\uD83D\uDD12" },
          ],
        },
      },
      {
        componentId: "features-bento",
        content: {
          label: "Features",
          title: "Why Teams Love FlowBase",
          subtitle: "Everything you need to build, ship, and scale \u2014 in one platform.",
          features: [
            { name: "Smart Automation", description: "Automate repetitive tasks and focus on what truly matters.", icon: "\u26A1" },
            { name: "Real-time Collab", description: "Work together seamlessly with your entire team.", icon: "\uD83D\uDC65" },
            { name: "Advanced Analytics", description: "Deep insights to make better decisions, faster.", icon: "\uD83D\uDCCA" },
            { name: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption.", icon: "\uD83D\uDD12" },
            { name: "API First", description: "Integrate with 200+ tools your team already uses.", icon: "\uD83D\uDD17" },
            { name: "24/7 Support", description: "Expert help whenever you need it, day or night.", icon: "\uD83D\uDCAC" },
          ],
        },
      },
      {
        componentId: "pricing-modern",
        content: {
          label: "Pricing",
          title: "Simple, Transparent Pricing",
          subtitle: "Start free. Scale as you grow. No hidden fees.",
          plans: [
            { name: "Starter", price: "Free", period: "", features: ["5 workflows", "2 team members", "1GB storage", "Community support"], ctaText: "Start Free" },
            { name: "Pro", price: "$29", period: "/month", features: ["Unlimited workflows", "10 team members", "50GB storage", "Priority support", "Advanced analytics"], ctaText: "Start Trial" },
            { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Pro", "Unlimited members", "SSO & SAML", "Dedicated support", "Custom integrations"], ctaText: "Contact Sales" },
          ],
        },
      },
      {
        componentId: "testimonials-modern",
        content: {
          label: "Testimonials",
          title: "Trusted by 10,000+ Teams",
          testimonials: [
            { name: "Sarah Chen", role: "CTO, TechStart", quote: "FlowBase cut our deployment time by 60%. It's a game changer for our engineering team.", avatar: "SC" },
            { name: "Mark Rivera", role: "Product Lead", quote: "The automation features alone saved us 20 hours per week. ROI was immediate.", avatar: "MR" },
            { name: "Priya Sharma", role: "VP Engineering", quote: "Best developer experience I've seen. Our team adopted it in days, not weeks.", avatar: "PS" },
          ],
        },
      },
      {
        componentId: "cta-bold",
        content: {
          title: "Ready to Ship Faster?",
          subtitle: "Join thousands of teams already using FlowBase. Free forever plan available.",
          ctaText: "Start Building Free",
        },
      },
      {
        componentId: "footer-mega",
        content: {
          brand: "FlowBase",
          tagline: "Ship faster with intelligent automation.",
          columns: [
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Blog", "Community"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Legal"] },
          ],
          copyright: "2026 FlowBase Inc. All rights reserved.",
        },
      },
    ],
  },

  education: {
    industryId: "education",
    siteName: "Harbor",
    tagline: "Where Knowledge Meets Innovation",
    description: "We are committed to empowering students with world-class education, cutting-edge research opportunities, and an inclusive community.",
    heroImage: "/images/education-hero-bg.png",
    paletteId: "clean",
    fontStyleId: "classic",
    overallFeel: "rich",
    sections: [
      {
        componentId: "edu-nav",
        content: { brand: "Harbor", links: ["About", "Event", "Research", "Contact Us"] },
      },
      {
        componentId: "edu-hero",
        content: {
          titleLine1: "Welcome to",
          titleLine2: "Harbor.",
          description: "We are committed to empowering students with world-class education, cutting-edge research opportunities, and an inclusive community. Whether you're here.",
          ctaText: "Get Started",
          backgroundImage: "/images/education-hero-bg.png",
        },
      },
      {
        componentId: "edu-news",
        content: {
          title: "Campus News.",
          ctaText: "See All News",
          featuredImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=1000&fit=crop",
          featuredTitle: "Mental Health Matters University form Expands Counseling Services.",
          featuredTags: ["Research", "Interviews", "Admission"],
          articles: [
            { image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=400&h=300&fit=crop", title: "Harbor University Research Team Unveils Breakthrough Renewable.", desc: "Harbor University's research team has announced a groundbreaking advancement in renewable.", tags: "Admission,Research" },
            { image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop", title: "Harbor Graduate Launches form Groundbreaking Tech Startup.", desc: "A recent Harbor University graduate has made for the headlines by launching a groundbreaking.", tags: "Admission,Research" },
            { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", title: "Harbor University Celebrates Anniversary with Special.", desc: "Harbor University is proudly celebrating its anniversary, marking a century.", tags: "Admission,Research" },
          ],
        },
      },
      {
        componentId: "edu-programs",
        content: {
          title: "Browse programs by.",
          subtitle: "This user-friendly tool offers options to filter programs by field of study, degree level, and even learning formats like online or on-campus.",
          ctaText: "Explore All",
          programs: ["Computer Science", "Civil Engineering", "Electrical Engineering", "Textile Engineering", "Chemical Engineering", "Mechanical Engineering"],
        },
      },
      {
        componentId: "edu-about",
        content: {
          title: "Where Knowledge Meets Innovation.",
          description: "At Harbor University, we believe in nurturing minds and in for empowering future leaders through world-class education and a commitment to community impact.",
          ctaText: "Get Started Now",
          image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=900&fit=crop",
        },
      },
      {
        componentId: "edu-events",
        content: {
          title: "Upcoming Events.",
          events: [
            { image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&h=800&fit=crop", date: "5 August 2025  5:00 PM", eventTitle: "Global learning opportunities." },
            { image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=800&fit=crop", date: "May 8, 2025  5:00 PM", eventTitle: "Global learning opportunities." },
            { image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=800&fit=crop", date: "Apr 9, 2025  5:00 PM", eventTitle: "Student Films the Stars." },
          ],
        },
      },
      {
        componentId: "edu-stories",
        content: {
          title: "Stories.",
          quote: "Harbor University transformed my academic journey. The are for incredibly in supportive, and the campus atmosphere fosters a true sense of community. The skill I've gained have not only prepared me for my career but also given me confidence for myself. Choosing Harbor was the best decision I've made. The education I received was top-notch.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
          name: "Darlene Robertson",
          role: "CSE Students, Harbor",
          rating: "4.9",
        },
      },
      {
        componentId: "edu-research",
        content: {
          title: "Research & Innovations.",
          papers: [
            { date: "Jan 1, 2025", category: "AI Solutions", paperTitle: "AI driven healthcare diagnostics.", desc: "A study on how artificial intelligence can enhance early detection and diagnosis of diseases, particularly in." },
            { date: "Jan 1, 2024", category: "Health", paperTitle: "Genetic mapping of rare.", desc: "Focused on rural healthcare needs, this study explores how AI can improve the early diagnosis of diseases where access." },
            { date: "Jan 1, 2025", category: "Tech Innovations", paperTitle: "Precision Healthcare via AI.", desc: "This study investigates the application of artificial intelligence to improve early disease detection and diagnosis." },
          ],
        },
      },
      {
        componentId: "edu-cta",
        content: {
          title: "We're here to help you.",
          subtitle: "We're here to help you achieve your goals, overcome challenges and make every step smoother along the way.",
          ctaText: "Get Started",
          backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=700&fit=crop",
        },
      },
      {
        componentId: "edu-footer",
        content: {
          brand: "Harbor",
          description: "Through our collaborative approach and innovative design solutions, we transform visions into reality, blending functionality expression.",
          pagesLinks: ["Home", "About", "Events", "Programs"],
          supportLinks: ["Contact Us", "Privacy Policy", "404"],
          address: "Emily Hattson 940 Goldendale Dr, Wasilla, Alaska 99654, USA",
          copyright: "Copyright 2024 Harbor, Inc. All rights reserved.",
        },
      },
    ],
  },

  photography: {
    industryId: "photography",
    siteName: "Luna Studio",
    tagline: "Moments, Beautifully Captured",
    description: "Fine art and editorial photography that tells your story with emotion, authenticity, and artistry.",
    heroImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop",
    paletteId: "rose",
    fontStyleId: "classic",
    overallFeel: "creative",
    sections: [
      {
        componentId: "nav-transparent",
        content: { brand: "Luna Studio", links: ["Portfolio", "Services", "About", "Contact"] },
      },
      {
        componentId: "hero-fullscreen-modern",
        content: {
          headline: "Moments, Beautifully Captured",
          subheadline: "Fine art and editorial photography that tells your story with emotion, authenticity, and artistry.",
          ctaText: "View Portfolio",
          backgroundImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=900&fit=crop",
          scrollText: "View selected work",
        },
      },
      {
        componentId: "gallery-masonry",
        content: {
          label: "Portfolio",
          title: "Selected Work",
          images: [
            { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop", alt: "Wedding Photography" },
            { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=700&fit=crop", alt: "Fashion Editorial" },
            { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", alt: "Landscape" },
            { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop", alt: "Portrait" },
            { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop", alt: "Concert Photography" },
            { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=700&fit=crop", alt: "Street Fashion" },
          ],
        },
      },
      {
        componentId: "about-modern",
        content: {
          label: "About",
          title: "The Artist Behind",
          accentWord: "the Lens",
          story: "Luna Studio is the creative vision of photographer Maya Luna, whose work has been featured in Vogue, Harper's Bazaar, and National Geographic. With a passion for natural light and candid moments, Maya brings a unique perspective to every shoot.",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop",
          stats: [
            { number: "12+", desc: "Years" },
            { number: "800+", desc: "Shoots" },
            { number: "15", desc: "Publications" },
            { number: "100%", desc: "Satisfaction" },
          ],
        },
      },
      {
        componentId: "cta-bold",
        content: {
          title: "Book a Session",
          subtitle: "Let's create something beautiful together. Available for weddings, editorial, and portraits.",
          ctaText: "Get in Touch",
        },
      },
      {
        componentId: "footer-mega",
        content: {
          brand: "Luna Studio",
          tagline: "Moments, beautifully captured.",
          columns: [
            { title: "Services", links: ["Weddings", "Portraits", "Editorial", "Events"] },
            { title: "Info", links: ["About", "Pricing", "FAQ", "Blog"] },
            { title: "Follow", links: ["Instagram", "Pinterest", "Behance", "500px"] },
          ],
          copyright: "2026 Luna Studio Photography. All rights reserved.",
        },
      },
    ],
  },

  medical: {
    industryId: "medical",
    siteName: "Healis Clinic",
    tagline: "Expert Guidance for Your Health",
    description: "We provide compassionate care and advanced treatments tailored to your needs. Experience convenient access to healthcare.",
    heroImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=500&fit=crop",
    paletteId: "clean",
    fontStyleId: "classic",
    overallFeel: "corporate",
    sections: [
      {
        componentId: "medical-nav",
        content: {
          brand: "Healis",
          links: ["Home", "About us", "Services", "Locations"],
          ctaText: "Login",
        },
      },
      {
        componentId: "medical-hero",
        content: {
          headline: "Healis Clinic",
          badge: "Expert Guidance",
          description: "We provide compassionate care and advanced treatments tailored to your needs. Experience convenient access to healthcare.",
          ctaText: "Explore services",
          image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&h=660&fit=crop&crop=top",
          specialties: ["Cardiology", "Pediatrics", "Dermatology", "Gastroenterology"],
        },
      },
      {
        componentId: "medical-doctor",
        content: {
          label: "Healis Health Solution",
          doctorName: "Dr. Diana Clay",
          doctorTitle: "Lead Cardiologist",
          doctorDesc: "A dedicated cardiologist focused on heart health and patient-centered care.",
          doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=500&h=620&fit=crop&crop=top",
          tag1: "Boston Health Center",
          tag2: "Cardiology",
          achieveTitle: "Professional achievements of our",
          achieveAccent: "specialists",
          achieveDesc: "Our doctors have successfully treated thousands of patients, achieving a remarkable satisfaction rate. Their dedication to research has led to numerous published papers in esteemed medical journals.",
          achieveImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&h=380&fit=crop",
          ctaText: "Book now",
          stats: [
            { number: "95%", desc: "Patient satisfaction rate" },
            { number: "120", desc: "Research papers published" },
          ],
        },
      },
      {
        componentId: "medical-testimonials",
        content: {
          label: "Healis Health Solution",
          title: "What our patients says about",
          accentWord: "Healis",
          reviews: [
            { quote: "The care I received was exceptional, and the staff made me feel at ease throughout my treatment.", reviewer: "James", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
            { quote: "Incredibly professional team. They took the time to explain everything and truly listened to my concerns.", reviewer: "Laura", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
            { quote: "The care I received was exceptional, and the staff made me feel at ease throughout my treatment.", reviewer: "David", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
          ],
        },
      },
      {
        componentId: "medical-about",
        content: {
          label: "Healis Health Solution",
          title: "Your trusted health",
          accentWord: "partner",
          description: "At Healis, we're your trusted health partner. Our experienced team delivers personalized, high-quality care to enhance your well-being and guide you to a healthier life.",
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=660&fit=crop&crop=top",
          ctaText: "Book",
          stats: [
            { number: "17k+", desc: "Satisfied patients" },
            { number: "24", desc: "Expert doctors" },
          ],
        },
      },
      {
        componentId: "medical-team",
        content: {
          label: "Healis Health Solution",
          title: "Our amazing",
          accentWord: "team",
          subtitle: "Meet our dedicated healthcare professionals.",
          members: [
            { name: "Dr. James", role: "Medical Director", desc: "Oversees medical operations and ensures quality patient care.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=top" },
            { name: "Dr. Sarah", role: "Cardiologist", desc: "Specialized in heart disease prevention and treatment.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=500&fit=crop&crop=top" },
            { name: "Dr. Michael", role: "Pediatrician", desc: "Dedicated to children's health and well-being.", image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=500&fit=crop&crop=top" },
          ],
        },
      },
      {
        componentId: "medical-mission",
        content: {
          label: "Healis Health Solution",
          title: "Our mission and core",
          accentWord: "values",
          description: "We are dedicated to providing exceptional patient care while fostering a culture of community involvement and continuous improvement. Our commitment ensures that every patient receives personalized attention and the highest quality of service.",
          image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
          ctaText: "Learn more",
          values: [
            { text: "Putting patients first in everything we do" },
            { text: "Engaging with our community for healthier lives" },
            { text: "Striving for excellence through continuous improvement" },
          ],
        },
      },
      {
        componentId: "medical-footer",
        content: {
          brand: "Healis",
          tagline: "Your trusted health partner, delivering quality care since 2010.",
          columns: [
            { title: "Services", links: ["Cardiology", "Pediatrics", "Dermatology", "Urgent Care"] },
            { title: "Company", links: ["About Us", "Our Team", "Careers", "Blog"] },
            { title: "Contact", links: ["Locations", "Book Online", "Emergency", "Support"] },
          ],
          copyright: "2026 Healis Health. All rights reserved.",
        },
      },
    ],
  },

  nonprofit: {
    industryId: "nonprofit",
    siteName: "Green Future",
    tagline: "Together for a Better Tomorrow",
    description: "Empowering communities through sustainable initiatives, education, and grassroots environmental action.",
    heroImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop",
    paletteId: "forest",
    fontStyleId: "playful",
    overallFeel: "rich",
    sections: [
      {
        componentId: "nav-floating",
        content: { brand: "Green Future", links: ["Mission", "Programs", "Get Involved", "About"], ctaText: "Donate" },
      },
      {
        componentId: "hero-fullscreen-modern",
        content: {
          headline: "Together for a Better Tomorrow",
          subheadline: "Empowering communities through sustainable initiatives, education, and grassroots environmental action.",
          ctaText: "Join the Movement",
          backgroundImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&h=900&fit=crop",
          scrollText: "Learn about our impact",
        },
      },
      {
        componentId: "features-bento",
        content: {
          label: "Our Programs",
          title: "Making Real Impact",
          subtitle: "Community-driven programs that create lasting change.",
          features: [
            { name: "Community Gardens", description: "Building urban gardens that bring neighborhoods together and provide fresh food.", icon: "\uD83C\uDF31" },
            { name: "Youth Education", description: "Teaching the next generation about sustainability and conservation.", icon: "\uD83D\uDCDA" },
            { name: "Clean Water", description: "Bringing clean, safe drinking water to communities in need.", icon: "\uD83D\uDCA7" },
            { name: "Tree Planting", description: "Reforesting degraded areas and planting trees in urban spaces.", icon: "\uD83C\uDF33" },
            { name: "Solar Initiative", description: "Providing renewable energy solutions to underserved communities.", icon: "\u2600\uFE0F" },
            { name: "Wildlife Protection", description: "Conserving natural habitats and protecting endangered species.", icon: "\uD83E\uDD8B" },
          ],
        },
      },
      {
        componentId: "about-modern",
        content: {
          label: "Our Impact",
          title: "A Decade of",
          accentWord: "Real Change",
          story: "Green Future believes that environmental change starts at the community level. Since 2015, we've worked tirelessly across 25 communities to create sustainable, lasting impact through grassroots action and education.",
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=500&fit=crop",
          stats: [
            { number: "50K+", desc: "Trees Planted" },
            { number: "10K+", desc: "Students" },
            { number: "25", desc: "Communities" },
            { number: "100+", desc: "Volunteers" },
          ],
        },
      },
      {
        componentId: "cta-bold",
        content: {
          title: "Make a Difference Today",
          subtitle: "Your support directly funds our programs. Every dollar counts toward building a greener future.",
          ctaText: "Donate Now",
        },
      },
      {
        componentId: "footer-mega",
        content: {
          brand: "Green Future",
          tagline: "Building a sustainable tomorrow, together.",
          columns: [
            { title: "Programs", links: ["Gardens", "Education", "Clean Water", "Tree Planting"] },
            { title: "Get Involved", links: ["Volunteer", "Donate", "Partner", "Events"] },
            { title: "About", links: ["Our Story", "Team", "Annual Report", "Contact"] },
          ],
          copyright: "2026 Green Future Foundation. 501(c)(3) Nonprofit.",
        },
      },
    ],
  },
};

/* ===== HELPER FUNCTIONS ===== */

export function getTemplatePreview(industryId: string): TemplatePreview | undefined {
  return TEMPLATE_PREVIEWS[industryId];
}

export function getPreviewTheme(industryId: string): ThemeConfig | undefined {
  const preview = TEMPLATE_PREVIEWS[industryId];
  if (!preview) return undefined;

  const palette = COLOR_PALETTES.find((p) => p.id === preview.paletteId);
  const font = FONT_STYLES.find((f) => f.id === preview.fontStyleId);

  if (!palette || !font) return undefined;

  return {
    primary: palette.colors.primary,
    secondary: palette.colors.secondary,
    accent: palette.colors.accent,
    bg: palette.colors.bg,
    text: palette.colors.text,
    fontHeading: font.fonts.heading,
    fontBody: font.fonts.body,
  };
}

export function getAllTemplatePreviews(): TemplatePreview[] {
  return Object.values(TEMPLATE_PREVIEWS);
}

export { TEMPLATE_PREVIEWS };
