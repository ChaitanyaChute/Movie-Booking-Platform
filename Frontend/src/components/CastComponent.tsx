import { useEffect, useState } from 'react';

interface CastInterface {
  name: string;
  profile_pic: string;
}

const CastComponent = () => {
  const [cast, setCast] = useState<CastInterface[]>([]);

  useEffect(() => {
    const castFetch = async () => {
      try {
        const res = await fetch("http://localhost:3000/cast/details");
        const data: CastInterface[] = await res.json();

        const shuffled = data.sort(() => 0.5 - Math.random());

        const randomCount = Math.floor(Math.random() * 2) + 8;
        const selected = shuffled.slice(0, randomCount);

        setCast(selected);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      }
    };

    castFetch();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {cast.map((castDetails, index) => (
        <div key={index} className="flex flex-col items-center w-[80px]">
          <img
            src={castDetails.profile_pic}
            alt={castDetails.name}
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="text-center text-sm mt-2 text-gray-300">
            {castDetails.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CastComponent;
