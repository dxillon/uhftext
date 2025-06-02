export interface Course {
  id: string;
  title: string;
    bestSeller?: boolean; 
  slug: string;
  description: string;
  coverImage: string;
  category: string;
  duration: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  pricing: {
    pdf: {
      price: number;
      features: string[];
    };
    professional: {
      price: number;
      features: string[];
    };
  };
  curriculum: {
    title: string;
    description: string;
    duration: string;
     points?: string[];
  }[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    bestSeller: true,
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 1,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
    {
    id: '2',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
    {
    id: '3',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },

    {
    id: '4',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
    {
    id: '5',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
    {
    id: '6',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
    {
    id: '7',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
    {
    id: '9',
    title: 'Mastering Film Production',
    slug: 'mastering-film-production',
    description: 'Learn the art and science of film production from industry experts. This comprehensive course covers everything from pre-production to post-production.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Film Production',
    duration: '12 weeks',
    instructor: {
      name: 'John Anderson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Award-winning filmmaker with 15 years of industry experience'
    },
    pricing: {
      pdf: {
        price: 299,
        features: [
          'Comprehensive course material',
          'Lifetime access to PDF resources',
          'Practice exercises and assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 999,
        features: [
          'All PDF package features',
          'Live sessions with instructor',
          'On-set experience',
          'Portfolio development',
          'Industry networking opportunities',
          'Personal mentorship',
          'Real project collaboration'
        ]
      }
    },
    curriculum: [
      {
        title: 'Introduction to Film Production',
        description: 'Understanding the basics of filmmaking and production workflow',
        duration: '1 week'
      },
      {
        title: 'Pre-production Essentials',
        description: 'Planning, scripting, and preparing for successful shoots',
        duration: '2 weeks'
      },
      {
        title: 'Production Techniques',
        description: 'Hands-on experience with cameras, lighting, and sound',
        duration: '4 weeks'
      },
      {
        title: 'Post-production Mastery',
        description: 'Editing, color grading, and final delivery',
        duration: '3 weeks'
      },
      {
        title: 'Industry Integration',
        description: 'Building your portfolio and entering the industry',
        duration: '2 weeks'
      }
    ]
  },
  {
    id: '9',
    title: 'Advanced Cinematography',
    slug: 'advanced-cinematography',
    description: 'Take your cinematography skills to the next level with advanced techniques and professional insights.',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    category: 'Cinematography',
    duration: '8 weeks',
    instructor: {
      name: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      bio: 'Renowned cinematographer with experience in feature films and commercials'
    },
    pricing: {
      pdf: {
        price: 562,
        features: [
          'Detailed course material',
          'Lifetime access to resources',
          'Practice assignments',
          'Certificate of completion'
        ]
      },
      professional: {
        price: 899,
        features: [
          'All PDF package features',
          'Weekly live sessions',
          'Hands-on camera workshops',
          'Equipment handling training',
          'Industry visits',
          'Personal feedback',
          'Project opportunities'
        ]
      }
    },
    curriculum: [
      {
        title: 'Camera Fundamentals',
        description: 'Understanding advanced camera operations and settings',
        duration: '2 weeks',
            points: [
      '3-point lighting setup',
      'Using reflectors and diffusers',
      'Lighting continuity in scenes'
    ]
      },
      {
        title: 'Lighting Techniques',
        description: 'Mastering natural and artificial lighting setups',
        duration: '2 weeks',
            points: [
      '3-point lighting setup',
      'Using reflectors and diffusers',
      'Lighting continuity in scenes'
    ]
      },
      {
        title: 'Composition and Movement',
        description: 'Advanced framing and camera movement techniques',
        duration: '2 weeks',
        points: [
      '3-point lighting setup',
      'Using reflectors and diffusers',
      'Lighting continuity in scenes'
    ]
      },
      { 
        title: 'Professional Workflow',
        description: 'Industry-standard practices and workflows',
        duration: '2 weeks',
            points: [
      '3-point lighting setup',
      'Using reflectors and diffusers',
      'Lighting continuity in scenes'
    ]
      }
    ]
  }
];