import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { isValidEmail, isValidPhone, submitLead, type LeadInput } from '@/lib/leads';
import type { LeadKind } from '@/types/content';

interface LeadFormProps {
  kind: LeadKind;
  courseId?: string;
  workshopId?: string;
  withCompany?: boolean;
  submitLabel: string;
  successMessage: string;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
}

const EMPTY_VALUES: FormValues = {
  name: '',
  phone: '',
  email: '',
  company: '',
  teamSize: '',
  message: '',
};

const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/70 transition focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100';

export function LeadForm({
  kind,
  courseId,
  workshopId,
  withCompany = false,
  submitLabel,
  successMessage,
}: LeadFormProps) {
  const { pick } = useLanguage();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const update = (field: keyof FormValues) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const validate = (): Partial<Record<keyof FormValues, string>> => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (values.name.trim().length < 2) {
      next.name = pick('অনুগ্রহ করে আপনার নাম লিখুন', 'Please enter your name');
    }
    if (!isValidPhone(values.phone)) {
      next.phone = pick(
        'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন 01XXXXXXXXX)',
        'Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX)',
      );
    }
    if (values.email.trim() && !isValidEmail(values.email)) {
      next.email = pick('সঠিক ইমেইল দিন', 'Enter a valid email address');
    }
    if (withCompany) {
      if (values.company.trim().length < 2) {
        next.company = pick('কোম্পানির নাম লিখুন', 'Enter your company name');
      }
      const teamSize = Number(values.teamSize);
      if (!Number.isInteger(teamSize) || teamSize < 1) {
        next.teamSize = pick('টিমের সদস্য সংখ্যা লিখুন', 'Enter your team size');
      }
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const input: LeadInput = {
      kind,
      name: values.name,
      phone: values.phone,
      email: values.email,
      courseId,
      workshopId,
      company: withCompany ? values.company : undefined,
      teamSize: withCompany ? Number(values.teamSize) : undefined,
      message: withCompany ? values.message : undefined,
    };

    setStatus('submitting');
    try {
      await submitLead(input);
      setStatus('success');
      setValues(EMPTY_VALUES);
    } catch (error: unknown) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-success-600" />
        <p className="text-lg font-bold text-ink">{successMessage}</p>
        <p className="text-sm text-ink-muted">
          {pick(
            'আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
            'Our team will contact you shortly.',
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field
        label={pick('আপনার নাম', 'Full name')}
        error={errors.name}
        className="sm:col-span-1"
      >
        <input
          className={inputClass}
          value={values.name}
          onChange={update('name')}
          autoComplete="name"
          maxLength={120}
        />
      </Field>
      <Field label={pick('মোবাইল নম্বর', 'Mobile number')} error={errors.phone}>
        <input
          className={inputClass}
          value={values.phone}
          onChange={update('phone')}
          inputMode="tel"
          autoComplete="tel"
          placeholder="01XXXXXXXXX"
        />
      </Field>
      <Field
        label={pick('ইমেইল (ঐচ্ছিক)', 'Email (optional)')}
        error={errors.email}
        className="sm:col-span-2"
      >
        <input
          className={inputClass}
          value={values.email}
          onChange={update('email')}
          type="email"
          autoComplete="email"
        />
      </Field>

      {withCompany && (
        <>
          <Field label={pick('কোম্পানির নাম', 'Company name')} error={errors.company}>
            <input className={inputClass} value={values.company} onChange={update('company')} />
          </Field>
          <Field label={pick('টিমের সদস্য সংখ্যা', 'Team size')} error={errors.teamSize}>
            <input
              className={inputClass}
              value={values.teamSize}
              onChange={update('teamSize')}
              inputMode="numeric"
            />
          </Field>
          <Field
            label={pick('প্রয়োজনীয়তা', 'Your training needs')}
            className="sm:col-span-2"
          >
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              value={values.message}
              onChange={update('message')}
              maxLength={2000}
            />
          </Field>
        </>
      )}

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-danger-50 px-4 py-3 text-sm text-danger-600 sm:col-span-2">
          {pick(
            'অনুরোধটি পাঠানো যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
            'We could not send your request. Please try again in a moment.',
          )}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' && <Loader2 className="h-5 w-5 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  className = '',
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="text-sm text-danger-600">{error}</span>}
    </label>
  );
}
