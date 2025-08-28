import React from 'react';
import Icon from 'components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'UserCircle',
      title: 'AI Avatar Videos',
      description: 'Transform static images into dynamic talking avatars with advanced AI technology'
    },
    {
      icon: 'Megaphone',
      title: 'Smart Ad Creation',
      description: 'Generate compelling advertisements from images with professional templates'
    },
    {
      icon: 'Languages',
      title: 'Video Translation',
      description: 'Translate your videos into multiple languages while preserving voice tone'
    },
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Process videos in minutes, not hours, with our optimized AI infrastructure'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Your content is protected with bank-level encryption and privacy controls'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Work together with your team on projects with shared workspaces'
    }
  ];

  return (
    <div className="hidden lg:block w-full max-w-md">
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 border border-border">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Why choose AvatarGen Studio?
          </h2>
          <p className="text-sm text-muted-foreground">
            Join thousands of creators transforming their content with AI
          </p>
        </div>

        <div className="space-y-4">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;