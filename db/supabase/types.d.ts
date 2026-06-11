export type Database = {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: number;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: never;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: never;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      navigation_category: {
        Row: {
          create_by: number;
          create_time: string;
          del_flag: number;
          id: number;
          name: string;
          sort: number;
          title: string;
        };
        Insert: {
          create_by?: number | null;
          create_time?: string;
          del_flag?: number | null;
          id?: never;
          name: string;
          sort?: number | null;
          title?: string | null;
        };
        Update: {
          create_by?: number | null;
          create_time?: string;
          del_flag?: number | null;
          id?: never;
          name?: string;
          sort?: number | null;
          title?: string | null;
        };
        Relationships: [];
      };
      submit: {
        Row: {
          id: number;
          created_at: string;
          name: string | null;
          url: string | null;
          tag: string | null;
          description: string | null;
          email: string | null;
        };
        Insert: {
          id?: never;
          created_at?: string;
          name?: string | null;
          url?: string | null;
          tag?: string | null;
          description?: string | null;
          email?: string | null;
        };
        Update: {
          id?: never;
          created_at?: string;
          name?: string | null;
          url?: string | null;
          tag?: string | null;
          description?: string | null;
          email?: string | null;
        };
        Relationships: [];
      };
      web_navigation: {
        Row: {
          category_name: string;
          collection_time: string;
          content: string;
          detail: string;
          id: number;
          image_url: string;
          name: string;
          star_rating: number;
          tag_name: string;
          thumbnail_url: string;
          title: string;
          url: string;
          website_data: string;
          featured: boolean; // 更新：添加 featured 属性
          alternatives: string; // 更新
          alternatives_array: number[]; // 更新
          usecase: string; // 更新
        };
        Insert: {
          category_name?: string | null;
          collection_time?: string | null;
          content?: string | null;
          detail?: string | null;
          id?: number;
          image_url?: string | null;
          name: string;
          star_rating?: number | null;
          tag_name?: string | null;
          thumbnail_url?: string | null;
          title?: string | null;
          url?: string | null;
          website_data?: string | null;
          featured?: boolean | null; // 更新：添加 featured 属性
          alternatives: string; // 更新
          usecase: string; // 更新
        };
        Update: {
          category_name?: string | null;
          collection_time?: string | null;
          content?: string | null;
          detail?: string | null;
          id?: number;
          image_url?: string | null;
          name?: string;
          star_rating?: number | null;
          tag_name?: string | null;
          thumbnail_url?: string | null;
          title?: string | null;
          url?: string | null;
          website_data?: string | null;
          featured?: boolean | null; // 更新：添加 featured 属性
          alternatives: string | null; // 更新
          usecase: string; // 更新
        };
        Relationships: [];
      };
      usecase: {
        Row: {
          id: number;
          name: string;
          icon: string;
          category_name: string;
        };
        Insert: {
          id?: number;
          name: string;
          icon: string;
          category_name: string;
        };
        Update: {
          id?: number;
          name?: string;
          icon?: string;
          category_name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type NavigationCategory = Database['public']['Tables']['navigation_category']['Row'];
export type Submit = Database['public']['Tables']['submit']['Row'];
export type WebNavigation = Database['public']['Tables']['web_navigation']['Row'];
export type Usecase = Database['public']['Tables']['usecase']['Row'];
