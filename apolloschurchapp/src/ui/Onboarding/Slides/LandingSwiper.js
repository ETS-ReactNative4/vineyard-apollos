import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { OnboardingSwiper } from '@apollosproject/ui-onboarding';
import { named } from '@apollosproject/ui-kit';

import Features from './Features';
import BeReady from './BeReady';
import Community from './Community';
import GetSet from './GetSet';
import GoServe from './GoServe';

function LandingSwiper() {
  const navigation = useNavigation();
  const slides = [Features, BeReady, GetSet, GoServe, Community];

  return (
    <OnboardingSwiper
      onComplete={() => {
        navigation.navigate('Auth');
      }}
    >
      {({ swipeForward }) => (
        <>
          {slides.map((Slide) => (
            <Slide key={Slide.displayName} onPressPrimary={swipeForward} />
          ))}
        </>
      )}
    </OnboardingSwiper>
  );
}

export default named('ui-onboarding.LandingSwiper')(LandingSwiper);
