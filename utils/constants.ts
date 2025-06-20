import {
  Pen,
  WallpaperIcon,
  FileStackIcon,
  MonitorSmartphoneIcon,
  MonitorCogIcon,
  Brush,
  ListTreeIcon,
  FileVideo2,
} from 'lucide-react'
import { title } from 'process'

export const navElements = ['Home', 'About', 'Services', 'Contact']

const popularServices = [
  {
    logo: Brush,
    service: 'Graphic Design',
    description:
      'Logo, banner, flyer, and business card designs tailored for local businesses and events.',
  },
  {
    logo: MonitorCogIcon,
    service: 'Web Development',
    description:
      'Build modern websites using HTML, CSS, JavaScript, and popular frameworks like React or WordPress.',
  },
  {
    logo: Pen,
    service: 'Content Writing',
    description:
      'Blog posts, social media captions, SEO articles, and Bengali-English translation services.',
  },
  {
    logo: ListTreeIcon,
    service: 'Digital Marketing',
    description:
      'Social media management, Facebook ads, Google ads, and local brand promotion strategies.',
  },
  {
    logo: FileVideo2,
    service: 'Video Editing',
    description:
      'Short-form and long-form video editing for YouTube, weddings, and online businesses.',
  },
  {
    logo: MonitorSmartphoneIcon,
    service: 'Mobile App  Dev',
    description:
      'Android/iOS app development using Flutter or React Native for small businesses and startups.',
  },
  // {
  //   service: "Data Entry",
  //   description: "Fast and accurate data entry services for school, clinic, and small business databases."
  // },
  // {
  //   service: "Online Tutoring",
  //   description: "Math, English, and ICT tutoring via Zoom or Google Meet for school and college students."
  // },
  // {
  //   service: "UI/UX Design",
  //   description: "User interface and experience design for websites and apps using Figma or Adobe XD."
  // },
  // {
  //   service: "Voice Over & Dubbing",
  //   description: "Professional voice-over services in Bengali, English, or regional dialects for ads and videos."
  // },
  // {
  //   service: "Resume & CV Writing",
  //   description: "Professional CV, resume, and cover letter writing for job seekers and students."
  // },
  // {
  //   service: "Translation Services",
  //   description: "Document and subtitle translation between English, Bengali, Hindi, and other local languages."
  // },
]
export const popularServicesData = popularServices.map((service, index) => ({
  id: index + 1,
  ...service,
}))

export const serviceProviderSection = {
  title: 'Monetize Your Skills. Serve Your Community.',
  description:
    "Whether you're a plumber, tutor, designer, or developer — share your expertise and grow your client base locally.",
}

export const serviceCardsData = [
  {
    heading: 'What You Can Do',
    first:
      'Offer any service — from plumbing, beauty, tutoring, repair, to custom gigs.',
    second: 'Set your own prices, work on your own schedule.',
    third: 'Get discovered by people near you who need your help.',
  },
  {
    heading: 'Why Join Us?',
    first: 'No upfront costs — sign up and start offering services for free.',
    second: 'Instant bookings — connect directly with clients, no middleman.',
    third: ' Trusted profile — build credibility with ratings and reviews.',
  },
  {
    heading: 'How It Works',
    first:
      'Create Your Profile Add your photo, skills, service categories, and a short bio.',
    second:
      'Showcase Your Work Upload pictures, certificates, or testimonials to stand out.',
    third:
      'Start Receiving Requests Accept jobs, chat with clients, and build your reputation.',
  },
]
