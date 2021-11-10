import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, ImageBackground } from 'react-native';
import { H4, H3, styled, Themer } from '@apollosproject/ui-kit';
import { format, startOfToday } from 'date-fns';

// import GET_USER_NAME from './getUserName';

const StyledCard = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit,
}))(View);

const DateText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H4);

const GreetingText = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(H3);

const Background = styled({
  width: '100%',
  marginTop: -80,
  aspectRatio: 375 / 357, // the image is 375px x 357px
  justifyContent: 'flex-end',
})(ImageBackground);

const GET_USER_NAME = gql`
  query CurrentUserPhoto {
    currentUser {
      profile {
        firstName
        lastName
      }
    }
  }
`;

const HomeTabHeader = () => {
  const { data } = useQuery(GET_USER_NAME, {
    fetchPolicy: 'cache-and-network',
  });

  const { firstName } = data?.currentUser?.profile || '';

  const today = format(startOfToday(), 'EEEE, MMMM do');

  return (
    <Background source={require('./homeimage.png')}>
      <Themer theme={{ type: 'dark' }}>
        <StyledCard>
          <DateText>{today}</DateText>
          <GreetingText>
            {firstName ? `Welcome, ${firstName}!` : 'Welcome!'}
          </GreetingText>
        </StyledCard>
      </Themer>
    </Background>
  );
};

export default HomeTabHeader;
