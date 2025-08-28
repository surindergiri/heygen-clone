import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthenticatedSidebar from 'components/ui/AuthenticatedSidebar';
import UserProfileHeader from 'components/ui/UserProfileHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Button from 'components/ui/Button';


import Icon from 'components/AppIcon';
import ProjectCard from './components/ProjectCard';
import ActivityFeed from './components/ActivityFeed';
import UsageMetrics from './components/UsageMetrics';
import SearchFilterBar from './components/SearchFilterBar';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);

  // Mock data for projects
  const mockProjects = [
    {
      id: 1,
      title: 'Corporate Avatar Video',
      type: 'image-to-avatar-video',
      thumbnail: '/public/assets/images/no_image.png',
      status: 'completed',
      createdAt: '2025-08-27T10:30:00Z',
      lastModified: '2025-08-27T14:45:00Z',
      duration: '2:30',
      description: 'Professional avatar video for company presentation'
    },
    {
      id: 2,
      title: 'Summer Sale Campaign',
      type: 'image-to-ads',
      thumbnail: '/public/assets/images/no_image.png',
      status: 'processing',
      createdAt: '2025-08-27T09:15:00Z',
      lastModified: '2025-08-27T12:20:00Z',
      progress: 65,
      description: 'Marketing campaign for summer sale promotion'
    },
    {
      id: 3,
      title: 'Spanish Tutorial Video',
      type: 'video-translation',
      thumbnail: '/public/assets/images/no_image.png',
      status: 'completed',
      createdAt: '2025-08-26T16:20:00Z',
      lastModified: '2025-08-27T11:30:00Z',
      languages: ['Spanish', 'French'],
      description: 'Educational content translated to multiple languages'
    },
    {
      id: 4,
      title: 'Product Demo Avatar',
      type: 'image-to-avatar-video',
      thumbnail: '/public/assets/images/no_image.png',
      status: 'draft',
      createdAt: '2025-08-25T14:10:00Z',
      lastModified: '2025-08-25T16:45:00Z',
      description: 'Avatar demonstration for new product features'
    },
    {
      id: 5,
      title: 'Holiday Campaign Ads',
      type: 'image-to-ads',
      thumbnail: '/public/assets/images/no_image.png',
      status: 'failed',
      createdAt: '2025-08-24T11:30:00Z',
      lastModified: '2025-08-24T13:15:00Z',
      error: 'Processing failed due to image format',
      description: 'Holiday season marketing materials'
    },
    {
      id: 6,
      title: 'Training Video Translation',
      type: 'video-translation',
      thumbnail: '/public/assets/images/no_image.png',
      status: 'processing',
      createdAt: '2025-08-23T08:45:00Z',
      lastModified: '2025-08-27T10:20:00Z',
      progress: 80,
      description: 'Employee training content for global teams'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadProjects = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    };

    loadProjects();
  }, []);

  useEffect(() => {
    // Filter and search projects
    let filtered = [...projects];

    // Filter by feature type
    if (selectedFeature !== 'all') {
      filtered = filtered?.filter(project => project?.type === selectedFeature);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered?.filter(project => project?.status === selectedStatus);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(query) ||
        project?.description?.toLowerCase()?.includes(query) ||
        project?.type?.toLowerCase()?.includes(query)
      );
    }

    // Sort projects
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b?.lastModified) - new Date(a?.lastModified);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedFeature, selectedStatus, sortBy]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getProjectsByType = (type) => {
    return projects?.filter(project => project?.type === type);
  };

  const getTypeDisplayName = (type) => {
    const typeMap = {
      'image-to-avatar-video': 'Image to Avatar Video',
      'image-to-ads': 'Image to Ads',
      'video-translation': 'Video Translation'
    };
    return typeMap?.[type] || type;
  };

  const getCreateNewPaths = () => [
    {
      type: 'image-to-avatar-video',
      path: '/image-to-avatar-video',
      icon: 'UserCircle',
      title: 'Create Avatar Video',
      description: 'Transform images into talking avatars'
    },
    {
      type: 'image-to-ads',
      path: '/image-to-ads',
      icon: 'Megaphone',
      title: 'Create Ad Campaign',
      description: 'Generate compelling ad content from images'
    },
    {
      type: 'video-translation',
      path: '/video-translation',
      icon: 'Languages',
      title: 'Translate Video',
      description: 'Translate videos to multiple languages'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AuthenticatedSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle}
      />

      {/* Header */}
      <UserProfileHeader />

      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } mt-16 lg:mb-0 mb-20`}>
        <div className="p-6 space-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage all your video projects and campaigns
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                iconName="Download"
                iconSize={16}
              >
                Export Data
              </Button>
              <Button 
                iconName="Plus"
                iconSize={16}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                New Project
              </Button>
            </div>
          </div>

          {/* Quick Create Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getCreateNewPaths()?.map((item) => (
              <Link
                key={item?.type}
                to={item?.path}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-200">
                    <Icon name={item?.icon} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {item?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item?.description}
                    </p>
                  </div>
                  <Icon 
                    name="ArrowRight" 
                    size={20} 
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Projects Section */}
            <div className="xl:col-span-3 space-y-6">
              {/* Search and Filter Bar */}
              <SearchFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFeature={selectedFeature}
                onFeatureChange={setSelectedFeature}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                sortBy={sortBy}
                onSortChange={setSortBy}
                projectsCount={filteredProjects?.length}
                totalCount={projects?.length}
              />

              {/* Projects Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)]?.map((_, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                      <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProjects?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Folder" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    {searchQuery || selectedFeature !== 'all' || selectedStatus !== 'all' ?'Try adjusting your filters or search terms.' :'Create your first project to get started with AvatarGen Studio.'}
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setSelectedFeature('all');
                      setSelectedStatus('all');
                    }}>
                      Clear Filters
                    </Button>
                    <Button iconName="Plus">
                      Create Project
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects?.map((project) => (
                    <ProjectCard 
                      key={project?.id} 
                      project={project}
                      onUpdate={(updatedProject) => {
                        setProjects(prev => prev?.map(p => 
                          p?.id === updatedProject?.id ? updatedProject : p
                        ));
                      }}
                      onDelete={(projectId) => {
                        setProjects(prev => prev?.filter(p => p?.id !== projectId));
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Usage Metrics */}
              <UsageMetrics projects={projects} />
              
              {/* Activity Feed */}
              <ActivityFeed projects={projects} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;