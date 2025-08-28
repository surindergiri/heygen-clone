import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import { cn } from 'utils/cn';

const ProjectCard = ({ project, onUpdate, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        label: 'Completed',
        color: 'text-success',
        bg: 'bg-success/10',
        icon: 'CheckCircle'
      },
      processing: {
        label: 'Processing',
        color: 'text-warning',
        bg: 'bg-warning/10',
        icon: 'Clock'
      },
      draft: {
        label: 'Draft',
        color: 'text-muted-foreground',
        bg: 'bg-muted',
        icon: 'FileText'
      },
      failed: {
        label: 'Failed',
        color: 'text-error',
        bg: 'bg-error/10',
        icon: 'XCircle'
      }
    };
    return configs?.[status] || configs?.draft;
  };

  const getTypeConfig = (type) => {
    const configs = {
      'image-to-avatar-video': {
        label: 'Avatar Video',
        icon: 'UserCircle',
        color: 'text-blue-600',
        path: '/image-to-avatar-video'
      },
      'image-to-ads': {
        label: 'Ad Campaign',
        icon: 'Megaphone',
        color: 'text-green-600',
        path: '/image-to-ads'
      },
      'video-translation': {
        label: 'Video Translation',
        icon: 'Languages',
        color: 'text-purple-600',
        path: '/video-translation'
      }
    };
    return configs?.[type] || configs?.['image-to-avatar-video'];
  };

  const statusConfig = getStatusConfig(project?.status);
  const typeConfig = getTypeConfig(project?.type);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete?.(project?.id);
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    // Simulate download
    console.log('Downloading project:', project?.id);
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img
          src={project?.thumbnail}
          alt={project?.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/public/assets/images/no_image.png';
          }}
        />
        
        {/* Status Badge */}
        <div className={cn(
          "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
          statusConfig?.bg,
          statusConfig?.color
        )}>
          <Icon name={statusConfig?.icon} size={12} />
          {statusConfig?.label}
          {project?.progress && (
            <span className="ml-1">({project?.progress}%)</span>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
          <Icon name={typeConfig?.icon} size={12} className={typeConfig?.color} />
          {typeConfig?.label}
        </div>

        {/* Quick Actions Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity duration-200",
          showActions ? "opacity-100" : "opacity-0"
        )}>
          <Button
            size="sm"
            variant="secondary"
            iconName="Eye"
            iconSize={14}
            asChild
          >
            <Link to={`${typeConfig?.path}?project=${project?.id}`}>
              View
            </Link>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            iconName="Edit"
            iconSize={14}
          >
            Edit
          </Button>
          {project?.status === 'completed' && (
            <Button
              size="sm"
              variant="secondary"
              iconName="Download"
              iconSize={14}
              onClick={handleDownload}
            >
              Download
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground truncate flex-1 mr-2">
            {project?.title}
          </h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="w-3 h-3 border border-error border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon name="Trash2" size={12} className="text-error" />
              )}
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project?.description}
        </p>

        {/* Project Details */}
        <div className="space-y-2 text-xs text-muted-foreground">
          {project?.duration && (
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={12} />
              <span>Duration: {project?.duration}</span>
            </div>
          )}
          {project?.languages && (
            <div className="flex items-center gap-1">
              <Icon name="Languages" size={12} />
              <span>Languages: {project?.languages?.join(', ')}</span>
            </div>
          )}
          {project?.error && (
            <div className="flex items-center gap-1 text-error">
              <Icon name="AlertCircle" size={12} />
              <span className="truncate">{project?.error}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <div>Created {formatDate(project?.createdAt)}</div>
            <div>Updated {formatDate(project?.lastModified)}</div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconSize={12}
              asChild
            >
              <Link to={`${typeConfig?.path}?project=${project?.id}`}>
                Open
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {project?.status === 'processing' && project?.progress && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Processing...</span>
              <span>{project?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${project?.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;