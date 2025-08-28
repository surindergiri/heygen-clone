import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { cn } from 'utils/cn';

const UsageMetrics = ({ projects }) => {
  // Calculate metrics from projects data
  const calculateMetrics = () => {
    const totalProjects = projects?.length || 0;
    const completedProjects = projects?.filter(p => p?.status === 'completed')?.length || 0;
    const processingProjects = projects?.filter(p => p?.status === 'processing')?.length || 0;
    const failedProjects = projects?.filter(p => p?.status === 'failed')?.length || 0;

    // Calculate by type
    const avatarVideos = projects?.filter(p => p?.type === 'image-to-avatar-video')?.length || 0;
    const adCampaigns = projects?.filter(p => p?.type === 'image-to-ads')?.length || 0;
    const videoTranslations = projects?.filter(p => p?.type === 'video-translation')?.length || 0;

    // Calculate completion rate
    const completionRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

    // Mock usage limits (in a real app, this would come from user account data)
    const limits = {
      projects: { used: totalProjects, limit: 50 },
      storage: { used: 2.3, limit: 10 }, // GB
      renderTime: { used: 45, limit: 100 } // minutes
    };

    return {
      totalProjects,
      completedProjects,
      processingProjects,
      failedProjects,
      avatarVideos,
      adCampaigns,
      videoTranslations,
      completionRate,
      limits
    };
  };

  const metrics = calculateMetrics();

  const MetricCard = ({ icon, label, value, color = "text-foreground", subtitle = null }) => (
    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color?.includes('blue') && "bg-blue-100", color?.includes('green') && "bg-green-100", color?.includes('yellow') && "bg-yellow-100", color?.includes('red') && "bg-red-100", color?.includes('purple') && "bg-purple-100", !color?.includes('blue') && !color?.includes('green') && !color?.includes('yellow') && !color?.includes('red') && !color?.includes('purple') && "bg-primary/10")}>
        <Icon name={icon} size={20} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );

  const ProgressBar = ({ label, used, limit, unit = "", color = "bg-primary" }) => {
    const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
    const isNearLimit = percentage > 80;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">{label}</span>
          <span className="text-muted-foreground">
            {used}{unit} / {limit}{unit}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              isNearLimit ? "bg-warning" : color
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{Math.round(percentage)}% used</span>
          {isNearLimit && (
            <span className="text-warning font-medium">Near limit</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Account Usage */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Account Usage</h3>
          <Button variant="ghost" size="sm" iconName="Settings" iconSize={14}>
            Manage
          </Button>
        </div>
        
        <div className="space-y-4">
          <ProgressBar
            label="Projects"
            used={metrics?.limits?.projects?.used}
            limit={metrics?.limits?.projects?.limit}
            color="bg-primary"
          />
          
          <ProgressBar
            label="Storage"
            used={metrics?.limits?.storage?.used}
            limit={metrics?.limits?.storage?.limit}
            unit=" GB"
            color="bg-secondary"
          />
          
          <ProgressBar
            label="Render Time"
            used={metrics?.limits?.renderTime?.used}
            limit={metrics?.limits?.renderTime?.limit}
            unit=" min"
            color="bg-accent"
          />
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth iconName="CreditCard">
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Project Statistics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Project Overview</h3>
        
        <div className="space-y-3">
          <MetricCard
            icon="Folder"
            label="Total Projects"
            value={metrics?.totalProjects}
            color="text-blue-600"
          />
          
          <MetricCard
            icon="CheckCircle"
            label="Completed"
            value={metrics?.completedProjects}
            color="text-green-600"
            subtitle={`${metrics?.completionRate}% success rate`}
          />
          
          <MetricCard
            icon="Clock"
            label="Processing"
            value={metrics?.processingProjects}
            color="text-yellow-600"
          />
          
          {metrics?.failedProjects > 0 && (
            <MetricCard
              icon="XCircle"
              label="Failed"
              value={metrics?.failedProjects}
              color="text-red-600"
            />
          )}
        </div>
      </div>

      {/* Feature Usage */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Feature Usage</h3>
        
        <div className="space-y-3">
          <MetricCard
            icon="UserCircle"
            label="Avatar Videos"
            value={metrics?.avatarVideos}
            color="text-blue-600"
          />
          
          <MetricCard
            icon="Megaphone"
            label="Ad Campaigns"
            value={metrics?.adCampaigns}
            color="text-green-600"
          />
          
          <MetricCard
            icon="Languages"
            label="Video Translations"
            value={metrics?.videoTranslations}
            color="text-purple-600"
          />
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth iconName="BarChart3">
            View Analytics
          </Button>
        </div>
      </div>

      {/* Processing Queue (if any processing projects) */}
      {metrics?.processingProjects > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Processing Queue</h3>
          
          <div className="space-y-3">
            {projects
              ?.filter(p => p?.status === 'processing')
              ?.slice(0, 3)
              ?.map(project => (
                <div key={project?.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {project?.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div
                          className="bg-yellow-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${project?.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {project?.progress || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          
          {metrics?.processingProjects > 3 && (
            <div className="mt-3 text-center">
              <span className="text-sm text-muted-foreground">
                +{metrics?.processingProjects - 3} more in queue
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsageMetrics;