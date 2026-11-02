// Placeholder types until `supabase gen types typescript --local` is run.
// Run `pnpm exec supabase gen types typescript --local > lib/db/types.ts` after `supabase start`.

export type Database = {
  public: {
    Tables: {
      agencies: {
        Row: {
          id: string;
          name: string;
          website: string | null;
          permission_status: "pending" | "approved" | "denied";
          attribution_text: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          website?: string | null;
          permission_status?: "pending" | "approved" | "denied";
          attribution_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          name?: string;
          website?: string | null;
          permission_status?: "pending" | "approved" | "denied";
          attribution_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      data_sources: {
        Row: {
          id: string;
          agency_id: string | null;
          kind: "demo" | "csv" | "approved_feed" | "manual" | "official" | "editorial";
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          agency_id?: string | null;
          kind: "demo" | "csv" | "approved_feed" | "manual" | "official" | "editorial";
          name: string;
          created_at?: string;
        };        Update: {
          id?: string;
          agency_id?: string | null;
          kind?: "demo" | "csv" | "approved_feed" | "manual" | "official" | "editorial";
          name?: string;
          created_at?: string;
        };
        Relationships: [];      };
      properties: {
        Row: {
          id: string;
          slug: string;
          address: string;
          postcode: string;
          point: unknown | null;
          building_type: "detached" | "semi_detached" | "terraced" | "flat" | "bungalow" | "cottage" | "maisonette" | "other" | null;
          beds: number | null;
          baths: number | null;
          tenure: "freehold" | "leasehold" | "share_of_freehold" | "commonhold" | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          address: string;
          postcode: string;
          point?: unknown | null;
          building_type?: "detached" | "semi_detached" | "terraced" | "flat" | "bungalow" | "cottage" | "maisonette" | "other" | null;
          beds?: number | null;
          baths?: number | null;
          tenure?: "freehold" | "leasehold" | "share_of_freehold" | "commonhold" | null;
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          slug?: string;
          address?: string;
          postcode?: string;
          point?: unknown | null;
          building_type?: "detached" | "semi_detached" | "terraced" | "flat" | "bungalow" | "cottage" | "maisonette" | "other" | null;
          beds?: number | null;
          baths?: number | null;
          tenure?: "freehold" | "leasehold" | "share_of_freehold" | "commonhold" | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      listings: {
        Row: {
          id: string;
          property_id: string;
          agency_id: string | null;
          source_id: string | null;
          external_id: string | null;
          asking_price_gbp: number | null;
          status: "live" | "under_offer" | "sold_stc" | "sold" | "withdrawn" | "expired";
          approval_status: "pending" | "approved" | "rejected";
          listed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          agency_id?: string | null;
          source_id?: string | null;
          external_id?: string | null;
          asking_price_gbp?: number | null;
          status?: "live" | "under_offer" | "sold_stc" | "sold" | "withdrawn" | "expired";
          approval_status?: "pending" | "approved" | "rejected";
          listed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          property_id?: string;
          agency_id?: string | null;
          source_id?: string | null;
          external_id?: string | null;
          asking_price_gbp?: number | null;
          status?: "live" | "under_offer" | "sold_stc" | "sold" | "withdrawn" | "expired";
          approval_status?: "pending" | "approved" | "rejected";
          listed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      listing_images: {
        Row: {
          id: string;
          listing_id: string;
          source_url: string;
          rights_scope: string | null;
          sort_order: number;
          alt: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          source_url: string;
          rights_scope?: string | null;
          sort_order?: number;
          alt?: string | null;
          created_at?: string;
        };        Update: {
          id?: string;
          listing_id?: string;
          source_url?: string;
          rights_scope?: string | null;
          sort_order?: number;
          alt?: string | null;
          created_at?: string;
        };
        Relationships: [];      };
      listing_events: {
        Row: {
          id: string;
          listing_id: string;
          kind: "created" | "price_changed" | "status_changed" | "updated" | "withdrawn";
          before_json: Record<string, unknown> | null;
          after_json: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          kind: "created" | "price_changed" | "status_changed" | "updated" | "withdrawn";
          before_json?: Record<string, unknown> | null;
          after_json?: Record<string, unknown> | null;
          created_at?: string;
        };        Update: {
          id?: string;
          listing_id?: string;
          kind?: "created" | "price_changed" | "status_changed" | "updated" | "withdrawn";
          before_json?: Record<string, unknown> | null;
          after_json?: Record<string, unknown> | null;
          created_at?: string;
        };
        Relationships: [];      };
      places: {
        Row: {
          id: string;
          slug: string;
          name: string;
          type: "town" | "village" | "neighbourhood" | "hamlet";
          boundary_geom: unknown | null;
          centroid: unknown | null;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          type: "town" | "village" | "neighbourhood" | "hamlet";
          boundary_geom?: unknown | null;
          centroid?: unknown | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          slug?: string;
          name?: string;
          type?: "town" | "village" | "neighbourhood" | "hamlet";
          boundary_geom?: unknown | null;
          centroid?: unknown | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      place_guides: {
        Row: {
          id: string;
          place_id: string;
          sections_json: Record<string, unknown>[];
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          place_id: string;
          sections_json?: Record<string, unknown>[];
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          place_id?: string;
          sections_json?: Record<string, unknown>[];
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      poi: {
        Row: {
          id: string;
          point: unknown;
          name: string;
          kind: string;
          source_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          point: unknown;
          name: string;
          kind: string;
          source_id?: string | null;
          created_at?: string;
        };        Update: {
          id?: string;
          point?: unknown;
          name?: string;
          kind?: string;
          source_id?: string | null;
          created_at?: string;
        };
        Relationships: [];      };
      insights: {
        Row: {
          id: string;
          body: string;
          category: "transport" | "schools" | "lifestyle" | "market" | "environment" | "community";
          relationship_type: "property" | "place" | "listing";
          target_id: string;
          verification: "unverified" | "ai_generated" | "editor_reviewed" | "verified";
          visibility: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          body: string;
          category: "transport" | "schools" | "lifestyle" | "market" | "environment" | "community";
          relationship_type: "property" | "place" | "listing";
          target_id: string;
          verification?: "unverified" | "ai_generated" | "editor_reviewed" | "verified";
          visibility?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          body?: string;
          category?: "transport" | "schools" | "lifestyle" | "market" | "environment" | "community";
          relationship_type?: "property" | "place" | "listing";
          target_id?: string;
          verification?: "unverified" | "ai_generated" | "editor_reviewed" | "verified";
          visibility?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      facts: {
        Row: {
          id: string;
          property_id: string | null;
          place_id: string | null;
          field_key: string;
          value_json: unknown;
          confidence_kind: "official" | "estimated" | "ai_inferred" | "user_reported";
          provenance_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          place_id?: string | null;
          field_key: string;
          value_json: unknown;
          confidence_kind?: "official" | "estimated" | "ai_inferred" | "user_reported";
          provenance_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };        Update: {
          id?: string;
          property_id?: string | null;
          place_id?: string | null;
          field_key?: string;
          value_json?: unknown;
          confidence_kind?: "official" | "estimated" | "ai_inferred" | "user_reported";
          provenance_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      saved_properties: {
        Row: {
          user_id: string;
          property_id: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          property_id: string;
          note?: string | null;
          created_at?: string;
        };        Update: {
          user_id?: string;
          property_id?: string;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];      };
      saved_searches: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          filter_json: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          filter_json?: Record<string, unknown>;
          created_at?: string;
        };        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          filter_json?: Record<string, unknown>;
          created_at?: string;
        };
        Relationships: [];      };
      user_preferences: {
        Row: {
          user_id: string;
          preferences_json: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          preferences_json?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };        Update: {
          user_id?: string;
          preferences_json?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];      };
      import_runs: {
        Row: {
          id: string;
          source_id: string | null;
          outcome: "pending" | "completed" | "failed" | "partial";
          rows_total: number;
          rows_inserted: number;
          rows_updated: number;
          rows_skipped: number;
          rows_rejected: number;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          source_id?: string | null;
          outcome?: "pending" | "completed" | "failed" | "partial";
          rows_total?: number;
          rows_inserted?: number;
          rows_updated?: number;
          rows_skipped?: number;
          rows_rejected?: number;
          created_at?: string;
          completed_at?: string | null;
        };        Update: {
          id?: string;
          source_id?: string | null;
          outcome?: "pending" | "completed" | "failed" | "partial";
          rows_total?: number;
          rows_inserted?: number;
          rows_updated?: number;
          rows_skipped?: number;
          rows_rejected?: number;
          created_at?: string;
          completed_at?: string | null;
        };
        Relationships: [];      };
      import_rows: {
        Row: {
          id: string;
          import_run_id: string;
          external_id: string | null;
          raw_json: Record<string, unknown> | null;
          validation_errors: Record<string, unknown> | null;
          action: "inserted" | "updated" | "skipped" | "rejected" | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          import_run_id: string;
          external_id?: string | null;
          raw_json?: Record<string, unknown> | null;
          validation_errors?: Record<string, unknown> | null;
          action?: "inserted" | "updated" | "skipped" | "rejected" | null;
          created_at?: string;
        };        Update: {
          id?: string;
          import_run_id?: string;
          external_id?: string | null;
          raw_json?: Record<string, unknown> | null;
          validation_errors?: Record<string, unknown> | null;
          action?: "inserted" | "updated" | "skipped" | "rejected" | null;
          created_at?: string;
        };
        Relationships: [];      };
      audit_log: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          entity: string;
          entity_id: string | null;
          before_json: Record<string, unknown> | null;
          after_json: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          entity: string;
          entity_id?: string | null;
          before_json?: Record<string, unknown> | null;
          after_json?: Record<string, unknown> | null;
          created_at?: string;
        };        Update: {
          id?: string;
          actor_id?: string | null;
          action?: string;
          entity?: string;
          entity_id?: string | null;
          before_json?: Record<string, unknown> | null;
          after_json?: Record<string, unknown> | null;
          created_at?: string;
        };
        Relationships: [];      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      permission_status: "pending" | "approved" | "denied";
      data_source_kind: "demo" | "csv" | "approved_feed" | "manual" | "official" | "editorial";
      building_type: "detached" | "semi_detached" | "terraced" | "flat" | "bungalow" | "cottage" | "maisonette" | "other";
      tenure_type: "freehold" | "leasehold" | "share_of_freehold" | "commonhold";
      listing_status: "live" | "under_offer" | "sold_stc" | "sold" | "withdrawn" | "expired";
      approval_status: "pending" | "approved" | "rejected";
      listing_event_kind: "created" | "price_changed" | "status_changed" | "updated" | "withdrawn";
      place_type: "town" | "village" | "neighbourhood" | "hamlet";
      place_status: "draft" | "published" | "archived";
      insight_category: "transport" | "schools" | "lifestyle" | "market" | "environment" | "community";
      insight_relationship: "property" | "place" | "listing";
      verification_status: "unverified" | "ai_generated" | "editor_reviewed" | "verified";
      visibility_status: "draft" | "published" | "archived";
      confidence_kind: "official" | "estimated" | "ai_inferred" | "user_reported";
      import_outcome: "pending" | "completed" | "failed" | "partial";
      import_row_action: "inserted" | "updated" | "skipped" | "rejected";
    };
  };
};
