import { BarChart3, Building2, Settings2, Users } from 'lucide-react';
import { LeadForm } from '@/components/leads/LeadForm';
import { useLanguage } from '@/hooks/useLanguage';

const BENEFITS = [
  {
    icon: Users,
    bn: 'টিমের দক্ষতা উন্নয়ন',
    en: 'Upskill your whole team',
    descBn: 'আপনার কর্মীদের জন্য ব্যবহারিক, ইন্ডাস্ট্রি-ভিত্তিক প্রশিক্ষণ।',
    descEn: 'Practical, industry-based training for your staff.',
  },
  {
    icon: Settings2,
    bn: 'কাস্টম প্রশিক্ষণ সমাধান',
    en: 'Custom training solutions',
    descBn: 'আপনার প্রয়োজন অনুযায়ী সিলেবাস ও সময়সূচি।',
    descEn: 'Syllabus and schedule shaped around your needs.',
  },
  {
    icon: BarChart3,
    bn: 'পারফরম্যান্স ট্র্যাকিং',
    en: 'Track performance',
    descBn: 'অগ্রগতি ও ফলাফলের পরিষ্কার রিপোর্ট।',
    descEn: 'Clear reports on progress and outcomes.',
  },
];

export function CorporateSection() {
  const { pick } = useLanguage();
  return (
    <section id="corporate" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-700">
              {pick('কর্পোরেট ট্রেনিং', 'Corporate training')}
            </p>
            <h2 className="section-title">
              {pick('আপনার টিমকে তৈরি করুন ভবিষ্যতের জন্য', 'Prepare your team for what comes next')}
            </h2>
            <p className="mt-3 text-base leading-normal text-ink-muted">
              {pick(
                'আপনার ব্যবসার চাহিদা অনুযায়ী প্রশিক্ষণ নিন। আমরা আপনার টিমের সাথে বসে একটি পরিকল্পনা সাজিয়ে দেব।',
                'Get training built around your business. We will work with your team to design a plan.',
              )}
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit.en} className="card flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{pick(benefit.bn, benefit.en)}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{pick(benefit.descBn, benefit.descEn)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Building2 className="h-6 w-6 text-primary-700" />
            <h3 className="text-xl font-bold text-ink">
              {pick('প্রস্তাবের জন্য অনুরোধ করুন', 'Request a proposal')}
            </h3>
          </div>
          <LeadForm
            kind="corporate_proposal"
            withCompany
            submitLabel={pick('প্রস্তাব অনুরোধ করুন', 'Request a Proposal')}
            successMessage={pick('আপনার অনুরোধ পাওয়া গেছে!', 'Thanks! We received your request.')}
          />
        </div>
      </div>
    </section>
  );
}
