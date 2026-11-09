import { supabase } from '@/lib/supabase';
import type { LeadKind } from '@/types/content';

export interface LeadInput {
  kind: LeadKind;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  teamSize?: number;
  message?: string;
  courseId?: string;
  workshopId?: string;
}

export const BD_PHONE_PATTERN = /^(\+?880|0)1[3-9]\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, '');
}

export function isValidPhone(value: string): boolean {
  return BD_PHONE_PATTERN.test(normalizePhone(value));
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export async function submitLead(input: LeadInput): Promise<void> {
  const { error } = await supabase.from('leads').insert({
    kind: input.kind,
    name: input.name.trim(),
    phone: normalizePhone(input.phone),
    email: input.email?.trim() || null,
    company: input.company?.trim() || null,
    team_size: input.teamSize ?? null,
    message: input.message?.trim() || null,
    course_id: input.courseId ?? null,
    workshop_id: input.workshopId ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
