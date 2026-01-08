import { useState } from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { JobCard, Job } from '@/components/dashboard/JobCard';

// Extended Mock Data
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    logo: 'https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png',
    location: 'Bangalore (Hybrid)',
    salary: '₹25L - ₹40L',
    type: 'Full-time',
    postedAt: '2 days ago',
    matchScore: 92,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS']
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignStudio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png',
    location: 'Remote',
    salary: '₹18L - ₹28L',
    type: 'Full-time',
    postedAt: '5 hours ago',
    matchScore: 85,
    skills: ['Figma', 'UI/UX', 'Prototyping']
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'FinTech Solutions',
    logo: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    location: 'Mumbai',
    salary: '₹20L - ₹35L',
    type: 'Full-time',
    postedAt: '1 day ago',
    matchScore: 78,
    skills: ['Java', 'Spring Boot', 'PostgreSQL']
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudNative',
    logo: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    location: 'Pune (Remote)',
    salary: '₹15L - ₹25L',
    type: 'Contract',
    postedAt: '3 days ago',
    matchScore: 65,
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform']
  }
];

const FILTERS = [
  { category: 'Job Type', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  { category: 'Remote', options: ['On-site', 'Remote', 'Hybrid'] },
  { category: 'Experience', options: ['Entry Level', 'Mid-Senior', 'Director'] },
];

export const FindJobs = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Find Your Next Role</h1>
          <p className="text-muted-foreground">Browse thousands of jobs matched to your profile.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Filters</h3>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Clear</Button>
            </div>

            {FILTERS.map((section) => (
              <div key={section.category} className="space-y-3 pb-6 border-b border-border last:border-0 last:pb-0">
                <h4 className="font-medium text-sm">{section.category}</h4>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-input flex items-center justify-center group-hover:border-primary transition-colors">
                        {/* Checkbox mock */}
                      </div>
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search job title, company, or keywords" className="pl-10 h-12 text-lg" />
            </div>
            <Button size="lg" className="h-12 px-8 gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>

          <div className="flex items-center gap-2 pb-4 overflow-x-auto">
            <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-muted">Top Match</Badge>
            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">Newest</Badge>
            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">Remote First</Badge>
            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">Salary &gt; 20LPA</Badge>
          </div>

          <div className="grid gap-4">
            {MOCK_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
