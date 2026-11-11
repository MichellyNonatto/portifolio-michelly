import { supabase } from "@/infrastructure/supabase/client";
import type {
  ShowcaseExperience,
  ShowcaseCertification,
  ProjectSummaryDbRow,
  ExperienceDbRow,
  CertificationDbRow,
  SkillDbRow,
  SkillTrack,
  SkillTrackDbRow,
} from "../models/showcase.model";

export class SupabaseShowcaseRepository {
  async getPublishedProjects(): Promise<ProjectSummaryDbRow[]> {
    const { data, error } = await supabase
      .from("project_summaries")
      .select("id, repository_owner, repository_name, summary_en, summary_pt");

    if (error) {
      throw new Error(`Failed to fetch project_summaries: ${error.message}`);
    }

    return (data as ProjectSummaryDbRow[]) || [];
  }

  async getExperiences(): Promise<ShowcaseExperience[]> {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch experiences: ${error.message}`);
    }

    if (!data) return [];

    return (data as ExperienceDbRow[]).map((row) => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      startDate: row.start_date,
      endDate: row.end_date,
      description: row.description,
      isCurrent: row.is_current,
      createdAt: row.created_at,
    }));
  }

  async getCertifications(): Promise<ShowcaseCertification[]> {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("issue_date", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch certifications: ${error.message}`);
    }

    if (!data) return [];

    return (data as CertificationDbRow[]).map((row) => ({
      id: row.id,
      title: row.title,
      issuer: row.issuer,
      issueDate: row.issue_date,
      credentialUrl: row.credential_url,
      isAcademic: Boolean(row.is_academic),
      createdAt: row.created_at,
    }));
  }

  async getSkillTracks(): Promise<SkillTrack[]> {
    const [{ data: tracks, error: tracksError }, { data: skills, error: skillsError }] =
      await Promise.all([
        supabase
          .from("skill_tracks")
          .select("id, slug, name, icon, sort_order")
          .order("sort_order", { ascending: true }),
        supabase
          .from("skills")
          .select("id, track_id, name, sort_order")
          .order("sort_order", { ascending: true }),
      ]);

    if (tracksError) {
      throw new Error(`Failed to fetch skill_tracks: ${tracksError.message}`);
    }
    if (skillsError) {
      throw new Error(`Failed to fetch skills: ${skillsError.message}`);
    }

    const skillsByTrack = new Map<string, string[]>();
    for (const skill of (skills as SkillDbRow[]) || []) {
      const trackSkills = skillsByTrack.get(skill.track_id) || [];
      trackSkills.push(skill.name);
      skillsByTrack.set(skill.track_id, trackSkills);
    }

    return ((tracks as SkillTrackDbRow[]) || []).map((track) => ({
      id: track.id,
      slug: track.slug,
      name: track.name,
      icon: track.icon,
      skills: skillsByTrack.get(track.id) || [],
    }));
  }
}

export const supabaseShowcaseRepository = new SupabaseShowcaseRepository();
