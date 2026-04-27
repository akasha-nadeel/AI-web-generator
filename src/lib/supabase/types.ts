export type CreditTransactionType =
  | "signup_bonus"
  | "pack_purchase"
  | "generation"
  | "refund"
  | "admin_grant";

export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: {
      deduct_credits_atomic: {
        Args: {
          p_user_id: string;
          p_amount: number;
          p_type: CreditTransactionType;
          p_metadata?: Record<string, unknown>;
        };
        Returns: {
          success: boolean;
          new_balance?: number;
          reason?: string;
          balance?: number;
        };
      };
      add_credits_atomic: {
        Args: {
          p_user_id: string;
          p_amount: number;
          p_type: CreditTransactionType;
          p_metadata?: Record<string, unknown>;
        };
        Returns: {
          success: boolean;
          new_balance?: number;
          reason?: string;
        };
      };
      increment_site_bandwidth: {
        Args: {
          p_site_id: string;
          p_bytes: number;
        };
        Returns: {
          success: boolean;
          used_bytes?: number;
          reset_at?: string;
          reason?: string;
        };
      };
    };
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          name: string | null;
          plan: "free" | "pro" | "business";
          credits_remaining: number;
          has_ever_paid: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          name?: string | null;
          plan?: "free" | "pro" | "business";
          credits_remaining?: number;
          has_ever_paid?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          name?: string | null;
          plan?: "free" | "pro" | "business";
          credits_remaining?: number;
          has_ever_paid?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: CreditTransactionType;
          balance_after: number;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          type: CreditTransactionType;
          balance_after: number;
          metadata?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          type?: CreditTransactionType;
          balance_after?: number;
          metadata?: Record<string, unknown>;
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
          subdomain: string | null;
          published_at: string | null;
          bandwidth_used_bytes: number;
          bandwidth_reset_at: string;
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
          subdomain?: string | null;
          published_at?: string | null;
          bandwidth_used_bytes?: number;
          bandwidth_reset_at?: string;
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
          subdomain?: string | null;
          published_at?: string | null;
          bandwidth_used_bytes?: number;
          bandwidth_reset_at?: string;
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
      site_versions: {
        Row: {
          id: string;
          site_id: string;
          user_id: string;
          site_json: Record<string, unknown>;
          source: string;
          summary: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          site_id: string;
          user_id: string;
          site_json: Record<string, unknown>;
          source?: string;
          summary?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          site_id?: string;
          user_id?: string;
          site_json?: Record<string, unknown>;
          source?: string;
          summary?: string | null;
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
      exports_log: {
        Row: {
          id: string;
          user_id: string;
          project_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          project_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          project_id?: string;
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
