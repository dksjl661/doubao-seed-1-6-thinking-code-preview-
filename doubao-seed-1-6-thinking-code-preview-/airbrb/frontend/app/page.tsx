'use client'

import { useState } from 'react'
import PropertyCard from '@/components/PropertyCard'

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    title: 'Cozy Studio in Downtown Paris',
    location: 'Paris, France',
    price: 120,
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=800&h=600&fit=crop',
    superhost: true,
    instantBook: true,
    category: 'Entire studio',
    distance: '0.3 miles from city center'
  },
  {
    id: '2',
    title: 'Modern Apartment with Ocean View',
    location: 'Barcelona, Spain',
    price: 180,
    rating: 4.9,
    reviewCount: 203,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    superhost: true,
    instantBook: false,
    category: 'Entire apartment',
    distance: '0.5 miles from beach'
  },
  {
    id: '3',
    title: 'Charming Cottage in the Countryside',
    location: 'Tuscany, Italy',
    price: 250,
    rating: 4.9,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    superhost: false,
    instantBook: true,
    category: 'Entire cottage',
    distance: '2 miles from nearest town'
  },
  {
    id: '4',
    title: 'Luxury Penthouse with Skyline Views',
    location: 'New York, USA',
    price: 500,
    rating: 4.8,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    superhost: true,
    instantBook: false,
    category: 'Entire penthouse',
    distance: '0.2 miles from Central Park'
  },
  {
    id: '5',
    title: 'Traditional Ryokan in Kyoto',
    location: 'Kyoto, Japan',
    price: 300,
    rating: 4.9,
    reviewCount: 267,
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    superhost: true,
    instantBook: true,
    category: 'Entire ryokan',
    distance: '0.4 miles from Kinkaku-ji'
  },
  {
    id: '6',
    title: 'Beachfront Villa with Private Pool',
    location: 'Bali, Indonesia',
    price: 450,
    rating: 4.9,
    reviewCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    superhost: false,
    instantBook: false,
    category: 'Entire villa',
    distance: 'Steps from the beach'
  }
]

// Mock data for categories
const categories = [
  { id: 'beachfront', name: 'Beachfront', icon: '🏖️' },
  { id: 'luxury', name: 'Luxury', icon: '⭐' },
  { id: 'cabins', name: 'Cabins', icon: '🏡' },
  { id: 'tropical', name: 'Tropical', icon: '🌴' },
  { id: 'historic', name: 'Historic', icon: '🏛️' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'pet-friendly', name: 'Pet friendly', icon: '🐶' },
  { id: 'countryside', name: 'Countryside', icon: '🌾' }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)

  const handleCategoryChange = (categoryId: string) => {
    const newSelectedCategory = selectedCategory === categoryId ? null : categoryId
    setSelectedCategory(newSelectedCategory)

    // Filter properties based on category (mock implementation)
    if (!newSelectedCategory) {
      setFilteredProperties(mockProperties)
    } else {
      // In a real app, this would filter based on actual property categories
      const filtered = mockProperties.filter((property) =>
        property.category?.toLowerCase().includes(newSelectedCategory.toLowerCase())
      )
      setFilteredProperties(filtered)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold text-primary">airbrb</div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
                Stays
              </a>
              <a href="#" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
                Experiences
              </a>
              <a href="#" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
                Online Experiences
              </a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-sm font-medium text-text-primary hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
                Airbnb your home
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="flex items-center space-x-2 p-2 rounded-full border border-gray-200 hover:shadow-sm transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Book unique homes
              </span>{' '}
              and experiences
            </h1>
            <p className="text-lg text-text-secondary">
              Explore millions of places to stay and things to do — all powered by local hosts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center">
                <div className="flex-1 md:w-64 px-6 py-4 border-r border-gray-200">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10.9 19.9a1 1 0 01-1.4 0l-4.95-4.95a7 7 0 010-9.9zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Where to?"
                      className="flex-1 text-sm font-medium focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1 md:w-48 px-6 py-4 border-r border-gray-200">
                  <input
                    type="text"
                    placeholder="Any week"
                    className="w-full text-sm font-medium focus:outline-none"
                  />
                </div>
                <div className="flex-1 md:w-48 px-6 py-4">
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="w-full text-sm font-medium focus:outline-none"
                  />
                </div>
                <button className="p-4 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors ml-4 mr-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            Discover unique stays
          </h2>
          <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex flex-col items-center space-y-2 px-6 py-4 text-sm font-medium rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gray-100 text-text-primary'
                    : 'bg-white text-text-secondary hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              Popular homes
            </h2>
            <div className="flex items-center space-x-2 text-sm text-text-primary">
              <span>Explore all</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 text-sm font-medium text-text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Show more homes
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How Airbnb works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Airbnb Plus</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Airbnb Luxe</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Host</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AirCover</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hosting resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hosting responsibly</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Airbnb-friendly apartments</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our COVID-19 response</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report a neighborhood concern</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Airbnb</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Founders' Letter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Airbnb.org emergency stays</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Get the Airbnb app</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="text-lg font-bold">airbrb</div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>© 2024 Airbnb, Inc.</span>
                  <span>·</span>
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <span>·</span>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <span>·</span>
                  <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>🌐</span>
                  <select className="bg-transparent border-none focus:outline-none text-sm text-gray-400 hover:text-white transition-colors">
                    <option>English (US)</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                    <option>中文</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>$</span>
                  <select className="bg-transparent border-none focus:outline-none text-sm text-gray-400 hover:text-white transition-colors">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CNY</option>
                    <option>JPY</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-6.672 2.928a1 1 0 01-1.414 0L7 10.414l-1.293 1.293a1 1 0 01-1.414-1.414l2-2a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}