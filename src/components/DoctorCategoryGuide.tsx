import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTOR_CATEGORIES } from '../data/mockData';
import { DoctorCategory } from '../types';
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  Sparkles,
  Baby,
  Activity,
  Eye,
  Ear,
  Wind,
  Search,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const DoctorCategoryGuide: React.FC = () => {
  const { setSelectedSpecialtyFilter, setActiveTab } = useApp();
  const [symptomSearch, setSymptomSearch] = useState('');

  // Map icon strings to Lucide components
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return HeartPulse;
      case 'Brain':
        return Brain;
      case 'Bone':
        return Bone;
      case 'Sparkles':
        return Sparkles;
      case 'Baby':
        return Baby;
      case 'Activity':
        return Activity;
      case 'Eye':
        return Eye;
      case 'Ear':
        return Ear;
      case 'Wind':
        return Wind;
      default:
        return Stethoscope;
    }
  };

  const filteredCategories = DOCTOR_CATEGORIES.filter((cat) => {
    const searchLower = symptomSearch.toLowerCase();
    const matchesName = cat.name.toLowerCase().includes(searchLower);
    const matchesDesc = cat.description.toLowerCase().includes(searchLower);
    const matchesSymptoms = cat.commonSymptoms.some((s) => s.toLowerCase().includes(searchLower));
    return matchesName || matchesDesc || matchesSymptoms;
  });

  const handleSelectSpecialty = (category: DoctorCategory) => {
    setSelectedSpecialtyFilter(category.name);
    setActiveTab('appointments');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#4f6352] text-white rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="bg-[#ffffff]/15 text-[#e5efe3] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 uppercase tracking-wider inline-flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clinical Symptom-to-Specialist Guide</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk']">
            Which Doctor Should You Consult?
          </h1>
          <p className="text-xs sm:text-sm text-[#e5efe3]/90 leading-relaxed">
            Not sure which department to book? Search your symptoms or browse below to understand different specialties and find the right medical expert.
          </p>

          {/* Interactive Symptom Search */}
          <div className="pt-3 relative">
            <Search className="w-4 h-4 text-[#8a887e] absolute left-4 top-6.5" />
            <input
              type="text"
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
              placeholder="Search symptoms (e.g., chest pain, skin rash, joint stiffness, baby fever, blurred vision)..."
              className="w-full bg-[#ffffff] text-[#36352f] rounded-2xl pl-11 pr-4 py-3 text-xs outline-hidden shadow-xs font-medium placeholder:text-[#8a887e] border border-[#ded8cc]"
            />
          </div>
        </div>
      </div>

      {/* Specialty Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCategories.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          return (
            <div
              key={cat.id}
              className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs hover:border-[#8da08b] hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Category Title & Icon */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#edf2ec] border border-[#d2ded0] text-[#364b39] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6 text-[#4f6352]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#36352f]">{cat.name}</h3>
                      <p className="text-xs text-[#4f6352] font-semibold">{cat.tagline}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#364b39] bg-[#edf2ec] border border-[#d2ded0] px-2 py-0.5 rounded-full">
                    {cat.availableDoctorsCount} Doctors Available
                  </span>
                </div>

                <p className="text-xs text-[#6e6d65] leading-relaxed">{cat.description}</p>

                {/* Common Symptoms Pill List */}
                <div>
                  <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block mb-1.5">
                    Common Key Symptoms:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.commonSymptoms.map((sym, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f3efe6] text-[#43423b] text-[11px] font-medium px-2.5 py-1 rounded-lg border border-[#ded8cc]"
                      >
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* When to Consult Box */}
                <div className="p-3 bg-[#fbf4eb] rounded-2xl border border-[#ecdcc2] text-xs">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-[#865d2c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#865d2c] text-[11px]">When to consult: </span>
                      <span className="text-[#594d3f] text-[11px]">{cat.whenToConsult}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer & Action */}
              <div className="pt-4 border-t border-[#f0ece3] mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-[#79776e]">
                  <Clock className="w-3.5 h-3.5 text-[#8a887e]" />
                  <span>Avg OPD Wait: <strong className="text-[#36352f]">{cat.averageWaitTime}</strong></span>
                </div>

                <button
                  onClick={() => handleSelectSpecialty(cat)}
                  className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2 px-4 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <span>Find {cat.name} Doctors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
