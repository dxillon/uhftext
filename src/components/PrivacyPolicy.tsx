import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Film, Camera, Video, Handshake, ShieldCheck  } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Production Data Protection",
      content: "We collect and handle only the necessary production-related data required to deliver exceptional results. All client and project data — including scripts, shot lists, production schedules, and creative assets — are securely stored using encrypted systems and access-controlled environments. We implement strict protocols to prevent unauthorized access, alteration, or misuse of your production information."
    },
    {
      icon: Lock,
      title: "Client Confidentiality",
      content: "Client trust is the foundation of our business. All information you share with us — including project concepts, business strategies, personal details, and contractual terms — remains strictly confidential. We never disclose client data to third parties without explicit consent. Every member of our team is bound by confidentiality agreements, ensuring your ideas and information remain protected."
    },
    {
      icon: Eye,
      title: "Content Security",
      content: "Your creative assets deserve the highest level of protection. Whether it's raw footage, edited videos, scripts, graphics, or final deliverables, we employ secure transfer methods, encrypted backups, and controlled access systems. Only authorized personnel are allowed to work with your content, ensuring its integrity from inception to delivery."
    },
    {
      icon: Film,
      title: "Footage Protection",
      content: "All footage captured during production is treated as sensitive property. We ensure secure storage both on-set and off-set, with regular backups and redundant systems to prevent data loss. Access to raw and edited footage is limited strictly to the production team assigned to your project, preserving the exclusivity and confidentiality of your material."
    },
    {
      icon: Camera,
      title: "On-Set Privacy",
      content: "We respect the privacy of everyone on set — from clients and talent to crew and collaborators. We maintain closed sets when necessary, restrict behind-the-scenes photography without permission, and enforce clear privacy protocols. Any personal or professional information gathered during filming is handled with discretion and used solely for project-related purposes."
    },
    {
      icon: Video,
      title: "Distribution Security",
      content: "When it’s time to deliver your final project, we ensure that distribution happens securely. Files are shared through encrypted platforms, and we provide secure download links with expiration dates when necessary. We never share your content publicly or with third parties unless you explicitly authorize us to do so."
    },
    {
      icon: Handshake ,
      title: "Third-Party Service Providers",
      content: "At times, to support our production process and ensure seamless delivery, we may collaborate with trusted third-party service providers. These may include, but are not limited to, cloud storage providers, post-production studios, freelance specialists, legal advisors, or content distribution platforms. We ensure that all third parties we work with are contractually bound to maintain strict confidentiality and adhere to the same security and privacy standards that we uphold internally. Before sharing any project data or footage, we vet each provider's security policies, enforce non-disclosure agreements (NDAs) where necessary, and limit access only to the data essential for the service being performed. Under no circumstances will we sell, share, or disclose client information or content for marketing or unauthorized purposes."
    },
    {
      icon: ShieldCheck ,
      title: "Rights of the Client",
      content: "We believe in empowering our clients with full control over their data and content. Clients have the right to request access to any personal data or production-related materials we hold about them. This includes viewing stored content, understanding how it is used, and requesting corrections if any information is inaccurate. Furthermore, clients may request the secure deletion of their data or footage upon project completion, provided that it does not conflict with any legal retention requirements or contractual obligations. To exercise these rights, clients can simply reach out to us via the contact information provided on our website. We are committed to responding to all legitimate requests within a reasonable timeframe and ensuring complete transparency throughout the process."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center text-gradient"
        >
          Privacy Policy
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-center max-w-3xl mx-auto mb-16"
        >
          At UH Films, privacy isn’t just a policy — it's a commitment woven into everything we do. We understand the value of your creative work and the trust you place in us. By choosing to work with us, you can be confident that your ideas, your projects, and your privacy are always protected with the utmost care.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:bg-white/5 transition-all duration-300"
            >
              <section.icon className="w-8 h-8 text-red-500 mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
              <p className="text-gray-300">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 card"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Our Privacy Team</h2>
<p className="text-gray-300">
  For any privacy-related concerns or questions about how we handle your production data, 
  please contact our dedicated privacy team at 
<button
  onClick={() => window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=operations@uhfilms.com&su=Privacy%20Policy%20Inquiry&body=Dear%20Privacy%20Team%2C%0A%0AI%20have%20a%20privacy-related%20question%20regarding%20Urban%20Hustle%20Films.%0A%0ADetails%3A%0A%0A-%0A%0AThank%20you%2C%0A%5BYour%20Name%5D"}
  className="text-red-400 underline ml-1 bg-transparent border-none cursor-pointer"
>
  operations@uhfilms.in
</button>
</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;