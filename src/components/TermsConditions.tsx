import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Scale, FileText, Shield, Clock, Film, Award, Pencil, CloudLightning,
  ShieldAlert,
  ClipboardCheck,
  Gavel,
  Edit3,
  CreditCard,
  Ban
} from 'lucide-react';

const TermsConditions = () => {
  const sections = [
    {
      icon: Scale,
      title: "Production Agreement",
      content: "All production services begin upon a signed agreement between the client and Urban Hustle Films™. The agreement outlines project scope, deliverables, deadlines, and costs. No project work will commence without a fully executed agreement. Any changes in project scope may result in adjusted timelines and additional charges."
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: "All pre-existing intellectual property, including logos, scripts, and concepts provided by the client, remains the client’s property. UH films ( Urban Hustle Films )retains the right to the creative techniques, raw project files, and underlying production assets unless otherwise specified. Final deliverables are transferred to the client upon full payment, with usage rights limited to the terms outlined in the production agreement."
    },
    {
      icon: Shield,
      title: "Confidentiality",
      content: "We understand the sensitivity of your ideas and information. All shared content, scripts, briefs, footage, and discussions are kept strictly confidential. Unless otherwise agreed in writing, we will not disclose or share your information with any third party outside the direct production team working on your project."
    },
    {
      icon: Clock,
      title: "Project Timeline",
      content: "Each project has a mutually agreed timeline detailed in the production agreement. Delays caused by the client (e.g., failure to provide assets, feedback, or approvals on time) may extend the timeline. UH films ( Urban Hustle Films )is not responsible for project delays due to client-side inaction or unforeseen events beyond our control."
    },
    {
      icon: Film,
      title: "Content Usage",
      content: "Completed projects may be showcased in our portfolio, showreels, social media, and promotional material unless a Non-Disclosure Agreement (NDA) is signed. If the client wishes to restrict use, this must be explicitly stated before project commencement."
    },
    {
      icon: Award,
      title: "Quality Standards",
      content: "We commit to delivering work that meets professional industry standards. However, creative work is subjective. Minor differences in artistic interpretation are not considered a failure to meet standards unless they fall outside of agreed project briefs."
    },
    {
      icon: CloudLightning,
      title: " Force Majeure (Unforeseen Circumstances)",
      content: "UH films ( Urban Hustle Films )is not liable for delays, interruptions, or failure to deliver services due to circumstances beyond our control, including but not limited to natural disasters, pandemics, equipment failure, strikes, or changes in law."
    },
    {
      icon: ShieldAlert,
      title: " Liability Limitation",
      content: "We are not responsible for any indirect, incidental, or consequential damages arising from the use or inability to use the final deliverables. The client's remedy is limited to refund or re-performance of the service."
    },
    {
      icon: ClipboardCheck,
      title: " Client Responsibilities",
      content: "Clients are responsible for obtaining all necessary permissions (e.g., location permits, participant releases) unless otherwise agreed. Clients must also ensure all content they provide does not infringe on third-party rights."
    },
    {
      icon: Gavel,
      title: " Dispute Resolution / Governing Law",
      content: "Any disputes arising under these Terms shall be governed by the laws of [Your State/Country]. Parties agree to attempt mediation before pursuing formal legal action."
    }
  ];

  const additionalTerms = [
    {
      icon: Edit3,
      title: "Revisions and Changes",
      content: "Each project includes a defined number of revisions (specified in the production agreement). Additional revisions beyond the agreed limit will be billed separately. Any major changes after project approval (such as re-shoots, re-edits, or scope expansion) will also incur additional charges."
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: "Payment structure (e.g., 50% upfront, 50% on delivery) will be detailed in the production agreement. All invoices are due within the specified time frame. Failure to pay on time may result in project delays, suspension of services, or legal recovery measures."
    },
    {
      icon: Ban,
      title: "Cancellation Policy",
      content: "If a project is canceled by the client after commencement, the client is responsible for payment of work completed up to the cancellation point. Deposits are non-refundable unless otherwise stated. UH films ( Urban Hustle Films )reserves the right to terminate projects due to breach of terms or non-payment, with all completed work and assets remaining our property until settlement."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms & Conditions – Urban Hustle Films</title>
        <meta name="description" content="Review the terms and conditions for using Urban Hustle Films' services, website, and content." />
        <link rel="canonical" href="https://uhfilms.in/terms" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms & Conditions – Urban Hustle Films" />
        <meta property="og:description" content="Review the legal terms for using Urban Hustle Films' platform, services, and content." />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content="https://uhfilms.in/terms" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions – Urban Hustle Films" />
        <meta name="twitter:description" content="Review the legal terms for using Urban Hustle Films' platform, services, and content." />
        <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />
      </Helmet>


      <div className="min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-16"
        >
          <motion.div className="text-center mb-16">
            <motion.h1
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="text-4xl font-bold text-white mb-8 text-gradient"
            >
              Terms & Conditions
            </motion.h1>
            <Pencil className="w-16 h-16 text-red-500 mx-auto mb-8" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 max-w-3xl mx-auto"
            >
              Welcome to UH films ( Urban Hustle Films ). These Terms and Conditions (“Terms”) govern all services provided by our production house. By engaging with our services, you agree to comply with these Terms. Please read them carefully to understand your rights and responsibilities.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
            className="space-y-8"
          >
            {additionalTerms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <term.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{term.title}</h3>
                <p className="text-gray-300">{term.content}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 card text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-300 mb-6">
              Our legal team is available to clarify any aspects of our terms and conditions.
              Contact us at legal@uhfilms.com for detailed information.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              onClick={() => {
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=operation@uhfilms.in&su=Legal%20Support%20Request&body=Dear%20Legal%20Team%2C%0A%0AI%20need%20assistance%20regarding%20[insert%20your%20issue%20here].%0A%0AThank%20you%2C%0A[Your%20Name]`;
                window.open(gmailUrl, '_blank');
              }}
            >
              Contact Legal Team
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default TermsConditions;