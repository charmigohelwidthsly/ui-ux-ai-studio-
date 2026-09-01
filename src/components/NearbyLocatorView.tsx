import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PharmacyOrLab } from '../types';
import {
  MapPin,
  ShoppingBag,
  FlaskConical,
  Phone,
  Clock,
  Star,
  CheckCircle2,
  Navigation,
  Search,
  Crosshair,
  Sparkles,
  ShieldCheck,
  Building2,
  Truck,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const NearbyLocatorView: React.FC = () => {
  const {
    nearbyFacilities,
    currentLocationName,
    setCurrentLocationName,
    facilityTypeFilter,
    setFacilityTypeFilter,
    orderMedicationsOnline,
    bookHomeLabSample,
    prescriptions,
    addToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<PharmacyOrLab | null>(nearbyFacilities[0]);
  const [isGpsActive, setIsGpsActive] = useState(true);

  // Filter facilities
  const filteredFacilities = nearbyFacilities.filter((fac) => {
    const matchesType =
      facilityTypeFilter === 'all' ||
      (facilityTypeFilter === 'pharmacy' && (fac.type === 'pharmacy' || fac.type === 'hospital_pharmacy')) ||
      (facilityTypeFilter === 'diagnostic_center' && fac.type === 'diagnostic_center');

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      fac.name.toLowerCase().includes(searchLower) ||
      fac.cityArea.toLowerCase().includes(searchLower) ||
      fac.availableStockTags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      (fac.availableTests && fac.availableTests.some((t) => t.toLowerCase().includes(searchLower)));

    return matchesType && matchesSearch;
  });

  const handleSimulateGps = () => {
    setIsGpsActive(true);
    addToast('success', 'GPS Location Locked', `Coordinates calibrated: 23.0338° N, 72.5074° E (${currentLocationName.split(' ')[0]})`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Locator Header */}
      <div className="bg-[#4f6352] text-white rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-[#ffffff]/15 text-[#e5efe3] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Geospatial Health Radar</span>
              </span>
              <span className="text-xs text-[#d4e4d2]">Live GPS Range: 3.5 km radius</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
              Nearby Pharmacies & Diagnostic Centers
            </h1>
            <p className="text-xs sm:text-sm text-[#e5efe3]/90 leading-relaxed">
              Detects 24/7 chemists and NABL accredited pathology labs near your current location for instant home medicine delivery or doorstep blood sample collection.
            </p>
          </div>

          <button
            onClick={handleSimulateGps}
            className="bg-[#dfdacd] hover:bg-[#d5d0c2] text-[#262522] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <Crosshair className="w-4 h-4 text-[#4f6352]" />
            <span>Recalibrate GPS</span>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-white/15 flex items-center space-x-2 text-xs text-[#e5efe3]">
          <span className="font-semibold">Current Location:</span>
          <span className="font-bold text-[#262522] bg-[#dfdacd] px-2.5 py-0.5 rounded-lg">{currentLocationName}</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#ffffff] rounded-3xl p-5 border border-[#e8e4db] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8a887e] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by medicine name (e.g. Telmisartan, Dolo), lab test (e.g. CBC, Lipid Profile), or chemist..."
              className="w-full bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#36352f] outline-hidden font-medium"
            />
          </div>

          <div className="flex bg-[#f3efe6] p-1 rounded-2xl space-x-1 text-xs font-bold shrink-0">
            <button
              onClick={() => setFacilityTypeFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                facilityTypeFilter === 'all' ? 'bg-[#4f6352] text-white shadow-xs' : 'text-[#6e6d65] hover:text-[#36352f]'
              }`}
            >
              All Centers ({nearbyFacilities.length})
            </button>
            <button
              onClick={() => setFacilityTypeFilter('pharmacy')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1 ${
                facilityTypeFilter === 'pharmacy' ? 'bg-[#4f6352] text-white shadow-xs' : 'text-[#6e6d65] hover:text-[#36352f]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pharmacies</span>
            </button>
            <button
              onClick={() => setFacilityTypeFilter('diagnostic_center')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1 ${
                facilityTypeFilter === 'diagnostic_center' ? 'bg-[#4f6352] text-white shadow-xs' : 'text-[#6e6d65] hover:text-[#36352f]'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Diagnostic Labs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Radar + Facilities List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Map / Radar Visualization */}
        <div className="lg:col-span-5 bg-[#262522] rounded-3xl p-5 border border-[#3f3e39] text-[#f9f7f2] shadow-xs flex flex-col justify-between min-h-[420px] relative overflow-hidden">
          {/* Map Grid Background Simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#4d4b43_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full border border-[#8da08b]/20 animate-ping duration-1000"></div>
            <div className="w-48 h-48 rounded-full border border-[#8da08b]/30"></div>
            <div className="w-24 h-24 rounded-full border border-[#8da08b]/40 bg-[#8da08b]/5"></div>
          </div>

          {/* User Location Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <span className="w-4 h-4 rounded-full bg-[#8da08b] border-2 border-white shadow-lg animate-pulse"></span>
            <span className="bg-[#1c1b18] text-[#dfdacd] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm mt-1 whitespace-nowrap border border-[#3f3e39]">
              You Are Here
            </span>
          </div>

          {/* Map Top Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-[#8da08b]" />
              <span className="font-bold text-xs uppercase tracking-wider text-[#ded8cc]">Live Healthcare Radar</span>
            </div>
            <span className="text-[10px] font-mono bg-[#36352f] text-[#8da08b] px-2 py-0.5 rounded border border-[#4d4b43]">
              GPS Active • {filteredFacilities.length} Nodes Found
            </span>
          </div>

          {/* Interactive Map Pin Markers */}
          <div className="relative z-10 py-12 flex flex-wrap gap-4 justify-around">
            {filteredFacilities.map((fac) => {
              const isSelected = selectedFacility?.id === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center space-x-2 shadow-sm backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#8da08b] text-[#262522] font-bold scale-105 ring-2 ring-white'
                      : 'bg-[#36352f]/90 hover:bg-[#4d4b43] text-[#ded8cc] border border-[#4d4b43]'
                  }`}
                >
                  {fac.type === 'diagnostic_center' ? (
                    <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <div className="text-left leading-tight">
                    <div className="text-[11px] font-bold truncate max-w-[130px]">{fac.name.split(' ')[0]}</div>
                    <div className="text-[9px] opacity-80 font-mono">{fac.distanceKm} km</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Facility Card inside Map */}
          {selectedFacility && (
            <div className="relative z-10 bg-[#1c1b18]/95 backdrop-blur-md p-4 rounded-2xl border border-[#3f3e39] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{selectedFacility.name}</h4>
                  <p className="text-[10px] text-[#a8a59b]">{selectedFacility.address}</p>
                </div>
                <span className="bg-[#edf2ec] text-[#2d3d30] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded">
                  {selectedFacility.distanceKm} km away
                </span>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <a
                  href={`tel:${selectedFacility.phone}`}
                  className="flex-1 bg-[#36352f] hover:bg-[#4d4b43] text-white text-[11px] font-bold py-2 rounded-xl flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {selectedFacility.phone}</span>
                </a>
                <button
                  onClick={() => addToast('info', 'Directions Initiated', `Opening turn-by-turn route to ${selectedFacility.name} (${selectedFacility.distanceKm} km)`)}
                  className="bg-[#4f6352] hover:bg-[#3f5042] text-white text-[11px] font-bold py-2 px-3 rounded-xl flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Route</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Detailed Facilities List */}
        <div className="lg:col-span-7 space-y-4">
          {filteredFacilities.map((fac) => {
            const isPharmacy = fac.type === 'pharmacy' || fac.type === 'hospital_pharmacy';
            return (
              <div
                key={fac.id}
                className={`bg-[#ffffff] rounded-3xl p-5 border transition-all space-y-3.5 shadow-xs ${
                  selectedFacility?.id === fac.id ? 'border-[#4f6352] ring-2 ring-[#4f6352]/20' : 'border-[#e8e4db] hover:border-[#8da08b]'
                }`}
              >
                {/* Center Title & Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shrink-0 ${
                        isPharmacy ? 'bg-[#edf2ec] text-[#364b39] border border-[#d2ded0]' : 'bg-[#edf2ec] text-[#364b39] border border-[#d2ded0]'
                      }`}
                    >
                      {isPharmacy ? <ShoppingBag className="w-5 h-5 text-[#4f6352]" /> : <FlaskConical className="w-5 h-5 text-[#4f6352]" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-sm text-[#36352f]">{fac.name}</h3>
                        {fac.is24x7 && (
                          <span className="bg-[#fbf0eb] text-[#865d2c] border border-[#ecdcc2] text-[10px] font-bold px-2 py-0.5 rounded">
                            24x7 Open
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#79776e] mt-0.5">{fac.address} • {fac.cityArea}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black font-mono text-[#364b39] bg-[#edf2ec] px-2.5 py-1 rounded-full border border-[#d2ded0]">
                      {fac.distanceKm} km
                    </span>
                    <div className="flex items-center justify-end space-x-1 text-[11px] font-bold text-[#865d2c] mt-1">
                      <Star className="w-3 h-3 fill-[#865d2c] text-[#865d2c]" />
                      <span>{fac.rating}</span>
                      <span className="text-[#8a887e] font-normal">({fac.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Delivery & Home Sample Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {fac.offersHomeDelivery && (
                    <span className="bg-[#edf2ec] text-[#2d3d30] font-semibold px-2.5 py-1 rounded-lg border border-[#d2ded0] flex items-center space-x-1">
                      <Truck className="w-3.5 h-3.5 text-[#4f6352]" />
                      <span>Doorstep Delivery in {fac.deliveryTimeEstimate}</span>
                    </span>
                  )}
                  {fac.homeSampleCollection && (
                    <span className="bg-[#edf2ec] text-[#2d3d30] font-semibold px-2.5 py-1 rounded-lg border border-[#d2ded0] flex items-center space-x-1">
                      <FlaskConical className="w-3.5 h-3.5 text-[#4f6352]" />
                      <span>Home Sample Collection Available</span>
                    </span>
                  )}
                </div>

                {/* Stock & Tests available pills */}
                <div className="p-3 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] text-xs space-y-1.5">
                  <div className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider">
                    {isPharmacy ? 'Available Medications in Stock:' : 'Popular Diagnostic Tests Available:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(fac.availableTests || fac.availableStockTags).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#ffffff] text-[#43423b] text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#ded8cc]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {fac.discountOffer && (
                    <div className="text-[11px] font-bold text-[#364b39] pt-1">
                      🎁 Offer: {fac.discountOffer}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#f0ece3] gap-2">
                  <div className="text-xs text-[#79776e] flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#8a887e]" />
                    <span>{fac.openStatus}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isPharmacy ? (
                      <button
                        onClick={() => orderMedicationsOnline(fac.id, prescriptions[0].prescriptionNumber)}
                        className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Prescribed Meds</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => bookHomeLabSample(fac.id, fac.availableTests?.[0] || 'Pathology Panel')}
                        className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Book Home Sample</span>
                      </button>
                    )}

                    <a
                      href={`tel:${fac.phone}`}
                      className="p-2 bg-[#f3efe6] hover:bg-[#eae5da] text-[#43423b] border border-[#ded8cc] rounded-xl transition-colors cursor-pointer"
                      title="Call Chemist"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
