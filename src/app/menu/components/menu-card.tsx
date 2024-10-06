'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface MenuCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}

export function MenuCard({ title, description, href, imageSrc }: MenuCardProps) {
  return (
    <Link href={href}>
      <motion.div
        className="bg-gray-800/50 rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* <div className="relative h-48">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div> */}
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}