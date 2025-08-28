import React from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedFeature,
  onFeatureChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  projectsCount,
  totalCount
}) => {
  const featureOptions = [
    { value: 'all', label: 'All Features' },
    { value: 'image-to-avatar-video', label: 'Image to Avatar Video' },
    { value: 'image-to-ads', label: 'Image to Ads' },
    { value: 'video-translation', label: 'Video Translation' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'processing', label: 'Processing' },
    { value: 'draft', label: 'Draft' },
    { value: 'failed', label: 'Failed' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Last Modified' },
    { value: 'title', label: 'Project Name' },
    { value: 'status', label: 'Status' }
  ];

  const hasActiveFilters = selectedFeature !== 'all' || selectedStatus !== 'all' || searchQuery;

  const clearFilters = () => {
    onSearchChange('');
    onFeatureChange('all');
    onStatusChange('all');
  };

  return (
    <div className="space-y-4">
      {/* Search and Primary Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search projects by name, type, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" iconName="Grid3X3">
            Grid
          </Button>
          <Button variant="ghost" size="sm" iconName="List">
            List
          </Button>
        </div>
      </div>
      {/* Filters and Results */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={featureOptions}
            value={selectedFeature}
            onChange={onFeatureChange}
            placeholder="Filter by feature"
            className="w-full sm:w-48"
          />
          
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={onStatusChange}
            placeholder="Filter by status"
            className="w-full sm:w-40"
          />

          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-full sm:w-40"
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={clearFilters}
              className="w-full sm:w-auto"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="text-sm text-muted-foreground">
            {projectsCount === totalCount ? (
              <span>
                Showing {projectsCount} {projectsCount === 1 ? 'project' : 'projects'}
              </span>
            ) : (
              <span>
                Showing {projectsCount} of {totalCount} projects
              </span>
            )}
          </div>

          {/* Additional Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={() => window.location?.reload()}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
              <Icon name="Search" size={12} />
              <span>"{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {selectedFeature !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-sm rounded-md">
              <Icon name="Filter" size={12} />
              <span>{featureOptions?.find(opt => opt?.value === selectedFeature)?.label}</span>
              <button
                onClick={() => onFeatureChange('all')}
                className="ml-1 hover:bg-secondary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {selectedStatus !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent-foreground text-sm rounded-md">
              <Icon name="Circle" size={12} />
              <span>{statusOptions?.find(opt => opt?.value === selectedStatus)?.label}</span>
              <button
                onClick={() => onStatusChange('all')}
                className="ml-1 hover:bg-accent/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;