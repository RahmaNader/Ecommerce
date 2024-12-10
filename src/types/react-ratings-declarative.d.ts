declare module 'react-ratings-declarative' {
    import React from 'react';
  
    interface RatingProps {
      rating?: number;
      widgetRatedColors?: string;
      widgetEmptyColors?: string;
      widgetHoverColors?: string;
      changeRating?: (newRating: number) => void;
      widgetDimensions?: string;
      widgetSpacings?: string;
      svgIconPaths?: string;
      widgetStyles?: React.CSSProperties;
      widgetHoverStyles?: React.CSSProperties;
      // Include any other props you use from the library
    }
  
    class Rating extends React.Component<RatingProps> {
      static Widget: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
    }
  
    export default Rating;
  }
  