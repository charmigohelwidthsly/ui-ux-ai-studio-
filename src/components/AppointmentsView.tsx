import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Doctor, MedicalSpecialty, Appointment } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Building2,
  Star,
  Search,
  CheckCircle2,
  X,
  AlertCircle,
  ChevronRight,
  Filter,
  UserCheck,
  Stethoscope,
  Sparkles,
  QrCode,
  ArrowRight,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

export const AppointmentsView: React.FC = () => {
  const {
    doctors,
    appointments,
    selectedDoctorForBooking,
    setSelectedDoctorForBooking,
    selectedSpecialtyFilter,
    setSelectedSpecialtyFilter,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    setActiveChatDoctorId,
    setActiveTab,
    setActiveVideoCallDoctor,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'find_doctors' | 'my_appointments'>('find_doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospitalFilter, setSelectedHospitalFilter] = useState<string>('All');
  const [bookingStep, setBookingStep] = useState<number>(1);

  // Booking Flow State
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-20');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('04:30 PM');
  const [consultationMode, setConsultationMode] = useState<'in_clinic' | 'video_call'>('in_clinic');
  const [symptomsInput, setSymptomsInput] = useState<string>('');
  const [confirmedBookingPass, setConfirmedBookingPass] = useState<Appointment | null>(null);

  // Reschedule state
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState('2026-08-24');
  const [newRescheduleTime, setNewRescheduleTime] = useState('11:00 AM');

  const specialtiesList: (MedicalSpecialty | 'All')[] = [
    'All',
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Dermatology',
    'Pediatrics',
    'Gastroenterology',
    'ENT & Head-Neck',
  ];

  const hospitalList = [
    'All',
    'Indus Health City',
    'Apollo Super Speciality',
    'Max Healthcare',
    'Fortis Memorial',
  ];

  // Next 7 days generator for dynamic booking
  const availableDates = [
    { dateStr: '2026-08-19', day: 'Wed', dateNum: '19 Aug', available: true },
    { dateStr: '2026-08-20', day: 'Thu', dateNum: '20 Aug', available: true },
    { dateStr: '2026-08-21', day: 'Fri', dateNum: '21 Aug', available: true },
    { dateStr: '2026-08-22', day: 'Sat', dateNum: '22 Aug', available: true },
    { dateStr: '2026-08-23', day: 'Sun', dateNum: '23 Aug', available: false },
    { dateStr: '2026-08-24', day: 'Mon', dateNum: '24 Aug', available: true },
    { dateStr: '2026-08-25', day: 'Tue', dateNum: '25 Aug', available: true },
  ];

  // Filter doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty = selectedSpecialtyFilter === 'All' || doc.specialty === selectedSpecialtyFilter;
    const matchesHospital = selectedHospitalFilter === 'All' || doc.hospital.toLowerCase().includes(selectedHospitalFilter.toLowerCase());
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.about.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesHospital && matchesSearch;
  });

  const handleStartBooking = (doctor: Doctor) => {
    setSelectedDoctorForBooking(doctor);
    setBookingStep(1);
    setSelectedDate('2026-08-20');
    setSelectedTimeSlot(doctor.availableSlots.morning[0] || '10:00 AM');
    setSymptomsInput('');
    setConfirmedBookingPass(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorForBooking) return;
    const newApt = bookAppointment({
      doctorId: selectedDoctorForBooking.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      mode: consultationMode,
      symptoms: symptomsInput,
    });
    setConfirmedBookingPass(newApt);
    setBookingStep(3); // pass view
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Sub-Tabs */}
      <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#4f6352] text-xs font-bold uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4 text-[#4f6352]" />
            <span>Consultation & Slot Booking Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-[#36352f]">
            Book Hospital & Telehealth Appointments
          </h1>
          <p className="text-xs text-[#79776e] mt-0.5">
            Select verified specialists, choose convenient time slots, and receive instant digital appointment passes.
          </p>
        </div>

        {/* Sub-Tabs Switch */}
        <div className="flex bg-[#f3efe6] p-1.5 rounded-2xl space-x-1 text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('find_doctors')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'find_doctors'
                ? 'bg-[#4f6352] text-white shadow-xs'
                : 'text-[#6e6d65] hover:text-[#36352f]'
            }`}
          >
            Find & Book Doctors
          </button>
          <button
            onClick={() => setActiveSubTab('my_appointments')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeSubTab === 'my_appointments'
                ? 'bg-[#4f6352] text-white shadow-xs'
                : 'text-[#6e6d65] hover:text-[#36352f]'
            }`}
          >
            <span>My Bookings</span>
            <span className="bg-[#edf2ec] text-[#364b39] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {appointments.length}
            </span>
          </button>
        </div>
      </div>

      {activeSubTab === 'find_doctors' && (
        <>
          {/* Filters & Search Bar */}
          <div className="bg-[#ffffff] rounded-3xl p-5 border border-[#e8e4db] shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8a887e] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctor by name, symptom (e.g. chest pain, skin rash), or hospital..."
                  className="w-full bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#36352f] outline-hidden font-medium transition-all"
                />
              </div>

              {/* Hospital Affiliation Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#79776e] whitespace-nowrap">Hospital:</span>
                <select
                  value={selectedHospitalFilter}
                  onChange={(e) => setSelectedHospitalFilter(e.target.value)}
                  className="bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3 py-2 text-xs font-semibold text-[#36352f] outline-hidden cursor-pointer"
                >
                  {hospitalList.map((hosp) => (
                    <option key={hosp} value={hosp}>
                      {hosp === 'All' ? 'All Partner Hospitals' : hosp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialty Category Pills */}
            <div className="pt-2 border-t border-[#f0ece3]">
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-bold text-[#8a887e] uppercase tracking-wider shrink-0 mr-1">
                  Specialties:
                </span>
                {specialtiesList.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialtyFilter(spec)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedSpecialtyFilter === spec
                        ? 'bg-[#4f6352] text-white shadow-xs'
                        : 'bg-[#f3efe6] text-[#43423b] hover:bg-[#eae5da]'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Doctors Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#ffffff] rounded-3xl p-5 border border-[#e8e4db] shadow-xs hover:border-[#8da08b] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Doctor Row */}
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#8da08b]/40 shadow-xs shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded">
                          {doc.specialty}
                        </span>
                        <div className="flex items-center space-x-1 text-xs font-bold text-[#865d2c] bg-[#fbf4eb] border border-[#ecdcc2] px-2 py-0.5 rounded">
                          <Star className="w-3.5 h-3.5 fill-[#a66a2e] text-[#a66a2e]" />
                          <span>{doc.rating}</span>
                          <span className="text-[#8a887e] font-normal">({doc.reviewCount})</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-[#36352f] mt-1 truncate">{doc.name}</h3>
                      <p className="text-[11px] text-[#79776e] font-medium truncate">{doc.title}</p>
                      <p className="text-[11px] text-[#6e6d65] flex items-center space-x-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#8a887e] shrink-0" />
                        <span className="truncate">{doc.hospital}</span>
                      </p>
                    </div>
                  </div>

                  {/* Doctor Info Details */}
                  <div className="p-3 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] text-xs space-y-1.5">
                    <p className="text-[#6e6d65] text-[11px] leading-relaxed line-clamp-2">{doc.about}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-[#e8e4db] text-[11px] text-[#79776e]">
                      <span>Experience: <strong className="text-[#36352f]">{doc.experienceYears} Years</strong></span>
                      <span>Languages: <strong className="text-[#36352f]">{doc.languages.join(', ')}</strong></span>
                    </div>
                  </div>

                  {/* Next slot & fee */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <div>
                      <span className="text-[10px] text-[#8a887e] font-semibold block uppercase">Next Available Slot</span>
                      <span className="font-bold text-[#364b39] flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#4f6352]" />
                        <span>{doc.nextAvailable}</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8a887e] font-semibold block uppercase">Consultation Fee</span>
                      <span className="font-bold text-[#36352f] font-mono text-sm">₹{doc.consultationFee}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#f0ece3] mt-4">
                  <button
                    onClick={() => handleStartBooking(doc)}
                    className="flex-1 bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-[#4f6352]/20 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Select Date & Slot</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveChatDoctorId(doc.id);
                      setActiveTab('chat');
                    }}
                    className="p-2.5 bg-[#f3efe6] hover:bg-[#eae5da] text-[#43423b] border border-[#ded8cc] rounded-xl transition-colors cursor-pointer"
                    title="Direct Message"
                  >
                    <MessageSquare className="w-4 h-4 text-[#4f6352]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MY APPOINTMENTS VIEW */}
      {activeSubTab === 'my_appointments' && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs">
            <h3 className="font-bold text-base text-[#36352f] font-['Space_Grotesk'] mb-4">
              Your Scheduled & Past Consultations
            </h3>

            {appointments.length === 0 ? (
              <div className="text-center py-12 text-[#8a887e]">
                <CalendarIcon className="w-12 h-12 text-[#c8c2b5] mx-auto mb-2" />
                <p className="text-sm font-semibold">No appointments found</p>
                <button
                  onClick={() => setActiveSubTab('find_doctors')}
                  className="mt-3 px-4 py-2 bg-[#4f6352] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Book Your First Consultation
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] hover:border-[#8da08b] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3.5">
                      <img
                        src={apt.doctorAvatar}
                        alt={apt.doctorName}
                        className="w-12 h-12 rounded-xl object-cover border border-[#8da08b]/40 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm text-[#36352f]">{apt.doctorName}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#edf2ec] text-[#364b39] border border-[#d2ded0]">
                            {apt.doctorSpecialty}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              apt.status === 'confirmed'
                                ? 'bg-[#edf2ec] text-[#364b39] border border-[#d2ded0]'
                                : apt.status === 'rescheduled'
                                ? 'bg-[#fbf4eb] text-[#865d2c] border border-[#ecdcc2]'
                                : 'bg-[#f0ece3] text-[#6e6d65]'
                            }`}
                          >
                            {apt.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-[#6e6d65] mt-0.5">{apt.hospital}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#43423b] mt-1 font-semibold">
                          <span className="flex items-center text-[#4f6352]">
                            <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                            {apt.date}
                          </span>
                          <span className="flex items-center text-[#4f6352]">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {apt.timeSlot}
                          </span>
                          <span className="text-[#c8c2b5]">•</span>
                          <span className="font-mono text-[#6e6d65]">Ref: {apt.bookingRef}</span>
                          <span className="text-[#c8c2b5]">•</span>
                          <span className="font-bold text-[#364b39]">Token #{apt.tokenNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      {apt.status === 'confirmed' && apt.mode === 'video_call' && (
                        <button
                          onClick={() => {
                            const doc = doctors.find((d) => d.id === apt.doctorId) || doctors[0];
                            setActiveVideoCallDoctor(doc);
                          }}
                          className="bg-[#4f6352] hover:bg-[#3f5042] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Video</span>
                        </button>
                      )}

                      {apt.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => setReschedulingApt(apt)}
                            className="bg-[#ffffff] hover:bg-[#f3efe6] text-[#43423b] border border-[#ded8cc] text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="bg-[#ffffff] hover:bg-[#fbf0eb] text-[#a05643] border border-[#ecdcc2] text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => {
                          setActiveChatDoctorId(apt.doctorId);
                          setActiveTab('chat');
                        }}
                        className="bg-[#f3efe6] hover:bg-[#eae5da] text-[#43423b] border border-[#ded8cc] text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#4f6352]" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* INTERACTIVE BOOKING MODAL (STEP-BY-STEP CALENDAR & SLOT PICKER) */}
      {selectedDoctorForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#ffffff] rounded-3xl shadow-2xl border border-[#e8e4db] w-full max-w-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#3a4c3c] to-[#262522] p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedDoctorForBooking.avatar}
                  alt={selectedDoctorForBooking.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h3 className="font-bold text-base text-white">{selectedDoctorForBooking.name}</h3>
                  <p className="text-xs text-[#d4e4d2]">{selectedDoctorForBooking.specialty} • {selectedDoctorForBooking.hospital}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoctorForBooking(null)}
                className="text-[#a9a79e] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-[#43423b]">
              {bookingStep !== 3 ? (
                <form onSubmit={handleConfirmBooking} className="space-y-5">
                  {/* Step 1: Select Consultation Mode */}
                  <div>
                    <label className="block text-xs font-bold text-[#36352f] uppercase tracking-wider mb-2">
                      1. Select Consultation Mode
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setConsultationMode('in_clinic')}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center space-x-3 ${
                          consultationMode === 'in_clinic'
                            ? 'border-[#4f6352] bg-[#edf2ec] text-[#2d3d30] shadow-xs'
                            : 'border-[#ded8cc] bg-white text-[#43423b] hover:bg-[#f9f7f2]'
                        }`}
                      >
                        <Building2 className="w-5 h-5 text-[#4f6352] shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Hospital In-Clinic</div>
                          <div className="text-[10px] text-[#79776e]">Visit OPD Clinic in person</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultationMode('video_call')}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center space-x-3 ${
                          consultationMode === 'video_call'
                            ? 'border-[#4f6352] bg-[#edf2ec] text-[#2d3d30] shadow-xs'
                            : 'border-[#ded8cc] bg-white text-[#43423b] hover:bg-[#f9f7f2]'
                        }`}
                      >
                        <Video className="w-5 h-5 text-[#4f6352] shrink-0" />
                        <div>
                          <div className="font-bold text-xs">Telehealth Video Call</div>
                          <div className="text-[10px] text-[#79776e]">Consult from home via web</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Choose Consultation Date */}
                  <div>
                    <label className="block text-xs font-bold text-[#36352f] uppercase tracking-wider mb-2">
                      2. Choose Consultation Date
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {availableDates.map((item) => (
                        <button
                          key={item.dateStr}
                          type="button"
                          disabled={!item.available}
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            !item.available
                              ? 'opacity-40 bg-[#f3efe6] border-[#e8e4db] cursor-not-allowed text-[#a9a79e]'
                              : selectedDate === item.dateStr
                              ? 'bg-[#4f6352] text-white border-[#4f6352] shadow-xs font-bold'
                              : 'bg-[#f9f7f2] hover:bg-[#eae5da] border-[#ded8cc] text-[#43423b]'
                          }`}
                        >
                          <div className="text-[10px] uppercase">{item.day}</div>
                          <div className="text-xs font-bold mt-0.5">{item.dateNum.split(' ')[0]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Select Time Slot */}
                  <div>
                    <label className="block text-xs font-bold text-[#36352f] uppercase tracking-wider mb-2">
                      3. Choose Available Time Slot
                    </label>
                    <div className="space-y-2">
                      {/* Morning slots */}
                      <div>
                        <span className="text-[11px] font-semibold text-[#79776e] block mb-1">Morning Slots</span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {selectedDoctorForBooking.availableSlots.morning.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-2 text-xs rounded-xl border font-mono transition-all cursor-pointer ${
                                selectedTimeSlot === slot
                                  ? 'bg-[#4f6352] text-white border-[#4f6352] font-bold shadow-xs'
                                  : 'bg-[#f9f7f2] hover:bg-[#eae5da] border-[#ded8cc] text-[#43423b]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Afternoon / Evening slots */}
                      <div>
                        <span className="text-[11px] font-semibold text-[#79776e] block mb-1">Afternoon & Evening Slots</span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {selectedDoctorForBooking.availableSlots.afternoon
                            .concat(selectedDoctorForBooking.availableSlots.evening)
                            .slice(0, 6)
                            .map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-2 px-2 text-xs rounded-xl border font-mono transition-all cursor-pointer ${
                                  selectedTimeSlot === slot
                                    ? 'bg-[#4f6352] text-white border-[#4f6352] font-bold shadow-xs'
                                    : 'bg-[#f9f7f2] hover:bg-[#eae5da] border-[#ded8cc] text-[#43423b]'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Symptoms Description */}
                  <div>
                    <label className="block text-xs font-bold text-[#36352f] uppercase tracking-wider mb-1.5">
                      4. Reason for Visit & Key Symptoms (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={symptomsInput}
                      onChange={(e) => setSymptomsInput(e.target.value)}
                      placeholder="e.g. Follow-up on blood pressure, shortness of breath on climbing stairs, request medication review..."
                      className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl p-3 text-xs text-[#36352f] outline-hidden focus:border-[#4f6352]"
                    ></textarea>
                  </div>

                  {/* Consultation Fee & Submit */}
                  <div className="pt-3 border-t border-[#e8e4db] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#79776e] block uppercase font-semibold">Total Consultation Fee</span>
                      <span className="text-base font-black font-mono text-[#36352f]">₹{selectedDoctorForBooking.consultationFee}</span>
                    </div>

                    <button
                      type="submit"
                      id="confirm_booking_btn"
                      className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md shadow-[#4f6352]/20 flex items-center space-x-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Generate Appointment Pass</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmed Booking Pass View */
                confirmedBookingPass && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-14 h-14 rounded-full bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8 text-[#4f6352]" />
                    </div>

                    <h3 className="text-lg font-black text-[#36352f] font-['Space_Grotesk']">
                      Appointment Confirmed!
                    </h3>
                    <p className="text-xs text-[#79776e]">
                      Booking reference <strong className="text-[#36352f] font-mono">{confirmedBookingPass.bookingRef}</strong>
                    </p>

                    {/* Official Pass Slip */}
                    <div className="bg-[#262522] text-[#f9f7f2] p-5 rounded-2xl text-left space-y-3 relative overflow-hidden border border-[#3a3934]">
                      <div className="flex items-center justify-between border-b border-[#3a3934] pb-2">
                        <div>
                          <div className="text-[10px] text-[#8da08b] font-bold uppercase">Hospital Pass</div>
                          <div className="font-bold text-sm text-white">{confirmedBookingPass.hospital}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-[#a9a79e]">Token Number</div>
                          <div className="text-xl font-black text-[#a5c9a2] font-mono">
                            #{confirmedBookingPass.tokenNumber}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-[#a9a79e] block">Doctor</span>
                          <span className="font-bold text-white">{confirmedBookingPass.doctorName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#a9a79e] block">Specialty</span>
                          <span className="font-bold text-white">{confirmedBookingPass.doctorSpecialty}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#a9a79e] block">Date & Time</span>
                          <span className="font-bold text-[#8da08b]">{confirmedBookingPass.date} at {confirmedBookingPass.timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#a9a79e] block">Mode / Location</span>
                          <span className="font-bold text-white">{confirmedBookingPass.mode === 'in_clinic' ? 'In-Clinic OPD' : 'Telehealth Video'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 pt-2">
                      <button
                        onClick={() => {
                          setSelectedDoctorForBooking(null);
                          setActiveSubTab('my_appointments');
                        }}
                        className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                      >
                        View in My Appointments
                      </button>
                      <button
                        onClick={() => setSelectedDoctorForBooking(null)}
                        className="bg-[#f3efe6] hover:bg-[#eae5da] text-[#43423b] border border-[#ded8cc] font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#ffffff] rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e8e4db] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#36352f]">Reschedule Consultation</h3>
              <button onClick={() => setReschedulingApt(null)} className="text-[#8a887e] hover:text-[#36352f]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6e6d65]">
              Rescheduling appointment with <strong>{reschedulingApt.doctorName}</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#36352f] mb-1">New Date</label>
                <input
                  type="date"
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl p-2 text-xs font-mono text-[#36352f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#36352f] mb-1">New Time Slot</label>
                <select
                  value={newRescheduleTime}
                  onChange={(e) => setNewRescheduleTime(e.target.value)}
                  className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl p-2 text-xs font-mono text-[#36352f]"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                rescheduleAppointment(reschedulingApt.id, newRescheduleDate, newRescheduleTime);
                setReschedulingApt(null);
              }}
              className="w-full bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
            >
              Update Appointment Slot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
