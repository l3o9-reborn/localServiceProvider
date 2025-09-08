import {
  CircuitBoardIcon,
  
  Hammer,
  Truck,
  BookOpen,
  BrushCleaning,

} from 'lucide-react'
import { title } from 'process'


export const navElementsWithLinks = [
  { name: 'Home', link: '/' },
  { name: 'Get Service Near You', link: '/getservice' },
  { name: 'Be A Service Provider', link: '/beaserviceprovider' },
  { name: 'Your Contacts', link: '/your-contacts'},
  { name: 'About Us', link: '/about' },
  { name: 'Contact Us', link: '/contact' },
]
const popularServices = [
  {
    logo: CircuitBoardIcon,
    service: 'Electrician',
    description:
      'Expert help with wiring, fan/light installation, power issues, and other electrical repairs for homes and shops.',
  },
  {
    logo: Hammer,
    service: 'Plumber',
    description:
      'Quick fixes for pipe leaks, bathroom fittings, kitchen sinks, water tanks, and plumbing maintenance.',
  },
  {
    logo: Hammer,
    service: 'House Building',
    description:
      'Skilled labor and contractor support for building homes, boundary walls, and small construction projects.',
  },
  {
    logo: Truck,
    service: 'Help Moving',
    description:
      'Reliable moving help for shifting houses, office setups, or transporting furniture and appliances locally.',
  },
  {
    logo: BookOpen,
    service: 'Tuition',
    description:
      'Qualified home tutors for school students (Bangla & English medium), SSC/HSC prep, and subject-wise support.',
  },
  {
    logo: BrushCleaning,
    service: 'Cleaning',
    description:
      'Affordable home, office, and deep cleaning services including washroom, floor, and kitchen cleanup.',
  },
];

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
    second: 'Get direct call from Customer, work on your own Schedule and Price.',
    third: 'Get discovered by people near you who need your help.',
  },
  {
    heading: 'Why Join Us?',
    first: 'No Upfront Costs — sign up and start offering services for free.',
    second: 'Instant Bookings — connect directly with clients, no middleman.',
    third: ' Enrich Your Community — Help your own community with your skill',
  },
  {
    heading: 'How It Works',
    first:
      'Create Your Profile Add your photo, skills, service categories, and a short bio.',
    second:
      'Client will get your direct number and Call you to make a deal',
    third:
      'Start Receiving calls from your clients, and build your reputation.',
  },
]
