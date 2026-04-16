export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          name: string | null;
          plan: "free" | "pro" | "business";
          credits_remaining: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          name?: string | null;
          plan?: "free" | "pro" | "business";
          credits_remaining?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          name?: string | null;
          plan?: "free" | "pro" | "business";
          credits_remaining?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      sites: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          industry: string | null;
          theme_json: Record<string, unknown>;
          site_json: Record<string, unknown> | null;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          industry?: string | null;
          theme_json?: Record<string, unknown>;
          site_json?: Record<string, unknown> | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          industry?: string | null;
          theme_json?: Record<string, unknown>;
          site_json?: Record<string, unknown> | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      pages: {
        Row: {
          id: string;
          site_id: string;
          name: string;
          slug: string;
          sections_json: Record<string, unknown>[];
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          site_id: string;
          name: string;
          slug: string;
          sections_json?: Record<string, unknown>[];
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          site_id?: string;
          name?: string;
          slug?: string;
          sections_json?: Record<string, unknown>[];
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      generations: {
        Row: {
          id: string;
          site_id: string;
          user_id: string;
          prompt_summary: string | null;
          result_json: Record<string, unknown> | null;
          model: string | null;
          cost_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          site_id: string;
          user_id: string;
          prompt_summary?: string | null;
          result_json?: Record<string, unknown> | null;
          model?: string | null;
          cost_cents?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          site_id?: string;
          user_id?: string;
          prompt_summary?: string | null;
          result_json?: Record<string, unknown> | null;
          model?: string | null;
          cost_cents?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      uploads: {
        Row: {
          id: string;
          user_id: string;
          file_url: string;
          file_type: string | null;
          original_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_url: string;
          file_type?: string | null;
          original_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_url?: string;
          file_type?: string | null;
          original_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: string;
          status: string;
          current_period_end: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: string;
          status?: string;
          current_period_end?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: string;
          status?: string;
          current_period_end?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      design_patterns: {
        Row: {
          id: string;
          name: string;
          industries: string[];
          moods: string[];
          color_mode: string;
          brief_json: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          industries: string[];
          moods: string[];
          color_mode?: string;
          brief_json: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          industries?: string[];
          moods?: string[];
          color_mode?: string;
          brief_json?: Record<string, unknown>;
          created_at?: string;
        };
        Relationships: [];
      };
    };
  };
}
