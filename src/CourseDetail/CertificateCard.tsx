import { Award, Check, Clock, FileText,Folder, Shield } from 'lucide-react';

const CertificateCard = ({ setShowCertificateModal, setPolicyAgreed }) => {
  return (
    <div className="flex-1">
      {/* Mobile View */}
      <button
        onClick={() => setShowCertificateModal(true)}
        className="md:hidden w-full flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden"
      >
        {/* Colored Button Header */}
        <div className="w-full bg-orange-500 hover:bg-orange-600 p-3 transition-colors rounded-t-lg">
          <div className="flex items-center justify-center gap-2 text-white">
            <Folder className="w-4 h-4" />
            <span className="text-sm whitespace-nowrap">Request Certificate</span>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-3">
          <ul className="grid grid-cols-2 gap-2 text-xs">
            <li className="flex items-start gap-1 text-gray-300">
              <Check className="w-3 h-3 mt-0.5 text-green-400" />
              <span>Verified</span>
            </li>
            <li className="flex items-start gap-1 text-gray-300">
              <Check className="w-3 h-3 mt-0.5 text-green-400" />
              <span>Official badge</span>
            </li>
            <li className="flex items-start gap-1 text-gray-300">
              <Check className="w-3 h-3 mt-0.5 text-green-400" />
              <span>Shareable</span>
            </li>
            <li className="flex items-start gap-1 text-gray-300">
              <Clock className="w-3 h-3 mt-0.5 text-gray-400" />
              <span>1-2 days</span>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
            <Clock className="w-3 h-3" />
            <span>1-2 business days</span>
          </div>
        </div>
      </button>

      {/* Desktop View */}
      <div className="hidden md:block bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden">
        {/* Card Content */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <Award className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Course Certificate</p>
              <p className="text-xs text-gray-400 mt-0.5">Get your completion proof</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Shield className="w-3 h-3" />
              <span>Features:</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 text-gray-300">
                <Check className="w-3 h-3 mt-0.5 text-green-400" />
                <span>Official completion badge</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Check className="w-3 h-3 mt-0.5 text-green-400" />
                <span>Verification ID</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <Check className="w-3 h-3 mt-0.5 text-green-400" />
                <span>Shareable credential</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Action Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => {
              setShowCertificateModal(true);
              setPolicyAgreed(false);
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Request Certificate</span>
          </button>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
            <Clock className="w-3 h-3" />
            <span>1-2 business days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;