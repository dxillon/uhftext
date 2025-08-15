import { Download, Lock, FileText, Folder } from 'lucide-react';

const MaterialsCard = ({ setShowPasswordModal, course }) => {
  return (
    <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden">
      {/* Mobile Button with Compact Points */}
      <div className="md:hidden">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 hover:bg-red-600 text-white transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm whitespace-nowrap">Download PDFs</span>
          </div>

          {/* Mobile Points - Compact Grid */}
          <div className="p-1 pt-2">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs">
              <li className="flex items-start gap-2 text-gray-300">
                <FileText className="w-3 h-3 mt-0.5 text-green-400 flex-shrink-0" />
                <span>Resources</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <FileText className="w-3 h-3 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Course slides</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <FileText className="w-3 h-3 mt-0.5 text-purple-400 flex-shrink-0" />
                <span>Notes</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <FileText className="w-3 h-3 mt-0.5 text-yellow-400 flex-shrink-0" />
                <span>Guides</span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Password sent on mail
            </p>
          </div>
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex items-center gap-3 p-4">
          <div className="bg-red-500/20 p-2 rounded-lg">
            <Lock className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">Course Materials</p>
            <p className="text-xs text-gray-400 mt-0.5">Download all resources</p>
          </div>
        </div>

        <div className="p-4 pt-0">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Folder className="w-3 h-3" />
            <span>Includes:</span>
          </div>
          <ul className="space-y-2 text-xs mb-4">
            <li className="flex items-start gap-2 text-gray-300">
              <FileText className="w-3 h-3 mt-0.5 text-green-400" />
              <span>Complete course slides</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <FileText className="w-3 h-3 mt-0.5 text-blue-400" />
              <span>Exercise worksheets</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <FileText className="w-3 h-3 mt-0.5 text-purple-400" />
              <span>Reference guides</span>
            </li>
          </ul>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download All Materials</span>
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Password sent after payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaterialsCard;