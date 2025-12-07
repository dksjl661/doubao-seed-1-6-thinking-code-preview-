'use client'

import { useState } from 'react'
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronDown
} from 'lucide-react'

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'stays' | 'experiences'>('stays')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isGuestsPickerOpen, setIsGuestsPickerOpen] = useState(false)

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            <span className="text-gradient bg-gradient-to-r from-primary to-accent">
              Book unique homes
            </span>{' '}
            and experiences
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8">
            Explore millions of places to stay and things to do — all powered by local hosts.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => setActiveTab('stays')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === 'stays'
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Stays
              </button>
              <button
                onClick={() => setActiveTab('experiences')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTab === 'experiences'
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Experiences
              </button>
            </div>
          </div>

          {/* Search Inputs */}
          <div className="bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden">
            <div className="flex items-center">
              {/* Location Input */}
              <div className="flex-1 md:flex-none md:w-64 px-6 py-4 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="flex-1 text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="flex-1 md:flex-none md:w-48 px-6 py-4 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors relative">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Any week"
                    className="flex-1 text-sm font-medium focus:outline-none"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  />
                </div>
              </div>

              {/* Guests Input */}
              <div className="flex-1 md:flex-none md:w-48 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors relative">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="flex-1 text-sm font-medium focus:outline-none"
                    onClick={() => setIsGuestsPickerOpen(!isGuestsPickerOpen)}
                  />
                </div>
              </div>

              {/* Search Button */}
              <button className="p-4 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors ml-4 mr-2">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center justify-center space-x-4 mt-8 flex-wrap">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-full transition-colors">
              <span>🏠</span>
              <span>Amazing views</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-full transition-colors">
              <span>🌊</span>
              <span>Beachfront</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-full transition-colors">
              <span>🏡</span>
              <span>Luxury homes</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-full transition-colors">
              <span>🪵</span>
              <span>Tiny homes</span>
            </button>
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="max-w-7xl mx-auto mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
            Featured destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
              { name: 'New York, USA', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop' },
              { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop' },
              { name: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' },
            ].map((destination, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl aspect-video">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-semibold mb-1">{destination.name}</h3>
                  <p className="text-white/80 text-sm">Popular neighborhood guides and more</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}