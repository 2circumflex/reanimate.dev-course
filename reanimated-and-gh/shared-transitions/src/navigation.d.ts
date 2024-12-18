// navigation.d.ts

export interface Screens {
  home: undefined;
  detail: {
    tag: string;
    imageUri: string;
  };
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends Screens {}
  }
}
