'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Star } from 'lucide-react'
import { formatDistance } from 'date-fns'

interface Property {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
  superhost?: boolean
  instantBook?: boolean
  category?: string
  distance?: string
}

export default function PropertyCard({ property }: { property: Property }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <Link href={`/properties/${property.id}`} className="group">
      <div className="card overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            {property.superhost && (
              <span className="px-2 py-1 text-xs font-semibold bg-white text-text-primary rounded-full">
                Superhost
              </span>
            )}
            {property.instantBook && (
              <span className="px-2 py-1 text-xs font-semibold bg-white text-text-primary rounded-full">
                Instant book
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isWishlisted
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/80 backdrop-blur-sm hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Location */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2">
                {property.title}
              </h3>
              <div className="flex items-center text-sm text-text-secondary">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{property.location}</span>
                {property.distance && (
                  <span className="mx-2">•</span>
                )}
                {property.distance && (
                  <span>{property.distance}</span>
                )}
              </div>
            </div>
          </div>

          {/* Category */}
          {property.category && (
            <p className="text-sm text-text-secondary mb-2">{property.category}</p>
          )}

          {/* Price and Rating */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg font-semibold text-text-primary">${property.price}</span>
              <span className="text-sm text-text-secondary"> night</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-text-primary">{property.rating}</span>
              <span className="text-sm text-text-secondary">({property.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}