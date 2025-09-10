
import React, { useState, useEffect } from "react";
import { Content } from "@/entities/Content";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ClipboardList, 
  Target,
  ArrowLeft,
  Download,
  Eye,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const topicConfig = {
  "e-books": {
    icon: BookOpen,
    title: "E-BOOKS",
    color: "bg-blue-500",
    bgColor: "bg-blue-50"
  },
  "notes": {
    icon: FileText,
    title: "Notes PDFs",
    color: "bg-green-500",
    bgColor: "bg-green-50"
  },
  "questions": {
    icon: HelpCircle,
    title: "Books Q&A",
    color: "bg-orange-500",
    bgColor: "bg-orange-50"
  },
  "pyqs": {
    icon: ClipboardList,
    title: "PYQs & Solutions",
    color: "bg-purple-500",
    bgColor: "bg-purple-50"
  },
  "mock-tests": {
    icon: Target,
    title: "Mock Tests",
    color: "bg-red-500",
    bgColor: "bg-red-50"
  }
};

export default function Subject() {
  const [content, setContent] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("e-books");
  const [isLoading, setIsLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || '';
    setSubjectName(name);
    if (name) {
      loadContent(name);
    }
  }, []);

  const loadContent = async (subject) => {
    try {
      const data = await Content.filter({ subject });
      setContent(data);
    } catch (error) {
      console.error("Error loading content:", error);
    }
    setIsLoading(false);
  };

  const filteredContent = content.filter(item => item.topic === selectedTopic);

  const ContentCard = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group"
    >
      {item.image_url && (
        <div className="aspect-video bg-slate-100 rounded-lg mb-4 overflow-hidden">
          <img 
            src={item.image_url} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
      
      {item.author && (
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
          <User className="w-4 h-4" />
          <span>{item.author}</span>
        </div>
      )}
      
      {item.chapter && (
        <div className="text-sm text-slate-500 mb-3">Chapter: {item.chapter}</div>
      )}
      
      {item.description && (
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.description}</p>
      )}
      
      <div className="flex gap-2">
        {item.file_url && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm flex-1">
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm">
          <Eye className="w-4 h-4" />
          View
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-20 md:w-80 bg-white border-r border-slate-200 flex flex-col transition-all duration-300">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200">
          <Link 
            to={createPageUrl("Class9th")}
            className="flex items-center justify-center md:justify-start gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            <span className="hidden md:inline text-sm">Back to Subjects</span>
          </Link>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-slate-900 truncate">{subjectName}</h1>
            <p className="text-slate-600 text-sm mt-2">Select a topic to explore</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 md:p-4">
          <div className="space-y-2">
            {Object.entries(topicConfig).map(([key, config]) => {
              const IconComponent = config.icon;
              const isActive = selectedTopic === key;
              
              return (
                <motion.button
                  key={key}
                  onClick={() => setSelectedTopic(key)}
                  className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 md:p-4 rounded-xl transition-all duration-200 text-left ${
                    isActive 
                      ? `${config.bgColor} border-2 border-current text-slate-900 shadow-md` 
                      : "text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <div className="font-semibold">{config.title}</div>
                    <div className="text-xs opacity-75">
                      {content.filter(c => c.topic === key).length} items
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Topic Header */}
            <motion.div
              key={selectedTopic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${topicConfig[selectedTopic].color} rounded-xl flex items-center justify-center`}>
                  {React.createElement(topicConfig[selectedTopic].icon, { 
                    className: "w-6 h-6 text-white" 
                  })}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {topicConfig[selectedTopic].title}
                  </h2>
                  <p className="text-slate-600">
                    {filteredContent.length} resources available
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Content Grid */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse">
                      <div className="aspect-video bg-slate-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded mb-4 w-2/3"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-slate-200 rounded flex-1"></div>
                        <div className="h-8 bg-slate-200 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredContent.length > 0 ? (
                <motion.div
                  key={selectedTopic}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredContent.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ContentCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className={`w-16 h-16 ${topicConfig[selectedTopic].color} rounded-full flex items-center justify-center mx-auto mb-4 opacity-50`}>
                    {React.createElement(topicConfig[selectedTopic].icon, { 
                      className: "w-8 h-8 text-white" 
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No {topicConfig[selectedTopic].title} Available
                  </h3>
                  <p className="text-slate-600">
                    Resources for this topic will be added soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
