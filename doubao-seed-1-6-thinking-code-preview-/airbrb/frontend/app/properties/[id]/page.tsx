'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Heart,
  MapPin,
  Star,
  Calendar,
  Users,
  Share2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Shield,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'

// Mock data for property details
const mockPropertyDetails = {
  '1': {
    id: '1',
    title: 'Cozy Studio in Downtown Paris',
    location: 'Paris, France',
    price: 120,
    rating: 4.8,
    reviewCount: 124,
    imageUrls: [
      'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554679665-c74683f339c1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop'
    ],
    superhost: true,
    instantBook: true,
    category: 'Entire studio',
    distance: '0.3 miles from city center',
    guestCount: 2,
    bedroomCount: 0,
    bedCount: 1,
    bathroomCount: 1,
    amenities: [
      { name: 'WiFi', icon: '📶' },
      { name: 'Air conditioning', icon: '❄️' },
      { name: 'Heating', icon: '🔥' },
      { name: 'Kitchen', icon: '🍳' },
      { name: 'Free parking', icon: '🅿️' },
      { name: 'Washer', icon: '🧺' },
      { name: 'Dryer', icon: '👕' },
      { name: 'TV', icon: '📺' },
      { name: 'Hair dryer', icon: '💇' },
      { name: 'Iron', icon: '🔧' },
      { name: 'Essentials', icon: '🛏️' },
      { name: 'Coffee maker', icon: '☕' },
      { name: 'Refrigerator', icon: '🧊' },
      { name: 'Microwave', icon: '🥘' }
    ],
    host: {
      name: 'Marie',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
      verified: true,
      joined: '2018',
      responseRate: 95,
      responseTime: 'within an hour'
    },
    description: `Charming studio apartment located in the heart of Paris, just steps away from the Seine River and major attractions. This cozy space features modern amenities and traditional Parisian charm.

The apartment includes a comfortable queen-size bed, a well-equipped kitchenette, and a private bathroom. The large windows offer beautiful views of the historic neighborhood.

Perfect for couples or solo travelers looking to experience the best of Paris from a central and comfortable location.`,
    houseRules: [
      'No smoking',
      'No parties or events',
      'Check-in time: 3:00 PM - 10:00 PM',
      'Check-out time: 11:00 AM',
      'Pets allowed with prior approval'
    ],
    cancellationPolicy: 'Flexible - Full refund up to 24 hours before check-in',
    reviews: [
      {
        id: '1',
        author: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'This apartment was perfect for our Paris getaway! Marie was an amazing host and the location couldn\\'t be better. We will definitely be back!'
      },
      {
        id: '2',
        author: 'David',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        rating: 4,
        date: '1 month ago',
        comment: 'Great location and clean apartment. Marie was very responsive. The only minor issue was the WiFi speed, but it was manageable.'
      },
      {
        id: '3',
        author: 'Emily',
        avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop',
        rating: 5,
        date: '2 months ago',
        comment: 'Absolutely lovely apartment! The location is unbeatable - walking distance to so many attractions. Marie was incredibly helpful and welcoming. We had a wonderful stay!'
      }
    ]
  }
}

export default function PropertyDetail() {
  const params = useParams()
  const propertyId = params.id as string
  const property = mockPropertyDetails[propertyId as keyof typeof mockPropertyDetails]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guestCount, setGuestCount] = useState(2)

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Property not found</h2>
          <p className="text-text-secondary mb-8">Sorry, the property you're looking for doesn't exist.</p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.imageUrls.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.imageUrls.length - 1 ? 0 : prev + 1))
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 h-16">
            <Link href="/" className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to search</span>
            </Link>
            <div className="flex-1"></div>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isWishlisted
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'text-text-primary hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Property Images */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3 relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={property.imageUrls[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
              />
              <button
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="lg:hidden grid grid-cols-4 gap-2">
              {property.imageUrls.slice(0, 4).map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all ${
                    currentImageIndex === index
                      ? 'border-2 border-primary shadow-md'
                      : 'hover:opacity-80'
                  }`}
                >
                  <Image src={imageUrl} alt={`Image ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="hidden lg:block flex flex-col gap-2">
              {property.imageUrls.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all ${
                    currentImageIndex === index
                      ? 'border-2 border-primary shadow-md'
                      : 'hover:opacity-80'
                  }`}
                >
                  <Image src={imageUrl} alt={`Image ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Title and Host */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{property.title}</h1>
                  {property.superhost && (
                    <span className="px-2 py-1 text-xs font-semibold bg-white text-text-primary rounded-full border border-gray-200">
                      Superhost
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{property.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>{property.rating}</span>
                    <span>({property.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Host Information */}
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-100">
                <div className="relative">
                  <Image
                    src={property.host.avatar}
                    alt={property.host.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  {property.host.verified && (
                    <div className="absolute -bottom-1 -right-1 p-1 bg-blue-500 rounded-full">
                      <CheckCircle className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Hosted by {property.host.name}</p>
                  <p className="text-xs text-text-secondary">
                    Joined in {property.host.joined} • {property.host.responseRate}% response rate • {property.host.responseTime}
                  </p>
                </div>
                <button className="ml-auto btn-secondary">
                  Contact host
                </button>
              </div>

              {/* Description */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-text-primary mb-4">About this place</h2>
                <div className="prose max-w-none">
                  <p className="text-text-primary leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </div>

              {/* Space Details */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Where you'll sleep</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{property.bedCount} bed</p>
                      {property.bedroomCount > 0 && (
                        <p className="text-xs text-text-secondary">{property.bedroomCount} bedroom</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{property.bathroomCount} bathroom</p>
                      <p className="text-xs text-text-secondary">Private</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-text-primary mb-4">What this place offers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-2xl">{amenity.icon}</span>
                      <span className="text-sm text-text-primary">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-text-primary mb-4">House rules</h2>
                <ul className="space-y-3 text-text-primary">
                  {property.houseRules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cancellation Policy */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Cancellation policy</h2>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <p className="text-text-primary">{property.cancellationPolicy}</p>
                </div>
              </div>

              {/* Reviews */}
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">Reviews</h2>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-xl font-bold text-text-primary">{property.rating}</span>
                    <span className="text-text-secondary">({property.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Review Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm text-text-secondary w-12">{rating} stars</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%' }}
                          ></div>
                        </div>
                        <span className="text-sm text-text-secondary w-8">{rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">Cleanliness</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-text-primary">4.9</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">Accuracy</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-text-primary">4.8</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">Communication</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-text-primary">4.9</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">Location</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-text-primary">5.0</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">Check-in</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-text-primary">4.8</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-text-secondary mb-1">Value</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-text-primary">4.7</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center space-x-4 mb-4">
                        <Image
                          src={review.avatar}
                          alt={review.author}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{review.author}</p>
                          <p className="text-xs text-text-secondary">{review.date}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-medium text-text-primary">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-text-primary leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Show More Reviews */}
                <div className="mt-8 text-center">
                  <button className="px-6 py-3 text-sm font-medium text-text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Show more reviews
                  </button>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                  {/* Price */}
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-text-primary">${property.price}</span>
                      <span className="text-text-secondary"> night</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-text-primary">{property.rating}</span>
                      <span className="text-sm text-text-secondary">({property.reviewCount})</span>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <label className="block px-3 py-2 text-xs font-medium text-text-secondary">
                        CHECK-IN
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-1 text-sm focus:outline-none"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      />
                    </div>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <label className="block px-3 py-2 text-xs font-medium text-text-secondary">
                        CHECK-OUT
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-1 text-sm focus:outline-none"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
                    <label className="block px-3 py-2 text-xs font-medium text-text-secondary">
                      GUESTS
                    </label>
                    <select
                      className="w-full px-3 py-1 text-sm focus:outline-none"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Book Now Button */}
                  <button className="w-full btn-primary mb-4">
                    {property.instantBook ? 'Instant book' : 'Request to book'}
                  </button>

                  {/* Price Breakdown */}
                  {checkInDate && checkOutDate && (
                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">${property.price} x {Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)))} nights</span>
                        <span className="text-text-primary">${property.price * Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)))}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Cleaning fee</span>
                        <span className="text-text-primary">$30</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Service fee</span>
                        <span className="text-text-primary">$15</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-semibold mt-3 pt-3 border-t border-gray-200">
                        <span className="text-text-primary">Total</span>
                        <span className="text-text-primary">${property.price * Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))) + 45}</span>
                      </div>
                    </div>
                  )}

                  {/* Airbnb Guarantee */}
                  <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-xs text-blue-800">
                      <Shield className="w-4 h-4" />
                      <span>Your booking is covered by Airbnb's Guest Refund Policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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