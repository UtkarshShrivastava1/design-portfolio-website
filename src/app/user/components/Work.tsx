import React, { useState, useEffect } from 'react';

interface WorkItem {
  id: number;
  companyName: string;
  logo: string;
  backgroundImage: string;
  category: string;
}

const MyWork: React.FC = () => {
  const workItems: WorkItem[] = [
    {
      id: 1,
      companyName: "WF Design + Build",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&crop=center",
      category: "Construction"
    },
    {
      id: 2,
      companyName: "Burkett & Co",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
      category: "Accounting"
    },
    {
      id: 3,
      companyName: "Chronicled",
      logo: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center",
      category: "Tech"
    },
    {
      id: 4,
      companyName: "GLC Solutions",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop&crop=center",
      category: "Solutions"
    },
    {
      id: 5,
      companyName: "Coupal",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
      category: "Real Estate"
    },
    {
      id: 6,
      companyName: "Wedler Engineering",
      logo: "https://images.unsplash.com/photo-1581092335878-9c8ef73df2ac?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center",
      category: "Engineering"
    },
    {
      id: 7,
      companyName: "TechFlow Dynamics",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&crop=center",
      category: "Technology"
    },
    {
      id: 8,
      companyName: "Apex Marketing",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1553028826-f4804151e0d0?w=800&h=600&fit=crop&crop=center",
      category: "Marketing"
    },
    {
      id: 9,
      companyName: "Innovate Labs",
      logo: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
      category: "Research"
    },
    {
      id: 10,
      companyName: "Creative Studio",
      logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&crop=center",
      category: "Design"
    },
    {
      id: 11,
      companyName: "DataViz Pro",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      category: "Analytics"
    },
    {
      id: 12,
      companyName: "BuildTech Solutions",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&crop=center",
      backgroundImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&crop=center",
      category: "Construction Tech"
    }
  ];

  const [currentSet, setCurrentSet] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const itemsPerSet = 6; // 2 rows × 3 columns = 6 items
  const totalSets = Math.ceil(workItems.length / itemsPerSet);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % totalSets);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSets]);

  const getCurrentItems = (): WorkItem[] => {
    const startIndex = currentSet * itemsPerSet;
    return workItems.slice(startIndex, startIndex + itemsPerSet);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            My <span className="text-yellow-400">Works</span>
          </h1>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-3"></div>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto px-4">
            Here are a few past design projects I&apos;ve worked on. Want to see more?{' '}
            <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer transition-colors">
              Email me
            </span>
          </p>
        </div>

        {/* Grid Container - Takes remaining space */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            <div className="relative overflow-hidden">
              <div 
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 sm:gap-6 transition-transform duration-1000 ease-in-out p-4 ${
                  isTransitioning ? '-translate-x-full opacity-50' : 'translate-x-0 opacity-100'
                }`}
              >
                {getCurrentItems().map((item, index) => (
                  <div
                    key={`${currentSet}-${item.id}`}
                    className="group relative h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 mb-8"
                    style={{
                      backgroundImage: `url(${item.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/90"></div>
                    
                    {/* Yellow accent border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-xl transition-all duration-300"></div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-4 sm:p-6">
                      {/* Category Tag */}
                      {/* <div className="self-start">
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div> */}
                      
                      {/* Logo */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/20 group-hover:border-yellow-400/50 transition-all duration-300 transform group-hover:scale-110">
                          <img 
                            src={item.logo} 
                            alt={`${item.companyName} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Company Name */}
                      <div className="text-center">
                        <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                          {item.companyName}
                        </h3>
                        <div className="w-0 group-hover:w-full h-0.5 bg-yellow-400 mx-auto transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        {/* <div className="flex justify-center pb-8 space-x-2 pt-4">
          {Array.from({ length: totalSets }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSet(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSet === index 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to set ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MyWork;