import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { View } from 'react-native';
import { H4, H3, styled } from '@apollosproject/ui-kit';
import { format, startOfToday } from 'date-fns';

// import GET_USER_NAME from './getUserName';

const StyledCard = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit,
  paddingBottom: 0,
}))(View);

const DateText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H4);

const GreetingText = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(H3);

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
    <StyledCard>
      <DateText>{today}</DateText>
      <GreetingText>
        {firstName ? `Welcome, ${firstName}!` : 'Welcome!'}
      </GreetingText>
    </StyledCard>
  );
};

export default HomeTabHeader;
