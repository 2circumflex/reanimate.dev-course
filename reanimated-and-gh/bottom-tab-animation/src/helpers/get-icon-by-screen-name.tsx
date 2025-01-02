import React from 'react';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

import { ScreenNames } from '../constants';

export const getIconByScreenName = (screenName: keyof typeof ScreenNames) => {
  switch (screenName) {
    case ScreenNames.Home:
      return <Octicons name="home" size={24} color="white" />;
    case ScreenNames.Bookmark:
      return <Feather name="bookmark" size={24} color="white" />;
    case ScreenNames.Add:
      return <Ionicons name="add-circle-outline" size={24} color="white" />;
    case ScreenNames.Profile:
      return <Octicons name="person" size={24} color="white" />;
    case ScreenNames.Settings:
      return <Ionicons name="settings-sharp" size={24} color="white" />;
  }
};
