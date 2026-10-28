import { supabase } from "@/infrastructure/supabase/client";
import type { ShowcaseProject } from "../models/showcase.model";

export class SupabaseShowcaseRepository {
  async getPublishedProjects(): Promise<ShowcaseProject[]> {
    const { data, error } = await supabase
      .from("project_summaries")
      .select("*")
      .order("stars_count", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch project_summaries: ${error.message}`);
    }

    return (data as ShowcaseProject[]) || [];
  }
}

export const supabaseShowcaseRepository = new SupabaseShowcaseRepository();
