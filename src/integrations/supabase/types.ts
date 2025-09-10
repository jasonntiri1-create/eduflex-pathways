export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookmarks: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          application_deadline: string | null
          city: string
          country: string
          created_at: string
          degree_level: Database["public"]["Enums"]["degree_level"]
          description: string | null
          direct_entry_available: boolean | null
          discipline: string
          duration_months: number | null
          entry_requirements: string[] | null
          id: string
          intake_month: number | null
          is_premium: boolean | null
          language: string | null
          qs_ranking: number | null
          rating: number | null
          scholarship_available: boolean | null
          title: string
          tuition_amount: number | null
          tuition_currency: string | null
          university: string
          university_logo_url: string | null
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          city: string
          country: string
          created_at?: string
          degree_level: Database["public"]["Enums"]["degree_level"]
          description?: string | null
          direct_entry_available?: boolean | null
          discipline: string
          duration_months?: number | null
          entry_requirements?: string[] | null
          id?: string
          intake_month?: number | null
          is_premium?: boolean | null
          language?: string | null
          qs_ranking?: number | null
          rating?: number | null
          scholarship_available?: boolean | null
          title: string
          tuition_amount?: number | null
          tuition_currency?: string | null
          university: string
          university_logo_url?: string | null
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          city?: string
          country?: string
          created_at?: string
          degree_level?: Database["public"]["Enums"]["degree_level"]
          description?: string | null
          direct_entry_available?: boolean | null
          discipline?: string
          duration_months?: number | null
          entry_requirements?: string[] | null
          id?: string
          intake_month?: number | null
          is_premium?: boolean | null
          language?: string | null
          qs_ranking?: number | null
          rating?: number | null
          scholarship_available?: boolean | null
          title?: string
          tuition_amount?: number | null
          tuition_currency?: string | null
          university?: string
          university_logo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      github_projects: {
        Row: {
          created_at: string
          demo_url: string | null
          description: string | null
          github_repo_url: string
          id: string
          is_expo_project: boolean | null
          is_featured: boolean | null
          project_name: string
          star_count: number | null
          tech_stack: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          demo_url?: string | null
          description?: string | null
          github_repo_url: string
          id?: string
          is_expo_project?: boolean | null
          is_featured?: boolean | null
          project_name: string
          star_count?: number | null
          tech_stack?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          demo_url?: string | null
          description?: string | null
          github_repo_url?: string
          id?: string
          is_expo_project?: boolean | null
          is_featured?: boolean | null
          project_name?: string
          star_count?: number | null
          tech_stack?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          current_streak: number | null
          full_name: string | null
          github_username: string | null
          id: string
          is_public_profile: boolean | null
          last_login_at: string | null
          latitude: number | null
          linkedin_url: string | null
          longitude: number | null
          referral_code: string | null
          referred_by_code: string | null
          stripe_customer_id: string | null
          subscription_status: Database["public"]["Enums"]["subscription_status"]
          tier: Database["public"]["Enums"]["user_tier"]
          total_xp: number | null
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          current_streak?: number | null
          full_name?: string | null
          github_username?: string | null
          id?: string
          is_public_profile?: boolean | null
          last_login_at?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          longitude?: number | null
          referral_code?: string | null
          referred_by_code?: string | null
          stripe_customer_id?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["user_tier"]
          total_xp?: number | null
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          current_streak?: number | null
          full_name?: string | null
          github_username?: string | null
          id?: string
          is_public_profile?: boolean | null
          last_login_at?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          longitude?: number | null
          referral_code?: string | null
          referred_by_code?: string | null
          stripe_customer_id?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["user_tier"]
          total_xp?: number | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          invitee_email: string | null
          invitee_id: string | null
          is_completed: boolean | null
          referral_code: string
          referrer_id: string
          reward_type: string | null
          reward_value: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          invitee_email?: string | null
          invitee_id?: string | null
          is_completed?: boolean | null
          referral_code: string
          referrer_id: string
          reward_type?: string | null
          reward_value?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          invitee_email?: string | null
          invitee_id?: string | null
          is_completed?: boolean | null
          referral_code?: string
          referrer_id?: string
          reward_type?: string | null
          reward_value?: number | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          created_at: string
          email: string | null
          id: string
          message: string
          status: Database["public"]["Enums"]["support_ticket_status"]
          subject: string
          type: Database["public"]["Enums"]["support_ticket_type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message: string
          status?: Database["public"]["Enums"]["support_ticket_status"]
          subject: string
          type: Database["public"]["Enums"]["support_ticket_type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          status?: Database["public"]["Enums"]["support_ticket_status"]
          subject?: string
          type?: Database["public"]["Enums"]["support_ticket_type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          country: string | null
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
          user_tier: Database["public"]["Enums"]["user_tier"] | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
          user_tier?: Database["public"]["Enums"]["user_tier"] | null
        }
        Update: {
          country?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
          user_tier?: Database["public"]["Enums"]["user_tier"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tier: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_tier"]
      }
      has_premium_access: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      degree_level:
        | "bachelor"
        | "master"
        | "phd"
        | "diploma"
        | "certificate"
        | "foundation"
      subscription_status: "inactive" | "active" | "trial" | "cancelled"
      support_ticket_status: "open" | "in_progress" | "resolved" | "closed"
      support_ticket_type:
        | "bug_report"
        | "feature_request"
        | "billing"
        | "general"
        | "feedback"
      user_tier: "guest" | "free" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      degree_level: [
        "bachelor",
        "master",
        "phd",
        "diploma",
        "certificate",
        "foundation",
      ],
      subscription_status: ["inactive", "active", "trial", "cancelled"],
      support_ticket_status: ["open", "in_progress", "resolved", "closed"],
      support_ticket_type: [
        "bug_report",
        "feature_request",
        "billing",
        "general",
        "feedback",
      ],
      user_tier: ["guest", "free", "premium"],
    },
  },
} as const
