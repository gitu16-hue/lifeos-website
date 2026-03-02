'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  MapPin, 
  Users, 
  Zap, 
  Activity, 
  Sparkles, 
  Network, 
  Eye,
  Radio,
  Satellite,
  Navigation,
  Compass,
  CircleDot,
  RadioTower,
  Download,
  Upload,
  Signal,
  Wifi
} from 'lucide-react';

export function WorldMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<[number, number][]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Real cities with actual coordinates (normalized for map)
  const cities = [
    // North America
    { id: 0, name: 'San Francisco', users: 1243, lat: 37.77, lng: -122.41, country: 'USA', region: 'nam' },
    { id: 1, name: 'New York', users: 2123, lat: 40.71, lng: -74.00, country: 'USA', region: 'nam' },
    { id: 2, name: 'Toronto', users: 876, lat: 43.65, lng: -79.38, country: 'Canada', region: 'nam' },
    { id: 3, name: 'Mexico City', users: 654, lat: 19.43, lng: -99.13, country: 'Mexico', region: 'nam' },
    { id: 4, name: 'Los Angeles', users: 987, lat: 34.05, lng: -118.24, country: 'USA', region: 'nam' },
    { id: 5, name: 'Chicago', users: 765, lat: 41.87, lng: -87.62, country: 'USA', region: 'nam' },
    
    // South America
    { id: 6, name: 'Sao Paulo', users: 987, lat: -23.55, lng: -46.63, country: 'Brazil', region: 'sam' },
    { id: 7, name: 'Buenos Aires', users: 543, lat: -34.60, lng: -58.38, country: 'Argentina', region: 'sam' },
    { id: 8, name: 'Rio de Janeiro', users: 654, lat: -22.90, lng: -43.17, country: 'Brazil', region: 'sam' },
    { id: 9, name: 'Lima', users: 432, lat: -12.04, lng: -77.04, country: 'Peru', region: 'sam' },
    { id: 10, name: 'Bogota', users: 387, lat: 4.71, lng: -74.07, country: 'Colombia', region: 'sam' },
    
    // Europe
    { id: 11, name: 'London', users: 1876, lat: 51.50, lng: -0.12, country: 'UK', region: 'eur' },
    { id: 12, name: 'Berlin', users: 1432, lat: 52.52, lng: 13.40, country: 'Germany', region: 'eur' },
    { id: 13, name: 'Paris', users: 1567, lat: 48.85, lng: 2.35, country: 'France', region: 'eur' },
    { id: 14, name: 'Amsterdam', users: 876, lat: 52.37, lng: 4.89, country: 'Netherlands', region: 'eur' },
    { id: 15, name: 'Barcelona', users: 765, lat: 41.38, lng: 2.17, country: 'Spain', region: 'eur' },
    { id: 16, name: 'Rome', users: 654, lat: 41.90, lng: 12.49, country: 'Italy', region: 'eur' },
    { id: 17, name: 'Moscow', users: 987, lat: 55.75, lng: 37.61, country: 'Russia', region: 'eur' },
    { id: 18, name: 'Stockholm', users: 543, lat: 59.32, lng: 18.06, country: 'Sweden', region: 'eur' },
    { id: 19, name: 'Vienna', users: 432, lat: 48.20, lng: 16.37, country: 'Austria', region: 'eur' },
    { id: 20, name: 'Prague', users: 387, lat: 50.07, lng: 14.43, country: 'Czech Republic', region: 'eur' },
    
    // Asia
    { id: 21, name: 'Singapore', users: 1432, lat: 1.35, lng: 103.81, country: 'Singapore', region: 'asia' },
    { id: 22, name: 'Tokyo', users: 1987, lat: 35.67, lng: 139.65, country: 'Japan', region: 'asia' },
    { id: 23, name: 'Seoul', users: 1543, lat: 37.56, lng: 126.97, country: 'South Korea', region: 'asia' },
    { id: 24, name: 'Shanghai', users: 1654, lat: 31.23, lng: 121.47, country: 'China', region: 'asia' },
    { id: 25, name: 'Mumbai', users: 1432, lat: 19.07, lng: 72.87, country: 'India', region: 'asia' },
    { id: 26, name: 'Dubai', users: 987, lat: 25.20, lng: 55.27, country: 'UAE', region: 'asia' },
    { id: 27, name: 'Bangkok', users: 765, lat: 13.73, lng: 100.50, country: 'Thailand', region: 'asia' },
    { id: 28, name: 'Jakarta', users: 654, lat: -6.20, lng: 106.81, country: 'Indonesia', region: 'asia' },
    { id: 29, name: 'Hong Kong', users: 876, lat: 22.31, lng: 114.16, country: 'China', region: 'asia' },
    { id: 30, name: 'Taipei', users: 543, lat: 25.03, lng: 121.56, country: 'Taiwan', region: 'asia' },
    { id: 31, name: 'Delhi', users: 987, lat: 28.61, lng: 77.23, country: 'India', region: 'asia' },
    { id: 32, name: 'Istanbul', users: 765, lat: 41.00, lng: 28.97, country: 'Turkey', region: 'asia' },
    { id: 33, name: 'Tel Aviv', users: 432, lat: 32.08, lng: 34.78, country: 'Israel', region: 'asia' },
    
    // Oceania
    { id: 34, name: 'Sydney', users: 876, lat: -33.86, lng: 151.20, country: 'Australia', region: 'oce' },
    { id: 35, name: 'Melbourne', users: 654, lat: -37.81, lng: 144.96, country: 'Australia', region: 'oce' },
    { id: 36, name: 'Auckland', users: 432, lat: -36.84, lng: 174.76, country: 'New Zealand', region: 'oce' },
    { id: 37, name: 'Perth', users: 321, lat: -31.95, lng: 115.86, country: 'Australia', region: 'oce' },
    
    // Africa
    { id: 38, name: 'Cape Town', users: 543, lat: -33.92, lng: 18.42, country: 'South Africa', region: 'afr' },
    { id: 39, name: 'Lagos', users: 654, lat: 6.45, lng: 3.39, country: 'Nigeria', region: 'afr' },
    { id: 40, name: 'Nairobi', users: 432, lat: -1.28, lng: 36.82, country: 'Kenya', region: 'afr' },
    { id: 41, name: 'Cairo', users: 543, lat: 30.04, lng: 31.23, country: 'Egypt', region: 'afr' },
    { id: 42, name: 'Johannesburg', users: 387, lat: -26.20, lng: 28.04, country: 'South Africa', region: 'afr' },
    { id: 43, name: 'Casablanca', users: 321, lat: 33.57, lng: -7.58, country: 'Morocco', region: 'afr' },
  ];

  // Safe conversion of lat/lng to x/y with validation
  const projectToXY = (lat: number, lng: number) => {
    try {
      // Validate inputs
      if (isNaN(lat) || isNaN(lng) || !isFinite(lat) || !isFinite(lng)) {
        console.warn('Invalid coordinates:', { lat, lng });
        return { x: 50, y: 50 }; // Default to center
      }
      
      // Mercator projection approximation
      const x = ((lng + 180) / 360) * 100;
      
      // Clamp latitude to valid range for mercator projection
      const clampedLat = Math.max(-85, Math.min(85, lat));
      const y = 50 - (Math.log(Math.tan((clampedLat * Math.PI) / 180 + Math.PI / 4)) * (50 / Math.PI));
      
      // Ensure values are within bounds and valid
      return { 
        x: Math.min(100, Math.max(0, x)), 
        y: Math.min(95, Math.max(5, y))
      };
    } catch (error) {
      console.error('Error projecting coordinates:', { lat, lng, error });
      return { x: 50, y: 50 }; // Default to center on error
    }
  };

  const cityPositions = cities.map(city => {
    const { x, y } = projectToXY(city.lat, city.lng);
    return {
      ...city,
      x: Number(x.toFixed(2)), // Ensure it's a proper number
      y: Number(y.toFixed(2))
    };
  }).filter(city => !isNaN(city.x) && !isNaN(city.y)); // Remove any invalid positions

  const totalUsers = cityPositions.reduce((sum, city) => sum + city.users, 0);
  const onlineNow = Math.floor(totalUsers * 0.18);

  // Animated counter
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    count.set(0);
    animate(count, totalUsers, { duration: 2, ease: "easeOut" });

    // Create random connections
    const interval = setInterval(() => {
      if (cityPositions.length < 2) return;
      
      const numConnections = 6;
      const pairs: [number, number][] = [];
      for (let i = 0; i < numConnections; i++) {
        const idx1 = Math.floor(Math.random() * cityPositions.length);
        let idx2 = Math.floor(Math.random() * cityPositions.length);
        while (idx2 === idx1) {
          idx2 = Math.floor(Math.random() * cityPositions.length);
        }
        pairs.push([idx1, idx2]);
      }
      setActiveConnections(pairs);
    }, 4000);

    return () => clearInterval(interval);
  }, [count, totalUsers, cityPositions.length]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-4">
            <Globe className="w-4 h-4 text-secondary" />
            <span className="text-xs font-medium">Global Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Active <span className="text-gradient">Worldwide</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Real-time neural network across {cityPositions.length} cities in 28 countries
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-8 glass p-4 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold text-gradient">
                <motion.span>{roundedCount}</motion.span>
              </div>
              <div className="text-xs text-gray-400">Total Users</div>
            </div>
          </div>
          
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Signal className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-gradient">{onlineNow}</div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                Online Now
              </div>
            </div>
          </div>
          
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <div className="text-xl font-bold text-gradient">{cityPositions.length}</div>
              <div className="text-xs text-gray-400">Cities</div>
            </div>
          </div>
        </motion.div>

        {/* Main Map Container */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full bg-gradient-to-b from-blue-950/50 to-blue-900/50 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl"
          style={{ aspectRatio: '21/9' }}
        >
          {/* Ocean Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-blue-900/80" />
          
          {/* World Map SVG - Actual continents */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-60" 
            viewBox="0 0 1000 500" 
            preserveAspectRatio="xMidYMid meet"
          >
            {/* North America */}
            <path 
              d="M150,120 L200,100 L250,110 L280,150 L260,200 L200,220 L140,200 L120,160 Z" 
              fill="rgba(40,55,70,0.6)" 
              stroke="rgba(108,92,231,0.3)" 
              strokeWidth="1"
            />
            {/* South America */}
            <path 
              d="M280,250 L320,280 L330,340 L280,360 L230,330 L240,280 Z" 
              fill="rgba(40,55,70,0.6)" 
              stroke="rgba(108,92,231,0.3)" 
              strokeWidth="1"
            />
            {/* Europe */}
            <path 
              d="M480,120 L520,100 L560,110 L570,150 L530,170 L490,160 L470,140 Z" 
              fill="rgba(40,55,70,0.6)" 
              stroke="rgba(108,92,231,0.3)" 
              strokeWidth="1"
            />
            {/* Africa */}
            <path 
              d="M520,180 L560,200 L570,260 L540,300 L490,280 L480,230 Z" 
              fill="rgba(40,55,70,0.6)" 
              stroke="rgba(108,92,231,0.3)" 
              strokeWidth="1"
            />
            {/* Asia */}
            <path 
              d="M590,110 L700,100 L750,130 L760,180 L700,210 L630,200 L590,160 Z" 
              fill="rgba(40,55,70,0.6)" 
              stroke="rgba(108,92,231,0.3)" 
              strokeWidth="1"
            />
            {/* Australia */}
            <path 
              d="M770,300 L820,310 L830,350 L780,360 L740,330 Z" 
              fill="rgba(40,55,70,0.6)" 
              stroke="rgba(108,92,231,0.3)" 
              strokeWidth="1"
            />
          </svg>

          {/* Grid overlay - subtle */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(108,92,231,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,245,212,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />

          {/* Connection lines - with safe rendering */}
          <svg className="absolute inset-0 w-full h-full">
            {activeConnections.map(([idx1, idx2], i) => {
              const city1 = cityPositions[idx1];
              const city2 = cityPositions[idx2];
              
              // Skip if cities don't exist
              if (!city1 || !city2) return null;
              
              // Scale coordinates to SVG viewBox (0-1000, 0-500)
              // Ensure values are valid numbers
              const x1 = !isNaN(city1.x) ? city1.x * 10 : 500;
              const y1 = !isNaN(city1.y) ? city1.y * 5 : 250;
              const x2 = !isNaN(city2.x) ? city2.x * 10 : 500;
              const y2 = !isNaN(city2.y) ? city2.y * 5 : 250;
              
              return (
                <g key={`conn-${i}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#00F5D4"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                  <circle cx={x1} cy={y1} r="2" fill="#00F5D4" opacity="0.5">
                    <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={x2} cy={y2} r="2" fill="#00F5D4" opacity="0.5">
                    <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* City Markers - with safe rendering */}
          {cityPositions.map((city) => {
            // Skip if coordinates are invalid
            if (isNaN(city.x) || isNaN(city.y)) return null;
            
            const size = Math.max(6, Math.min(10, 5 + (city.users / 500)));
            const isActive = activeConnections.some(([a, b]) => a === city.id || b === city.id);
            
            return (
              <motion.div
                key={city.id}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredCity(city.name)}
                onHoverEnd={() => setHoveredCity(null)}
                onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                style={{ 
                  left: `${city.x}%`, 
                  top: `${city.y}%` 
                }}
              >
                {/* Glow ring */}
                <div 
                  className={`absolute rounded-full ${
                    isActive ? 'bg-secondary' : 'bg-primary'
                  } opacity-30 blur-sm transition-all duration-300 group-hover:opacity-60`}
                  style={{ width: size * 6, height: size * 6, left: -size * 3, top: -size * 3 }}
                />
                
                {/* Pulse ring */}
                <div 
                  className={`absolute rounded-full animate-ping ${
                    isActive ? 'bg-secondary' : 'bg-primary'
                  } opacity-50`}
                  style={{ width: size * 4, height: size * 4, left: -size * 2, top: -size * 2 }}
                />
                
                {/* Main marker */}
                <div 
                  className={`relative rounded-full ${
                    isActive 
                      ? 'bg-gradient-to-r from-secondary to-primary' 
                      : 'bg-gradient-to-r from-primary to-secondary'
                  } shadow-lg transition-transform duration-300 group-hover:scale-150`}
                  style={{ width: size * 2, height: size * 2 }}
                >
                  <div className="absolute inset-0.5 bg-white rounded-full opacity-90" />
                </div>

                {/* City label on hover */}
                {hoveredCity === city.name && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 glass p-2 rounded-lg whitespace-nowrap z-30 min-w-[120px]">
                    <div className="font-bold text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      {city.name}
                    </div>
                    <div className="text-[10px] text-gray-400">{city.country}</div>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-gray-400">Users</span>
                      <span className="text-secondary font-bold">{city.users}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Live activity indicator */}
          <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-2 z-30">
            <div className="relative">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
              <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <span className="text-xs font-medium">Live Network</span>
          </div>

          {/* Data transfer indicator */}
          <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-full flex items-center gap-2 z-30">
            <Wifi className="w-3 h-3 text-secondary animate-pulse" />
            <span className="text-xs font-medium">Mesh Active</span>
          </div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>{cityPositions.length} Active Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-3 h-3" />
            <span>2.4 TB/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Upload className="w-3 h-3" />
            <span>1.8 TB/s</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-3 h-3" />
            <span>Real-time sync</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}