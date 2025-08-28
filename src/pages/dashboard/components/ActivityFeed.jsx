import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { cn } from 'utils/cn';

const ActivityFeed = ({ projects }) => {
  // Generate activity feed from projects data
  const generateActivities = () => {
    const activities = [];
    
    projects?.forEach(project => {
      // Project created activity
      activities?.push({
        id: `created-${project?.id}`,
        type: 'created',
        projectId: project?.id,
        projectTitle: project?.title,
        projectType: project?.type,
        timestamp: project?.createdAt,
        description: `Project "${project?.title}" was created`,
        icon: 'Plus',
        color: 'text-blue-600'
      });

      // Project status activities
      if (project?.status === 'completed') {
        activities?.push({
          id: `completed-${project?.id}`,
          type: 'completed',
          projectId: project?.id,
          projectTitle: project?.title,
          projectType: project?.type,
          timestamp: project?.lastModified,
          description: `Project "${project?.title}" completed successfully`,
          icon: 'CheckCircle',
          color: 'text-green-600'
        });
      } else if (project?.status === 'processing') {
        activities?.push({
          id: `processing-${project?.id}`,
          type: 'processing',
          projectId: project?.id,
          projectTitle: project?.title,
          projectType: project?.type,
          timestamp: project?.lastModified,
          description: `Project "${project?.title}" is being processed`,
          icon: 'Clock',
          color: 'text-yellow-600'
        });
      } else if (project?.status === 'failed') {
        activities?.push({
          id: `failed-${project?.id}`,
          type: 'failed',
          projectId: project?.id,
          projectTitle: project?.title,
          projectType: project?.type,
          timestamp: project?.lastModified,
          description: `Project "${project?.title}" failed to process`,
          icon: 'XCircle',
          color: 'text-red-600'
        });
      }
    });

    // Sort by timestamp (most recent first)
    return activities?.sort((a, b) => new Date(b?.timestamp) - new Date(a?.timestamp))?.slice(0, 10); // Show only latest 10 activities
  };

  const activities = generateActivities();

  const getTypeIcon = (type) => {
    const icons = {
      'image-to-avatar-video': 'UserCircle',
      'image-to-ads': 'Megaphone',
      'video-translation': 'Languages'
    };
    return icons?.[type] || 'FileText';
  };

  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={14}>
          Refresh
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Activity" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Activities will appear here as you work on projects
            </p>
          </div>
        ) : (
          activities?.map((activity, index) => (
            <div
              key={activity?.id}
              className={cn(
                "flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-muted/50",
                index === 0 && "bg-primary/5"
              )}
            >
              {/* Activity Icon */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                activity?.type === 'completed' && "bg-green-100 text-green-600",
                activity?.type === 'processing' && "bg-yellow-100 text-yellow-600",
                activity?.type === 'failed' && "bg-red-100 text-red-600",
                activity?.type === 'created' && "bg-blue-100 text-blue-600"
              )}>
                <Icon name={activity?.icon} size={16} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      {activity?.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name={getTypeIcon(activity?.projectType)} size={12} />
                        <span className="capitalize">
                          {activity?.projectType?.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(activity?.timestamp)}
                      </span>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2 mt-1"></div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All Button */}
      {activities?.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth iconName="ArrowRight" iconPosition="right">
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;