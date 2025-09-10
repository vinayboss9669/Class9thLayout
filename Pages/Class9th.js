import React, { useState, useEffect } from "react";
import { Subject } from "@/entities/Subject";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { 
  Calculator, 
  Atom, 
  Globe, 
  BookOpen, 
  Users, 
  Palette,
  Music,
  Dumbbell,
  Languages,
  Heart,
  Code,
  Briefcase
} from "lucide-react";

const subjectIcons = {
  "Mathematics": Calculator,
  "Science": Atom,
  "Social Science": Globe,
  "English": BookOpen,
  "Hindi": Languages,
  "Art": Palette,
  "Music": Music,
  "Physical Education": Dumbbell,
  "Sanskrit": Heart,
  "Computer Science": Code,
  "Life Skills": Users,
  "Work Education": Briefcase
};

export default function Class9th() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await Subject.list();
      setSubjects(data);
    } catch (error) {
      console.error("Error loading subjects:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Class 9th
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Resources</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Comprehensive study materials, practice tests, and resources for all subjects. 
          Choose your subject to get started.
        </p>
      </motion.div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject, index) => {
          const IconComponent = subjectIcons[subject.name] || BookOpen;
          
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={createPageUrl(`Subject?name=${encodeURIComponent(subject.name)}`)}
                className="block group"
              >
                <div className={`relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${subject.color} opacity-10 rounded-full -translate-y-8 translate-x-8`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {subject.name}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {subject.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span>Explore Resources</span>
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <div className="text-slate-600">Subjects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">5</div>
            <div className="text-slate-600">Resource Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-slate-600">Study Materials</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">24/7</div>
            <div className="text-slate-600">Access</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
