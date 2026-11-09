import { Award, BookMarked, Briefcase, Compass, FolderKanban, GraduationCap, MessagesSquare, Users } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';

const FEATURES = [
  { icon: BookMarked, bn: 'ইন্ডাস্ট্রি-ভিত্তিক কারিকুলাম', en: 'Industry-focused curriculum', descBn: 'কর্মরত পেশাজীবীদের সাথে তৈরি সিলেবাস।', descEn: 'Syllabus designed with working professionals.' },
  { icon: Users, bn: 'লাইভ ইন্টারঅ্যাক্টিভ ক্লাস', en: 'Live interactive classes', descBn: 'প্রশ্ন করুন এবং সঙ্গে সঙ্গে উত্তর পান।', descEn: 'Ask questions and get answers in real time.' },
  { icon: GraduationCap, bn: 'ডেডিকেটেড শিক্ষার্থী সাপোর্ট', en: 'Dedicated student support', descBn: 'পথচলায় সাহায্য করার জন্য একটি সক্রিয় টিম।', descEn: 'A real team that helps you stay on track.' },
  { icon: Compass, bn: 'ক্যারিয়ার গাইডেন্স', en: 'Career guidance', descBn: 'পরবর্তী চাকরির জন্য রোডম্যাপ ও পরামর্শ।', descEn: 'Roadmaps and advice for your next job.' },
  { icon: FolderKanban, bn: 'বাস্তব প্রজেক্ট', en: 'Practical projects', descBn: 'নিয়োগকর্তাকে দেখানোর মতো পোর্টফোলিও তৈরি করুন।', descEn: 'Build a portfolio you can show employers.' },
  { icon: Award, bn: 'সার্টিফিকেট অব কমপ্লিশন', en: 'Certificate of completion', descBn: 'প্রতিটি কোর্সের জন্য যাচাইযোগ্য সার্টিফিকেট।', descEn: 'Verifiable certificates for every course.' },
  { icon: Briefcase, bn: 'চাকরির প্রস্তুতি', en: 'Career preparation', descBn: 'ইন্টারভিউ ও সিভি প্রস্তুতিতে সহায়তা।', descEn: 'Interview and CV preparation support.' },
  { icon: MessagesSquare, bn: 'লার্নিং কমিউনিটি', en: 'Learning community', descBn: 'সারা বাংলাদেশের সহপাঠীদের সাথে একসাথে শিখুন।', descEn: 'Learn alongside peers across Bangladesh.' },
];

export function WhyChooseUs() {
  const { pick } = useLanguage();
  return (
    <section id="why-us" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={pick('কেন Khan Academy', 'Why Khan Academy')}
          title={pick('শেখা থেকে চাকরি পর্যন্ত, আমরা পাশে আছি', 'From learning to hiring, we are with you')}
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.en} className="card flex flex-col gap-4 p-6 hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <feature.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink">{pick(feature.bn, feature.en)}</h3>
                <p className="mt-1.5 text-sm leading-normal text-ink-muted">{pick(feature.descBn, feature.descEn)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
